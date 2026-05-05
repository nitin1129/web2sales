#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = process.env.SITE_URL || 'https://web2sales.in';
const WEB_ROOT = path.resolve(__dirname, '..');
const BLOGS_JSON = path.resolve(WEB_ROOT, '../api/data/blogs.json');
const OUT_FILE = path.resolve(WEB_ROOT, 'public/sitemap.xml');
const ROUTES_MODULE = path.resolve(WEB_ROOT, '../api/src/utils/site-routes.js');

// Single source of truth: import the same route list the live API uses.
// Falls back to a minimal hardcoded list if the import fails (e.g. when the
// build-time tool is run outside the monorepo layout).
let PUBLIC_ROUTES;
try {
	const mod = await import(pathToFileURL(ROUTES_MODULE).href);
	PUBLIC_ROUTES = mod.PUBLIC_ROUTES;
} catch (err) {
	console.warn(
		`[sitemap] Could not import shared route config (${err.message}); falling back to inline list.`
	);
	PUBLIC_ROUTES = [
		{ path: '/', changefreq: 'weekly', priority: '1.0' },
		{ path: '/services', changefreq: 'weekly', priority: '0.9' },
		{ path: '/about', changefreq: 'monthly', priority: '0.7' },
		{ path: '/contact', changefreq: 'monthly', priority: '0.7' },
		{ path: '/blogs', changefreq: 'daily', priority: '0.8' },
		{ path: '/privacy', changefreq: 'yearly', priority: '0.3' },
		{ path: '/terms', changefreq: 'yearly', priority: '0.3' },
	];
}

function readBlogs() {
	try {
		const raw = fs.readFileSync(BLOGS_JSON, 'utf8');
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch (err) {
		console.warn(`[sitemap] Could not read blogs.json (${err.message}); continuing with static routes only.`);
		return [];
	}
}

function xmlEscape(value) {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function isoDate(value) {
	if (!value) return new Date().toISOString().slice(0, 10);
	const d = new Date(value);
	return Number.isNaN(d.getTime())
		? new Date().toISOString().slice(0, 10)
		: d.toISOString().slice(0, 10);
}

function renderUrl({ loc, lastmod, changefreq, priority }) {
	const parts = [`  <url>`, `    <loc>${xmlEscape(loc)}</loc>`];
	if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);
	if (changefreq) parts.push(`    <changefreq>${changefreq}</changefreq>`);
	if (priority) parts.push(`    <priority>${priority}</priority>`);
	parts.push(`  </url>`);
	return parts.join('\n');
}

function buildSitemap() {
	const today = new Date().toISOString().slice(0, 10);
	const blogs = readBlogs();

	const staticUrls = PUBLIC_ROUTES.map((r) =>
		renderUrl({
			loc: `${SITE_URL}${r.path}`,
			lastmod: today,
			changefreq: r.changefreq,
			priority: r.priority
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
				loc: `${SITE_URL}/blog/${b.slug}`,
				lastmod: isoDate(b.updatedAt || b.publishDate || b.createdAt),
				changefreq: 'monthly',
				priority: '0.8'
			})
		);

	const all = [...staticUrls, ...blogUrls].join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${all}\n</urlset>\n`;
}

function main() {
	const xml = buildSitemap();
	fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
	fs.writeFileSync(OUT_FILE, xml, 'utf8');
	const blogCount = readBlogs().length;
	console.log(
		`[sitemap] Wrote ${OUT_FILE} (${PUBLIC_ROUTES.length} static + ${blogCount} blog URLs)`
	);
}

main();
