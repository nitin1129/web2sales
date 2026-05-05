import { readBlogs } from './blog-store.js';
import { PUBLIC_ROUTES, DISALLOWED } from './site-routes.js';

const DEFAULT_SITE_URL = process.env.SITE_URL || 'https://web2sales.in';

const xmlEscape = (value) =>
	String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');

const isoDate = (value) => {
	if (!value) return new Date().toISOString().slice(0, 10);
	const d = new Date(value);
	return Number.isNaN(d.getTime())
		? new Date().toISOString().slice(0, 10)
		: d.toISOString().slice(0, 10);
};

const renderUrl = ({ loc, lastmod, changefreq, priority }) => {
	const parts = ['  <url>', `    <loc>${xmlEscape(loc)}</loc>`];
	if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);
	if (changefreq) parts.push(`    <changefreq>${changefreq}</changefreq>`);
	if (priority) parts.push(`    <priority>${priority}</priority>`);
	parts.push('  </url>');
	return parts.join('\n');
};

export const buildSitemap = async ({ siteUrl = DEFAULT_SITE_URL } = {}) => {
	const today = new Date().toISOString().slice(0, 10);
	const blogs = await readBlogs();

	const staticUrls = PUBLIC_ROUTES.map((r) =>
		renderUrl({
			loc: `${siteUrl}${r.path}`,
			lastmod: today,
			changefreq: r.changefreq,
			priority: r.priority,
		})
	);

	const now = Date.now();
	const blogUrls = blogs
		.filter(
			(b) =>
				b &&
				b.slug &&
				new Date(b.publishDate || b.createdAt).getTime() <= now
		)
		.map((b) =>
			renderUrl({
				loc: `${siteUrl}/blog/${b.slug}`,
				lastmod: isoDate(b.updatedAt || b.publishDate || b.createdAt),
				changefreq: 'monthly',
				priority: '0.8',
			})
		);

	const body = [...staticUrls, ...blogUrls].join('\n');
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
};

export const buildRobotsTxt = ({ siteUrl = DEFAULT_SITE_URL } = {}) => {
	const disallow = DISALLOWED.map((p) => `Disallow: ${p}`).join('\n');
	return `User-agent: *\nAllow: /\n\n${disallow}\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
};
