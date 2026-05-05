# Web2Sales — GMDS Technologies

> **We build websites that rank and convert.**

The marketing site, blog, and admin panel for [Web2Sales](https://web2sales.in)
by GMDS Technologies. Conversion-focused web design + development +
maintenance for businesses across India.

This repo is an **npm-workspace monorepo** with three apps:

| App | Stack | Port | Purpose |
|---|---|---|---|
| `apps/web` | React 18 · Vite · Tailwind · Framer Motion | `3000` | Public site + admin UI |
| `apps/api` | Node 20 · Express 5 | `3001` | Auth, blogs, videos, webinars, uploads, sitemap, robots |
| `apps/pocketbase` | PocketBase | `8090` | *(Optional)* legacy contact-form storage |

The API stores blogs, videos, and webinars as JSON files in `apps/api/data/`
— admin-managed at runtime, never committed to git.

---

## Prerequisites

- **Node.js 20+** (check with `node -v`)
- **npm 9+** (comes with Node)
- A code editor — VS Code is what we use

---

## Quick start

```bash
# 1. Clone and install
git clone https://github.com/nitin1129/web2sales.git
cd web2sales
npm install

# 2. Copy the example env into apps/api/
cp apps/api/.env.example apps/api/.env
#    then open apps/api/.env and set ADMIN_PASSWORD + ADMIN_SECRET

# 3. Start the dev stack (web + api)
npm run dev:web   # in one terminal — http://localhost:3000
npm run dev:api   # in another  — http://localhost:3001
```

Visit **http://localhost:3000** for the public site,
**http://localhost:3000/admin/login** for the admin panel.

> The repo's root `npm run dev` also boots `apps/pocketbase`, which depends
> on `pocketbase.exe`. If you don't need PocketBase (and most of the time
> you won't — blogs/videos/webinars use the Express API now) just run the
> two services individually as shown above.

---

## Environment variables

The API reads these from `apps/api/.env`:

| Variable | Default | What it does |
|---|---|---|
| `PORT` | `3001` | API listen port |
| `CORS_ORIGIN` | `*` | Allowed frontend origin (set to `http://localhost:3000` in dev) |
| `ADMIN_PASSWORD` | *(required)* | Password for `/admin/login` |
| `ADMIN_SECRET` | *(required)* | HMAC secret for signing admin auth tokens |
| `SITE_URL` | `https://web2sales.in` | Used in sitemap.xml + canonical URLs |

The web app reads `VITE_API_URL` (defaults to `http://localhost:3001`) — set
it in `apps/web/.env` if you point the frontend at a different API host.

> **Never commit your `.env`** — it's already in `.gitignore`. The
> `.env.example` files are the only env templates that get pushed.

---

## How it's structured

### Public routes

| URL | What |
|---|---|
| `/` | Marketing homepage |
| `/services` | Pricing + service catalogue |
| `/process` | The 6-step "How we work" page |
| `/industries` | Hub: 6 industry categories |
| `/industries/:slug` | Paginated blog feed filtered by `industries:slug` |
| `/resources` | Hub: SEO Guides, Tips, Case Studies, Videos, Webinars |
| `/resources/:slug` | Paginated blog feed filtered by `resources:slug` |
| `/blogs` | All blog posts (any track) |
| `/blog/:slug` | Individual blog post |
| `/videos` | YouTube video library (admin-managed) |
| `/webinars` | Upcoming + past sessions (admin-managed) |
| `/about` | About the team |
| `/contact` | Contact form, WhatsApp, Schedule a call |
| `/privacy`, `/terms`, `/refund-policy`, `/cookies` | Legal pages |

### Admin routes (auth required)

| URL | What |
|---|---|
| `/admin/login` | Password gate |
| `/admin` | Blogs list — section tabs (All / Blog / Industries / Resources), search, pagination |
| `/admin/new` · `/admin/edit/:slug` | Blog editor with track picker + schedule dialog |
| `/admin/videos` · `/admin/videos/new` · `/admin/videos/edit/:slug` | YouTube videos CRUD |
| `/admin/webinars` · `/admin/webinars/new` · `/admin/webinars/edit/:slug` | Webinars CRUD |

### Blog tracks

Each post has a `track` field: empty (general blog), `industries:d2c`,
`industries:healthcare`, `resources:seo-guides`, etc. Tracks are defined
once in [`apps/web/src/lib/tracks.js`](apps/web/src/lib/tracks.js) and
drive both the admin dropdown and the public category pages.

To add a new track (industry or resource type), edit that file. The admin
dropdown, the hub cards, and the new `/industries/<your-slug>` page all
update automatically.

### SEO + sitemap

- The Express API serves `/sitemap.xml` and `/robots.txt` dynamically — they
  read from `blogs.json` on every request, so newly-published posts appear
  in the sitemap within seconds.
- A build-time fallback at [`apps/web/tools/generate-sitemap.js`](apps/web/tools/generate-sitemap.js)
  also writes `apps/web/public/sitemap.xml` on `npm run build`.
- Static routes are listed in [`apps/api/src/utils/site-routes.js`](apps/api/src/utils/site-routes.js)
  (single source of truth used by both sitemap generators).

---

## Common scripts

From the repo root:

```bash
npm run dev:web       # frontend only
npm run dev:api       # backend only
npm run build         # build frontend → dist/apps/web
npm run lint          # lint web + api packages
```

From `apps/web` specifically:

```bash
npm run dev           # vite dev server
npm run build         # vite build
npm run sitemap       # regenerate public/sitemap.xml from blogs.json
npm run lint          # eslint with --quiet
```

From `apps/api`:

```bash
npm run dev           # node src/main.js
npm run lint          # eslint with --quiet
```

---

## Deploying

### Frontend (`apps/web`)

```bash
npm run build
```

Outputs static assets to `dist/apps/web/`. Drop them on any static host —
Cloudflare Pages, Vercel, Netlify, Nginx, S3 + CloudFront, etc. Works with
the included `.htaccess` if you serve via Apache.

### Backend (`apps/api`)

It's a plain Node + Express server. Deploy anywhere that runs Node 20:

- **VPS** with PM2 / systemd
- **Fly.io**, **Railway**, **Render**, **Cloudflare Workers** (with adapter)
- **Hostinger** Node hosting

Make sure to set the env vars and persist `apps/api/data/` (a volume mount
or similar) so blog posts and uploaded images don't disappear on restart.

### Production sitemap

Once deployed, submit the live sitemap in **Google Search Console**:

```
https://web2sales.in/sitemap.xml
```

If your `.htaccess` proxy is enabled (see comments in
[`apps/web/public/.htaccess`](apps/web/public/.htaccess)), the live API
endpoint serves the sitemap. Otherwise the static file generated at build
time serves.

---

## Admin workflow

1. Log in at `/admin/login` with the `ADMIN_PASSWORD` you set in
   `apps/api/.env`.
2. **New post** → pick a section first (Blog / Industries / Resources),
   then a sub-category if applicable. The post automatically lands on the
   matching public page after publish.
3. **Schedule** → use the publish dialog to either publish now or schedule
   for a future date. Scheduled posts are hidden from the public until
   their `publishDate` passes; the API filters them out automatically.
4. **Cover images** → uploaded via the editor; stored under
   `apps/api/data/images/` (gitignored, served back via `/images/...`).

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `ERR_CONNECTION_REFUSED` on `localhost:3000` | Vite isn't running — `npm run dev:web` |
| `ERR_CONNECTION_REFUSED` on `localhost:3001` | API isn't running — `npm run dev:api` |
| `Route not found` on `/api/...` after pulling new code | API is running stale code — restart it |
| Login fails with "Invalid password" | Check `ADMIN_PASSWORD` in `apps/api/.env` matches what you typed |
| Newly-published post doesn't appear on `/blogs` | Hard-refresh (Ctrl+Shift+R) — browser may have cached the list |
| Sitemap missing new pages | Make sure they're in `apps/api/src/utils/site-routes.js` |

---

## License

Proprietary — © GMDS Technologies OPC Private Limited. All rights reserved.
