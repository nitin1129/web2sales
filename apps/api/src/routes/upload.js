import { Router } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import { IMAGES_DIR } from '../utils/blog-store.js';
import { requireAuth } from '../utils/auth.js';

const allowedMime = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml']);
const extFromMime = {
	'image/png': '.png',
	'image/jpeg': '.jpg',
	'image/webp': '.webp',
	'image/gif': '.gif',
	'image/svg+xml': '.svg',
};

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => cb(null, IMAGES_DIR),
	filename: (_req, file, cb) => {
		const ext = extFromMime[file.mimetype] || path.extname(file.originalname) || '.bin';
		const name = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
		cb(null, name);
	},
});

const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (_req, file, cb) => {
		if (!allowedMime.has(file.mimetype)) {
			return cb(new Error('Unsupported file type'));
		}
		cb(null, true);
	},
});

const router = Router();

router.post('/', requireAuth, upload.single('image'), (req, res) => {
	if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
	res.status(201).json({
		url: `/images/${req.file.filename}`,
		filename: req.file.filename,
		size: req.file.size,
		mimetype: req.file.mimetype,
	});
});

export default router;
