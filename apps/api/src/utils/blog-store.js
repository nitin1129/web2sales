import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DATA_DIR = path.resolve(__dirname, '../../data');
export const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json');
export const IMAGES_DIR = path.join(DATA_DIR, 'images');

const ensureInit = async () => {
	await fs.mkdir(DATA_DIR, { recursive: true });
	await fs.mkdir(IMAGES_DIR, { recursive: true });
	try {
		await fs.access(BLOGS_FILE);
	} catch {
		await fs.writeFile(BLOGS_FILE, '[]', 'utf8');
	}
};

export const readBlogs = async () => {
	await ensureInit();
	const raw = await fs.readFile(BLOGS_FILE, 'utf8');
	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
};

export const writeBlogs = async (blogs) => {
	await ensureInit();
	await fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2), 'utf8');
};

export const slugify = (str) =>
	String(str || '')
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.slice(0, 80) || `post-${Date.now()}`;
