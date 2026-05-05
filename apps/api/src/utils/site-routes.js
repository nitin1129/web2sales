/**
 * Single source of truth for SEO-relevant routes.
 *
 * Adding a new public page?
 *   1. Add the page component + Route in apps/web/src/App.jsx (as usual).
 *   2. Add an entry to PUBLIC_ROUTES below.
 *   3. Add a `<SEO ...>` block to the page (see apps/web/src/components/SEO.jsx).
 *
 * That's it — both the live sitemap (apps/api at /sitemap.xml) and the
 * build-time sitemap (apps/web/public/sitemap.xml on `npm run build`) will
 * automatically pick the new page up. robots.txt also reads DISALLOWED below.
 *
 * `changefreq` and `priority` are SEO hints only; pick what makes sense:
 *   - changefreq: always | hourly | daily | weekly | monthly | yearly | never
 *   - priority:   "0.0" (least) → "1.0" (homepage)
 */

export const PUBLIC_ROUTES = [
	{ path: '/', changefreq: 'weekly', priority: '1.0' },
	{ path: '/services', changefreq: 'weekly', priority: '0.9' },
	{ path: '/industries', changefreq: 'monthly', priority: '0.8' },
	{ path: '/industries/d2c', changefreq: 'weekly', priority: '0.7' },
	{ path: '/industries/healthcare', changefreq: 'weekly', priority: '0.7' },
	{ path: '/industries/real-estate', changefreq: 'weekly', priority: '0.7' },
	{ path: '/industries/education', changefreq: 'weekly', priority: '0.7' },
	{ path: '/industries/local-businesses', changefreq: 'weekly', priority: '0.7' },
	{ path: '/industries/startups', changefreq: 'weekly', priority: '0.7' },
	{ path: '/process', changefreq: 'monthly', priority: '0.7' },
	{ path: '/resources', changefreq: 'weekly', priority: '0.7' },
	{ path: '/resources/seo-guides', changefreq: 'weekly', priority: '0.7' },
	{ path: '/resources/optimisation-tips', changefreq: 'weekly', priority: '0.7' },
	{ path: '/resources/case-studies', changefreq: 'weekly', priority: '0.7' },
	{ path: '/videos', changefreq: 'weekly', priority: '0.7' },
	{ path: '/webinars', changefreq: 'weekly', priority: '0.7' },
	{ path: '/about', changefreq: 'monthly', priority: '0.7' },
	{ path: '/contact', changefreq: 'monthly', priority: '0.7' },
	{ path: '/blogs', changefreq: 'daily', priority: '0.8' },
	{ path: '/privacy', changefreq: 'yearly', priority: '0.3' },
	{ path: '/terms', changefreq: 'yearly', priority: '0.3' },
	{ path: '/refund-policy', changefreq: 'yearly', priority: '0.3' },
	{ path: '/cookies', changefreq: 'yearly', priority: '0.3' },
];

/**
 * Paths that crawlers should never index (admin, transactional, etc.).
 * Used by both robots.txt and the static sitemap.
 */
export const DISALLOWED = ['/admin', '/admin/', '/checkout', '/checkout/'];
