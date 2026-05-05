import { Router } from 'express';
import { readVideos, writeVideos, slugify, extractYouTubeId } from '../utils/video-store.js';
import { requireAuth, verifyToken } from '../utils/auth.js';

const router = Router();

const noStore = (res) => {
	res.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
};

const isAdminRequest = (req) => {
	const header = req.headers.authorization || '';
	const token = header.startsWith('Bearer ') ? header.slice(7) : null;
	return verifyToken(token);
};

const publicFields = (v) => ({
	slug: v.slug,
	title: v.title,
	description: v.description || '',
	youtubeId: v.youtubeId,
	youtubeUrl: v.youtubeUrl,
	thumbnailUrl: v.thumbnailUrl || `https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg`,
	tags: Array.isArray(v.tags) ? v.tags : [],
	seo: v.seo || {},
	publishDate: v.publishDate || v.createdAt,
	createdAt: v.createdAt,
	updatedAt: v.updatedAt
});

router.get('/', async (req, res, next) => {
	try {
		const videos = await readVideos();
		const sorted = [...videos].sort(
			(a, b) =>
				new Date(b.publishDate || b.createdAt).getTime() -
				new Date(a.publishDate || a.createdAt).getTime()
		);
		noStore(res);
		res.json(sorted.map(publicFields));
	} catch (err) {
		next(err);
	}
});

router.get('/:slug', async (req, res, next) => {
	try {
		const videos = await readVideos();
		const video = videos.find((v) => v.slug === req.params.slug);
		if (!video) return res.status(404).json({ error: 'Not found' });
		noStore(res);
		res.json(publicFields(video));
	} catch (err) {
		next(err);
	}
});

router.post('/', requireAuth, async (req, res, next) => {
	try {
		const { title, description, youtubeUrl, tags, seo, slug, publishDate } = req.body || {};

		if (!title || !youtubeUrl) {
			return res.status(400).json({ error: 'title and youtubeUrl are required' });
		}

		const youtubeId = extractYouTubeId(youtubeUrl);
		if (!youtubeId) {
			return res.status(400).json({ error: 'Could not parse a YouTube video ID from the URL' });
		}

		const videos = await readVideos();
		let finalSlug = slug ? slugify(slug) : slugify(title);
		if (videos.some((v) => v.slug === finalSlug)) {
			finalSlug = `${finalSlug}-${Date.now().toString(36)}`;
		}

		const now = new Date().toISOString();
		const video = {
			slug: finalSlug,
			title: String(title).trim(),
			description: description ? String(description).trim() : '',
			youtubeUrl: String(youtubeUrl).trim(),
			youtubeId,
			tags: Array.isArray(tags) ? tags.map((t) => String(t).trim()).filter(Boolean) : [],
			seo: seo && typeof seo === 'object' ? seo : {},
			publishDate: publishDate || now,
			createdAt: now,
			updatedAt: now
		};

		videos.push(video);
		await writeVideos(videos);
		res.status(201).json(publicFields(video));
	} catch (err) {
		next(err);
	}
});

router.put('/:slug', requireAuth, async (req, res, next) => {
	try {
		const videos = await readVideos();
		const idx = videos.findIndex((v) => v.slug === req.params.slug);
		if (idx === -1) return res.status(404).json({ error: 'Not found' });

		const current = videos[idx];
		const { title, description, youtubeUrl, tags, seo, slug, publishDate } = req.body || {};

		let newSlug = current.slug;
		if (slug && slugify(slug) !== current.slug) {
			newSlug = slugify(slug);
			if (videos.some((v, i) => i !== idx && v.slug === newSlug)) {
				newSlug = `${newSlug}-${Date.now().toString(36)}`;
			}
		}

		let youtubeId = current.youtubeId;
		let newYoutubeUrl = current.youtubeUrl;
		if (youtubeUrl !== undefined && youtubeUrl !== current.youtubeUrl) {
			const extracted = extractYouTubeId(youtubeUrl);
			if (!extracted) return res.status(400).json({ error: 'Invalid YouTube URL' });
			youtubeId = extracted;
			newYoutubeUrl = String(youtubeUrl).trim();
		}

		const updated = {
			...current,
			slug: newSlug,
			title: title !== undefined ? String(title).trim() : current.title,
			description: description !== undefined ? String(description).trim() : current.description,
			youtubeUrl: newYoutubeUrl,
			youtubeId,
			tags: Array.isArray(tags)
				? tags.map((t) => String(t).trim()).filter(Boolean)
				: current.tags,
			seo: seo && typeof seo === 'object' ? seo : current.seo,
			publishDate: publishDate !== undefined ? publishDate : current.publishDate,
			updatedAt: new Date().toISOString()
		};

		videos[idx] = updated;
		await writeVideos(videos);
		res.json(publicFields(updated));
	} catch (err) {
		next(err);
	}
});

router.delete('/:slug', requireAuth, async (req, res, next) => {
	try {
		const videos = await readVideos();
		const idx = videos.findIndex((v) => v.slug === req.params.slug);
		if (idx === -1) return res.status(404).json({ error: 'Not found' });
		videos.splice(idx, 1);
		await writeVideos(videos);
		res.json({ ok: true });
	} catch (err) {
		next(err);
	}
});

export default router;
