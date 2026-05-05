import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../../data');
const VIDEOS_FILE = path.join(DATA_DIR, 'videos.json');

const ensureInit = async () => {
	await fs.mkdir(DATA_DIR, { recursive: true });
	try {
		await fs.access(VIDEOS_FILE);
	} catch {
		await fs.writeFile(VIDEOS_FILE, '[]', 'utf8');
	}
};

export const readVideos = async () => {
	await ensureInit();
	const raw = await fs.readFile(VIDEOS_FILE, 'utf8');
	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
};

export const writeVideos = async (videos) => {
	await ensureInit();
	await fs.writeFile(VIDEOS_FILE, JSON.stringify(videos, null, 2), 'utf8');
};

export const slugify = (str) =>
	String(str || '')
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.slice(0, 80) || `video-${Date.now()}`;

// Extract a YouTube video ID from a full URL or short URL. Returns null if unparseable.
export const extractYouTubeId = (url) => {
	if (!url || typeof url !== 'string') return null;
	const patterns = [
		/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/v\/|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{6,})/i,
		/^([\w-]{11})$/
	];
	for (const re of patterns) {
		const m = url.match(re);
		if (m) return m[1];
	}
	return null;
};
