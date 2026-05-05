import { Router } from 'express';
import { readBlogs, writeBlogs, slugify } from '../utils/blog-store.js';
import { requireAuth, verifyToken } from '../utils/auth.js';

const router = Router();

const publicFields = (blog) => ({
	slug: blog.slug,
	title: blog.title,
	excerpt: blog.excerpt || '',
	content: blog.content || '',
	category: blog.category || '',
	track: blog.track || '',
	author: blog.author || '',
	publishDate: blog.publishDate || blog.createdAt,
	coverImage: blog.coverImage || '',
	seo: blog.seo || {},
	createdAt: blog.createdAt,
	updatedAt: blog.updatedAt,
});

const adminFields = (blog) => ({
	...publicFields(blog),
	status: new Date(blog.publishDate || blog.createdAt).getTime() > Date.now() ? 'scheduled' : 'published',
});

const cardFields = (blog) => ({
	slug: blog.slug,
	title: blog.title,
	excerpt: blog.excerpt || '',
	category: blog.category || '',
	track: blog.track || '',
	author: blog.author || '',
	publishDate: blog.publishDate || blog.createdAt,
	coverImage: blog.coverImage || '',
	createdAt: blog.createdAt,
	updatedAt: blog.updatedAt,
});

const adminCardFields = (blog) => ({
	...cardFields(blog),
	status: new Date(blog.publishDate || blog.createdAt).getTime() > Date.now() ? 'scheduled' : 'published',
});

const isAdminRequest = (req) => {
	const header = req.headers.authorization || '';
	const token = header.startsWith('Bearer ') ? header.slice(7) : null;
	return verifyToken(token);
};

const isPublished = (blog) =>
	new Date(blog.publishDate || blog.createdAt).getTime() <= Date.now();

// Visibility of scheduled posts changes over time — the browser must never
// cache this list, or users see the pre-schedule snapshot forever.
const noStore = (res) => {
	res.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
	res.set('Pragma', 'no-cache');
	res.set('Expires', '0');
};

router.get('/', async (req, res, next) => {
	try {
		const blogs = await readBlogs();
		const admin = isAdminRequest(req);
		const visible = admin ? blogs : blogs.filter(isPublished);
		const sorted = [...visible].sort(
			(a, b) =>
				new Date(b.publishDate || b.createdAt).getTime() -
				new Date(a.publishDate || a.createdAt).getTime()
		);
		noStore(res);
		res.json(sorted.map(admin ? adminCardFields : cardFields));
	} catch (err) {
		next(err);
	}
});

router.get('/:slug', async (req, res, next) => {
	try {
		const blogs = await readBlogs();
		const blog = blogs.find((b) => b.slug === req.params.slug);
		if (!blog) return res.status(404).json({ error: 'Not found' });
		const admin = isAdminRequest(req);
		if (!admin && !isPublished(blog)) {
			noStore(res);
			return res.status(404).json({ error: 'Not found' });
		}
		noStore(res);
		res.json(admin ? adminFields(blog) : publicFields(blog));
	} catch (err) {
		next(err);
	}
});

router.post('/', requireAuth, async (req, res, next) => {
	try {
		const { title, excerpt, content, category, track, author, publishDate, coverImage, seo, slug } = req.body || {};

		if (!title || !content) {
			return res.status(400).json({ error: 'title and content are required' });
		}

		const blogs = await readBlogs();
		let finalSlug = slug ? slugify(slug) : slugify(title);

		if (blogs.some((b) => b.slug === finalSlug)) {
			finalSlug = `${finalSlug}-${Date.now().toString(36)}`;
		}

		const now = new Date().toISOString();
		const blog = {
			slug: finalSlug,
			title: String(title).trim(),
			excerpt: excerpt ? String(excerpt).trim() : '',
			content: String(content),
			category: category ? String(category).trim() : '',
			track: track ? String(track).trim() : '',
			author: author ? String(author).trim() : '',
			publishDate: publishDate || now,
			coverImage: coverImage || '',
			seo: seo && typeof seo === 'object' ? seo : {},
			createdAt: now,
			updatedAt: now,
		};

		blogs.push(blog);
		await writeBlogs(blogs);
		res.status(201).json(publicFields(blog));
	} catch (err) {
		next(err);
	}
});

router.put('/:slug', requireAuth, async (req, res, next) => {
	try {
		const blogs = await readBlogs();
		const idx = blogs.findIndex((b) => b.slug === req.params.slug);
		if (idx === -1) return res.status(404).json({ error: 'Not found' });

		const current = blogs[idx];
		const { title, excerpt, content, category, track, author, publishDate, coverImage, seo, slug } = req.body || {};

		let newSlug = current.slug;
		if (slug && slugify(slug) !== current.slug) {
			newSlug = slugify(slug);
			if (blogs.some((b, i) => i !== idx && b.slug === newSlug)) {
				newSlug = `${newSlug}-${Date.now().toString(36)}`;
			}
		}

		const updated = {
			...current,
			slug: newSlug,
			title: title !== undefined ? String(title).trim() : current.title,
			excerpt: excerpt !== undefined ? String(excerpt).trim() : current.excerpt,
			content: content !== undefined ? String(content) : current.content,
			category: category !== undefined ? String(category).trim() : current.category,
			track: track !== undefined ? String(track).trim() : (current.track || ''),
			author: author !== undefined ? String(author).trim() : current.author,
			publishDate: publishDate !== undefined ? publishDate : current.publishDate,
			coverImage: coverImage !== undefined ? coverImage : current.coverImage,
			seo: seo && typeof seo === 'object' ? seo : current.seo,
			updatedAt: new Date().toISOString(),
		};

		blogs[idx] = updated;
		await writeBlogs(blogs);
		res.json(publicFields(updated));
	} catch (err) {
		next(err);
	}
});

router.delete('/:slug', requireAuth, async (req, res, next) => {
	try {
		const blogs = await readBlogs();
		const idx = blogs.findIndex((b) => b.slug === req.params.slug);
		if (idx === -1) return res.status(404).json({ error: 'Not found' });
		blogs.splice(idx, 1);
		await writeBlogs(blogs);
		res.json({ ok: true });
	} catch (err) {
		next(err);
	}
});

export default router;
