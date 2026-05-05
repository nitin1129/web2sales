import crypto from 'crypto';

const DEFAULT_SECRET = 'change-me-in-env-ADMIN_SECRET';
const TOKEN_TTL_MS = 1000 * 60 * 60 * 24;

const getSecret = () => process.env.ADMIN_SECRET || DEFAULT_SECRET;

const b64url = (buf) =>
	buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const b64urlDecode = (str) => {
	const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
	return Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/') + pad, 'base64');
};

export const issueToken = () => {
	const payload = { exp: Date.now() + TOKEN_TTL_MS };
	const payloadB64 = b64url(Buffer.from(JSON.stringify(payload), 'utf8'));
	const sig = b64url(crypto.createHmac('sha256', getSecret()).update(payloadB64).digest());
	return `${payloadB64}.${sig}`;
};

export const verifyToken = (token) => {
	if (!token || typeof token !== 'string') return false;
	const parts = token.split('.');
	if (parts.length !== 2) return false;
	const [payloadB64, sig] = parts;
	const expected = b64url(crypto.createHmac('sha256', getSecret()).update(payloadB64).digest());
	const sigBuf = Buffer.from(sig);
	const expBuf = Buffer.from(expected);
	if (sigBuf.length !== expBuf.length) return false;
	if (!crypto.timingSafeEqual(sigBuf, expBuf)) return false;
	try {
		const payload = JSON.parse(b64urlDecode(payloadB64).toString('utf8'));
		return payload.exp && payload.exp > Date.now();
	} catch {
		return false;
	}
};

export const verifyPassword = (provided) => {
	const expected = process.env.ADMIN_PASSWORD || 'admin123';
	const a = Buffer.from(String(provided || ''));
	const b = Buffer.from(expected);
	if (a.length !== b.length) return false;
	return crypto.timingSafeEqual(a, b);
};

export const requireAuth = (req, res, next) => {
	const header = req.headers.authorization || '';
	const token = header.startsWith('Bearer ') ? header.slice(7) : null;
	if (!verifyToken(token)) {
		return res.status(401).json({ error: 'Unauthorized' });
	}
	next();
};
