import { Router } from 'express';
import { buildSitemap, buildRobotsTxt } from '../utils/sitemap.js';

const router = Router();

const CACHE_SECONDS = 300;

router.get('/sitemap.xml', async (req, res, next) => {
	try {
		const xml = await buildSitemap();
		res.set('Content-Type', 'application/xml; charset=utf-8');
		res.set('Cache-Control', `public, max-age=${CACHE_SECONDS}`);
		res.send(xml);
	} catch (err) {
		next(err);
	}
});

router.get('/robots.txt', (req, res, next) => {
	try {
		const txt = buildRobotsTxt();
		res.set('Content-Type', 'text/plain; charset=utf-8');
		res.set('Cache-Control', `public, max-age=${CACHE_SECONDS}`);
		res.send(txt);
	} catch (err) {
		next(err);
	}
});

export default router;
