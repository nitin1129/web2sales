import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../../data');
const WEBINARS_FILE = path.join(DATA_DIR, 'webinars.json');

const ensureInit = async () => {
	await fs.mkdir(DATA_DIR, { recursive: true });
	try {
		await fs.access(WEBINARS_FILE);
	} catch {
		await fs.writeFile(WEBINARS_FILE, '[]', 'utf8');
	}
};

export const readWebinars = async () => {
	await ensureInit();
	const raw = await fs.readFile(WEBINARS_FILE, 'utf8');
	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
};

export const writeWebinars = async (webinars) => {
	await ensureInit();
	await fs.writeFile(WEBINARS_FILE, JSON.stringify(webinars, null, 2), 'utf8');
};

export const slugify = (str) =>
	String(str || '')
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.slice(0, 80) || `webinar-${Date.now()}`;
