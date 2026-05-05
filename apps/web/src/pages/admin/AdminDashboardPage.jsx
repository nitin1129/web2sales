import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Pencil,
  Trash2,
  ExternalLink,
  FileText,
  Calendar,
  Search,
  Clock,
  Layers
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import api, { resolveImageUrl } from '@/lib/apiClient';
import { findTrack } from '@/lib/tracks.js';
import Pagination from '@/components/Pagination.jsx';

const PAGE_SIZE = 10;

const formatDate = (d) => {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return '';
  }
};

const formatDateTime = (d) => {
  if (!d) return '';
  try {
    return new Date(d).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  } catch {
    return '';
  }
};

const isScheduled = (blog) =>
  blog &&
  (blog.status === 'scheduled' ||
    new Date(blog.publishDate || blog.createdAt).getTime() > Date.now());

const sectionOf = (track) => {
  if (!track) return 'general';
  if (track.startsWith('industries:')) return 'industries';
  if (track.startsWith('resources:')) return 'resources';
  return 'general';
};

const SECTION_TABS = [
  { key: 'all', label: 'All' },
  { key: 'general', label: 'Blog' },
  { key: 'industries', label: 'Industries' },
  { key: 'resources', label: 'Resources' }
];

const AdminDashboardPage = () => {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState('loading');
  const [query, setQuery] = useState('');
  const [section, setSection] = useState('all');
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(null);

  // Reset to page 1 whenever filter or search changes — otherwise users get
  // stuck on a page that no longer exists for the new filter.
  useEffect(() => {
    setPage(1);
  }, [section, query]);

  const load = async () => {
    try {
      const list = await api.adminListBlogs();
      setBlogs(list || []);
      setStatus('ready');
    } catch (err) {
      console.error('Failed to load blogs', err);
      setStatus('error');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (slug, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      await api.deleteBlog(slug);
      setBlogs((prev) => prev.filter((b) => b.slug !== slug));
      toast({ title: 'Deleted', description: `"${title}" was removed.` });
    } catch (err) {
      toast({
        title: 'Delete failed',
        description: err.message || 'Please try again.',
        variant: 'destructive'
      });
    } finally {
      setDeleting(null);
    }
  };

  // Counts for each section tab — shown in pill so the admin sees how many
  // posts live in each area at a glance.
  const counts = useMemo(() => {
    const result = { all: blogs.length, general: 0, industries: 0, resources: 0 };
    blogs.forEach((b) => {
      result[sectionOf(b.track)] += 1;
    });
    return result;
  }, [blogs]);

  const filtered = useMemo(() => {
    let list = blogs;
    if (section !== 'all') {
      list = list.filter((b) => sectionOf(b.track) === section);
    }
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((b) =>
        [b.title, b.excerpt, b.category, b.author, b.track]
          .filter(Boolean)
          .some((f) => f.toLowerCase().includes(q))
      );
    }
    return list;
  }, [blogs, section, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const goToPage = (n) => {
    setPage(Math.min(Math.max(1, n), totalPages));
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard — Web2Sales</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Blog posts</h1>
            <p className="mt-1 text-sm text-slate-500">
              Create, edit, and publish articles. Changes go live instantly.
            </p>
          </div>
          <Link
            to="/admin/new"
            className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
          >
            <PlusCircle className="h-4 w-4" />
            New post
          </Link>
        </div>

        {/* Section tabs — separate posts by area so the admin can focus */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {SECTION_TABS.map((tab) => {
            const active = section === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSection(tab.key)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                  active
                    ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-primary/40 hover:text-primary'
                }`}
              >
                {tab.label}
                <span
                  className={`inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                    active
                      ? 'bg-white/25 text-white'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-primary/10'
                  }`}
                >
                  {counts[tab.key] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, category..."
            className="pl-10 rounded-full"
          />
        </div>

        {status === 'loading' && (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500">
            Loading posts...
          </div>
        )}

        {/* On error or no posts, show the friendly empty state — no red banner. */}
        {(status === 'error' || (status === 'ready' && filtered.length === 0)) && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-14 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15 mb-4">
              <FileText className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {query ? 'No posts match your search' : 'No posts yet'}
            </h2>
            <p className="mt-2 text-sm text-slate-500 mb-6">
              {query ? 'Try a different keyword.' : 'Get started by publishing your first article.'}
            </p>
            {!query && (
              <Link
                to="/admin/new"
                className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                <PlusCircle className="h-4 w-4" />
                Write first post
              </Link>
            )}
          </div>
        )}

        {status === 'ready' && filtered.length > 0 && (
          <div className="space-y-3">
            {paged.map((blog) => (
              <div
                key={blog.slug}
                className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.15)] hover:border-primary/30 transition-colors"
              >
                <div className="flex-shrink-0 h-20 w-full sm:w-28 overflow-hidden rounded-xl bg-slate-100">
                  {blog.coverImage ? (
                    <img
                      src={resolveImageUrl(blog.coverImage)}
                      alt={blog.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-primary/15 via-accent/10 to-slate-100 flex items-center justify-center text-primary">
                      <FileText className="h-5 w-5 opacity-60" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1">
                    {isScheduled(blog) && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 font-semibold uppercase tracking-wider text-[10px] ring-1 ring-amber-200">
                        <Clock className="h-2.5 w-2.5" />
                        Scheduled
                      </span>
                    )}
                    {(() => {
                      const t = findTrack(blog.track);
                      if (!t) return null;
                      return (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2 py-0.5 font-semibold uppercase tracking-wider text-[10px] ring-1 ring-primary/15">
                          <Layers className="h-2.5 w-2.5" />
                          {t.section === 'industries' ? 'Industries' : 'Resources'} · {t.label}
                        </span>
                      );
                    })()}
                    {blog.category && (
                      <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 font-semibold uppercase tracking-wider text-[10px]">
                        {blog.category}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {isScheduled(blog)
                        ? `Goes live ${formatDateTime(blog.publishDate)}`
                        : formatDate(blog.publishDate)}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 truncate">/{blog.slug}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 leading-snug truncate">
                    {blog.title}
                  </h3>
                  {blog.excerpt && (
                    <p className="mt-1 text-sm text-slate-500 line-clamp-1">{blog.excerpt}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    to={`/blog/${blog.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-primary transition-colors"
                    title="View"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <Link
                    to={`/admin/edit/${blog.slug}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-primary transition-colors"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => onDelete(blog.slug, blog.title)}
                    disabled={deleting === blog.slug}
                    className="h-9 w-9 p-0 rounded-full text-slate-500 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onGo={goToPage}
              ariaLabel="Admin posts pagination"
              className="pt-4"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboardPage;
