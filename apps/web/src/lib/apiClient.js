const DEFAULT_API_URL = 'http://localhost:3001';

export const API_URL = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, '');

const TOKEN_KEY = 'w2s_admin_token';

export const getToken = () => {
	try {
		return localStorage.getItem(TOKEN_KEY) || '';
	} catch {
		return '';
	}
};

export const setToken = (token) => {
	try {
		if (token) localStorage.setItem(TOKEN_KEY, token);
		else localStorage.removeItem(TOKEN_KEY);
	} catch {
		/* ignore */
	}
};

export const clearToken = () => setToken('');

export const resolveImageUrl = (pathOrUrl) => {
	if (!pathOrUrl) return '';
	if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
	return `${API_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
};

const buildHeaders = (extra = {}, auth = false) => {
	const headers = { ...extra };
	if (auth) {
		const token = getToken();
		if (token) headers.Authorization = `Bearer ${token}`;
	}
	return headers;
};

const parseJson = async (res) => {
	const text = await res.text();
	try {
		return text ? JSON.parse(text) : null;
	} catch {
		return null;
	}
};

const request = async (path, { method = 'GET', body, auth = false, headers = {} } = {}) => {
	const init = { method, headers: buildHeaders(headers, auth) };
	if (body !== undefined && !(body instanceof FormData)) {
		init.headers['Content-Type'] = 'application/json';
		init.body = JSON.stringify(body);
	} else if (body instanceof FormData) {
		init.body = body;
	}

	const res = await fetch(`${API_URL}${path}`, init);
	const data = await parseJson(res);

	if (!res.ok) {
		const err = new Error((data && data.error) || res.statusText || 'Request failed');
		err.status = res.status;
		err.data = data;
		throw err;
	}

	return data;
};

export const api = {
	login: (password) => request('/api/auth/login', { method: 'POST', body: { password } }),
	me: () => request('/api/auth/me', { auth: true }),

	listBlogs: () => request('/api/blogs'),
	getBlog: (slug) => request(`/api/blogs/${encodeURIComponent(slug)}`),

	// Admin variants — pass the auth token so the API includes scheduled posts.
	adminListBlogs: () => request('/api/blogs', { auth: true }),
	adminGetBlog: (slug) => request(`/api/blogs/${encodeURIComponent(slug)}`, { auth: true }),

	createBlog: (data) => request('/api/blogs', { method: 'POST', body: data, auth: true }),
	updateBlog: (slug, data) =>
		request(`/api/blogs/${encodeURIComponent(slug)}`, { method: 'PUT', body: data, auth: true }),
	deleteBlog: (slug) =>
		request(`/api/blogs/${encodeURIComponent(slug)}`, { method: 'DELETE', auth: true }),

	// Videos
	listVideos: () => request('/api/videos'),
	getVideo: (slug) => request(`/api/videos/${encodeURIComponent(slug)}`),
	createVideo: (data) => request('/api/videos', { method: 'POST', body: data, auth: true }),
	updateVideo: (slug, data) =>
		request(`/api/videos/${encodeURIComponent(slug)}`, { method: 'PUT', body: data, auth: true }),
	deleteVideo: (slug) =>
		request(`/api/videos/${encodeURIComponent(slug)}`, { method: 'DELETE', auth: true }),

	// Webinars
	listWebinars: () => request('/api/webinars'),
	getWebinar: (slug) => request(`/api/webinars/${encodeURIComponent(slug)}`),
	createWebinar: (data) =>
		request('/api/webinars', { method: 'POST', body: data, auth: true }),
	updateWebinar: (slug, data) =>
		request(`/api/webinars/${encodeURIComponent(slug)}`, { method: 'PUT', body: data, auth: true }),
	deleteWebinar: (slug) =>
		request(`/api/webinars/${encodeURIComponent(slug)}`, { method: 'DELETE', auth: true }),

	uploadImage: (file) => {
		const form = new FormData();
		form.append('image', file);
		return request('/api/upload', { method: 'POST', body: form, auth: true });
	},
};

export default api;
