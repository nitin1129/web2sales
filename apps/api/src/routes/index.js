import { Router } from 'express';
import healthCheck from './health-check.js';
import blogs from './blogs.js';
import videos from './videos.js';
import webinars from './webinars.js';
import auth from './auth.js';
import upload from './upload.js';
import seo from './seo.js';

const router = Router();

export default () => {
	router.get('/health', healthCheck);
	router.use(seo);
	router.use('/api/auth', auth);
	router.use('/api/blogs', blogs);
	router.use('/api/videos', videos);
	router.use('/api/webinars', webinars);
	router.use('/api/upload', upload);
	return router;
};
