import { Router } from 'express';
import { readWebinars, writeWebinars, slugify } from '../utils/webinar-store.js';
import { requireAuth } from '../utils/auth.js';

const router = Router();

const noStore = (res) => {
	res.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
};

const publicFields = (w) => ({
	slug: w.slug,
	title: w.title,
	description: w.description || '',
	speaker: w.speaker || '',
	scheduledFor: w.scheduledFor,
	durationMinutes: w.durationMinutes || null,
	meetingUrl: w.meetingUrl || '',
	recordingUrl: w.recordingUrl || '',
	tags: Array.isArray(w.tags) ? w.tags : [],
	seo: w.seo || {},
	createdAt: w.createdAt,
	updatedAt: w.updatedAt
});

router.get('/', async (req, res, next) => {
	try {
		const webinars = await readWebinars();
		// Sort: upcoming (closest first), then past (most recent first)
		const now = Date.now();
		const upcoming = webinars
			.filter((w) => new Date(w.scheduledFor).getTime() > now)
			.sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime());
		const past = webinars
			.filter((w) => new Date(w.scheduledFor).getTime() <= now)
			.sort((a, b) => new Date(b.scheduledFor).getTime() - new Date(a.scheduledFor).getTime());
		noStore(res);
		res.json([...upcoming, ...past].map(publicFields));
	} catch (err) {
		next(err);
	}
});

router.get('/:slug', async (req, res, next) => {
	try {
		const webinars = await readWebinars();
		const webinar = webinars.find((w) => w.slug === req.params.slug);
		if (!webinar) return res.status(404).json({ error: 'Not found' });
		noStore(res);
		res.json(publicFields(webinar));
	} catch (err) {
		next(err);
	}
});

router.post('/', requireAuth, async (req, res, next) => {
	try {
		const { title, description, speaker, scheduledFor, durationMinutes, meetingUrl, recordingUrl, tags, seo, slug } =
			req.body || {};

		if (!title || !scheduledFor) {
			return res.status(400).json({ error: 'title and scheduledFor are required' });
		}
		if (Number.isNaN(new Date(scheduledFor).getTime())) {
			return res.status(400).json({ error: 'scheduledFor must be a valid date' });
		}

		const webinars = await readWebinars();
		let finalSlug = slug ? slugify(slug) : slugify(title);
		if (webinars.some((w) => w.slug === finalSlug)) {
			finalSlug = `${finalSlug}-${Date.now().toString(36)}`;
		}

		const now = new Date().toISOString();
		const webinar = {
			slug: finalSlug,
			title: String(title).trim(),
			description: description ? String(description).trim() : '',
			speaker: speaker ? String(speaker).trim() : '',
			scheduledFor: new Date(scheduledFor).toISOString(),
			durationMinutes: durationMinutes ? Number(durationMinutes) : null,
			meetingUrl: meetingUrl ? String(meetingUrl).trim() : '',
			recordingUrl: recordingUrl ? String(recordingUrl).trim() : '',
			tags: Array.isArray(tags) ? tags.map((t) => String(t).trim()).filter(Boolean) : [],
			seo: seo && typeof seo === 'object' ? seo : {},
			createdAt: now,
			updatedAt: now
		};

		webinars.push(webinar);
		await writeWebinars(webinars);
		res.status(201).json(publicFields(webinar));
	} catch (err) {
		next(err);
	}
});

router.put('/:slug', requireAuth, async (req, res, next) => {
	try {
		const webinars = await readWebinars();
		const idx = webinars.findIndex((w) => w.slug === req.params.slug);
		if (idx === -1) return res.status(404).json({ error: 'Not found' });

		const current = webinars[idx];
		const { title, description, speaker, scheduledFor, durationMinutes, meetingUrl, recordingUrl, tags, seo, slug } =
			req.body || {};

		let newSlug = current.slug;
		if (slug && slugify(slug) !== current.slug) {
			newSlug = slugify(slug);
			if (webinars.some((w, i) => i !== idx && w.slug === newSlug)) {
				newSlug = `${newSlug}-${Date.now().toString(36)}`;
			}
		}

		const updated = {
			...current,
			slug: newSlug,
			title: title !== undefined ? String(title).trim() : current.title,
			description: description !== undefined ? String(description).trim() : current.description,
			speaker: speaker !== undefined ? String(speaker).trim() : current.speaker,
			scheduledFor: scheduledFor !== undefined ? new Date(scheduledFor).toISOString() : current.scheduledFor,
			durationMinutes: durationMinutes !== undefined ? Number(durationMinutes) : current.durationMinutes,
			meetingUrl: meetingUrl !== undefined ? String(meetingUrl).trim() : current.meetingUrl,
			recordingUrl: recordingUrl !== undefined ? String(recordingUrl).trim() : current.recordingUrl,
			tags: Array.isArray(tags)
				? tags.map((t) => String(t).trim()).filter(Boolean)
				: current.tags,
			seo: seo && typeof seo === 'object' ? seo : current.seo,
			updatedAt: new Date().toISOString()
		};

		webinars[idx] = updated;
		await writeWebinars(webinars);
		res.json(publicFields(updated));
	} catch (err) {
		next(err);
	}
});

router.delete('/:slug', requireAuth, async (req, res, next) => {
	try {
		const webinars = await readWebinars();
		const idx = webinars.findIndex((w) => w.slug === req.params.slug);
		if (idx === -1) return res.status(404).json({ error: 'Not found' });
		webinars.splice(idx, 1);
		await writeWebinars(webinars);
		res.json({ ok: true });
	} catch (err) {
		next(err);
	}
});

export default router;
