import { Router } from 'express';
import { issueToken, verifyPassword, verifyToken } from '../utils/auth.js';

const router = Router();

router.post('/login', (req, res) => {
	const { password } = req.body || {};
	if (!verifyPassword(password)) {
		return res.status(401).json({ error: 'Invalid password' });
	}
	const token = issueToken();
	res.json({ token });
});

router.get('/me', (req, res) => {
	const header = req.headers.authorization || '';
	const token = header.startsWith('Bearer ') ? header.slice(7) : null;
	res.json({ authenticated: verifyToken(token) });
});

export default router;
