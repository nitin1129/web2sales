import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Pencil,
  Trash2,
  ExternalLink,
  Video as VideoIcon,
  Calendar,
  Search,
  Tag
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/apiClient';
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

const AdminVideosPage = () => {
  const { toast } = useToast();
  const [videos, setVideos] = useState([]);
  const [status, setStatus] = useState('loading');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const load = async () => {
    try {
      const list = await api.listVideos();
      setVideos(list || []);
      setStatus('ready');
    } catch (err) {
      console.error('Failed to load videos', err);
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
      await api.deleteVideo(slug);
      setVideos((prev) => prev.filter((v) => v.slug !== slug));
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

  const filtered = useMemo(() => {
    if (!query) return videos;
    const q = query.toLowerCase();
    return videos.filter((v) =>
      [v.title, v.description, ...(v.tags || [])]
        .filter(Boolean)
        .some((f) => f.toLowerCase().includes(q))
    );
  }, [videos, query]);

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
        <title>Videos — Admin · Web2Sales</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Videos</h1>
            <p className="mt-1 text-sm text-slate-500">
              Add YouTube videos to the public Videos page. SEO-ready: title, tags, description.
            </p>
          </div>
          <Link
            to="/admin/videos/new"
            className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
          >
            <PlusCircle className="h-4 w-4" />
            New video
          </Link>
        </div>

        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, description, tags..."
            className="pl-10 rounded-full"
          />
        </div>

        {status === 'loading' && (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500">
            Loading videos...
          </div>
        )}

        {/* On error or no entries, fall through to the empty state — no scary
            red banner. The 'Add first video' CTA below still works. */}
        {(status === 'error' || (status === 'ready' && filtered.length === 0)) && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-14 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15 mb-4">
              <VideoIcon className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {query ? 'No videos match your search' : 'No videos yet'}
            </h2>
            <p className="mt-2 text-sm text-slate-500 mb-6">
              {query ? 'Try a different keyword.' : 'Add your first YouTube video to get started.'}
            </p>
            {!query && (
              <Link
                to="/admin/videos/new"
                className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                <PlusCircle className="h-4 w-4" />
                Add first video
              </Link>
            )}
          </div>
        )}

        {status === 'ready' && filtered.length > 0 && (
          <div className="space-y-3">
            {paged.map((video) => (
              <div
                key={video.slug}
                className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.15)] hover:border-primary/30 transition-colors"
              >
                <div className="relative flex-shrink-0 h-20 w-full sm:w-32 overflow-hidden rounded-xl bg-slate-900">
                  {video.thumbnailUrl ? (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                      }}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-white">
                      <VideoIcon className="h-5 w-5" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(video.publishDate)}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 truncate">
                      /videos/{video.slug}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 leading-snug truncate">
                    {video.title}
                  </h3>
                  {video.tags && video.tags.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {video.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary"
                        >
                          <Tag className="h-2.5 w-2.5" />
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-primary transition-colors"
                    title="Open on YouTube"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <Link
                    to={`/admin/videos/edit/${video.slug}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-primary transition-colors"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => onDelete(video.slug, video.title)}
                    disabled={deleting === video.slug}
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
              ariaLabel="Admin videos pagination"
              className="pt-4"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AdminVideosPage;
