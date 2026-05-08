// Single source of truth for the API base URL.
// Read from VITE_API_URL at build time, with a smart fallback so the
// site keeps working even if the env var wasn't set during build.
//
// IMPORTANT: Vite bakes env vars in at BUILD time. Set VITE_API_URL
// in your host's env-vars UI BEFORE the build runs and trigger a
// rebuild after changing it.

const env = import.meta.env || {};

const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1');

// Priority:
//   1. VITE_API_URL  (production override — preferred)
//   2. http://localhost:3001  (local dev)
//   3. Same origin as the frontend  (last-resort fallback so the
//      deployed site falls back to relative requests instead of
//      pointing at localhost when the env var is missing).
const resolveApiUrl = () => {
  const fromEnv = (env.VITE_API_URL || '').replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  if (isLocalhost) return 'http://localhost:3001';
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
};

export const API_URL = resolveApiUrl();
