import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  Mail,
  Sparkles
} from 'lucide-react';
import api, { resolveImageUrl } from '@/lib/apiClient';
import SEO, { SITE_URL } from '@/components/SEO.jsx';
import Starfield from '@/components/Starfield.jsx';
import { findTrackBySlug } from '@/lib/tracks.js';

const PAGE_SIZE = 6;

const formatDate = (d) => {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return '';
  }
};

/**
 * Public posts page filtered by a single track (e.g. industries:d2c).
 *
 * `sectionType` is provided by the route in App.jsx: 'industries' or 'resources'.
 * The :slug URL param is the sub-track slug.
 */
const TrackPostsPage = ({ sectionType }) => {
  const { slug } = useParams();
  const track = findTrackBySlug(sectionType, slug);

  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState('loading');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [slug]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await api.listBlogs();
        if (!cancelled) {
          setBlogs(list || []);
          setStatus('ready');
        }
      } catch (err) {
        console.error('Failed to load blogs', err);
        if (!cancelled) setStatus('error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Always run hooks before the early return — React rules of hooks.
  const filtered = useMemo(() => {
    if (!track) return [];
    return blogs.filter((b) => b && b.track === track.trackKey);
  }, [blogs, track]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const nums = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
    const sorted = [...nums].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);
    const withGaps = [];
    sorted.forEach((n, idx) => {
      if (idx > 0 && n - sorted[idx - 1] > 1) withGaps.push('…');
      withGaps.push(n);
    });
    return withGaps;
  }, [currentPage, totalPages]);

  if (!track) {
    return <Navigate to={`/${sectionType}`} replace />;
  }

  const goToPage = (n) => {
    const target = Math.min(Math.max(1, n), totalPages);
    setPage(target);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const Icon = track.icon;
  const sectionLabel = sectionType === 'industries' ? 'Industries' : 'Resources';
  const parentPath = `/${sectionType}`;

  return (
    <>
      <Helmet>
        <title>
          {track.label} — {sectionLabel} | Web2Sales
        </title>
      </Helmet>
      <SEO
        title={`${track.label} — ${sectionLabel}`}
        description={track.description}
        keywords={`${track.label.toLowerCase()}, ${sectionType}, web2sales, website ${track.label.toLowerCase()}`}
        path={`/${sectionType}/${track.slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          url: `${SITE_URL}/${sectionType}/${track.slug}`,
          name: `${track.label} — ${sectionLabel}`,
          description: track.description
        }}
      />

      <section className="page-hero relative">
        <Starfield density={0.7} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link
            to={parentPath}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-white transition-colors mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            All {sectionLabel.toLowerCase()}
          </Link>

          <div className="flex flex-col items-start gap-5">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 text-accent">
              <Icon className="h-6 w-6" />
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              {sectionLabel}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              {track.label}.
            </h1>
            <p className="text-lg md:text-xl text-accent/90 font-medium">{track.tagline}.</p>
            <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {track.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 -mt-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {status === 'loading' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-3xl border border-slate-200/70 bg-white overflow-hidden"
                >
                  <div className="h-48 bg-slate-200/70" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 w-1/3 rounded bg-slate-200/70" />
                    <div className="h-5 w-3/4 rounded bg-slate-200/70" />
                    <div className="h-4 w-full rounded bg-slate-200/70" />
                    <div className="h-4 w-5/6 rounded bg-slate-200/70" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {(status === 'error' ||
            (status === 'ready' && filtered.length === 0)) && (
            <EmptyState track={track} sectionLabel={sectionLabel} />
          )}

          {status === 'ready' && filtered.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paged.map((blog, index) => (
                  <motion.article
                    key={blog.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_16px_40px_-30px_rgba(15,23,42,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-40px_rgba(15,23,42,0.3)] hover:border-primary/30"
                  >
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="block overflow-hidden aspect-[16/10] bg-slate-100"
                    >
                      {blog.coverImage ? (
                        <img
                          src={resolveImageUrl(blog.coverImage)}
                          alt={blog.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-primary/15 via-accent/10 to-slate-100 flex items-center justify-center text-primary">
                          <FileText className="h-10 w-10 opacity-60" />
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        {blog.category && (
                          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider">
                            {blog.category}
                          </span>
                        )}
                        {blog.publishDate && (
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(blog.publishDate)}
                          </span>
                        )}
                      </div>

                      <h2 className="mt-4 text-xl font-bold text-slate-900 leading-snug">
                        <Link
                          to={`/blog/${blog.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {blog.title}
                        </Link>
                      </h2>

                      {blog.excerpt && (
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {blog.excerpt}
                        </p>
                      )}

                      <Link
                        to={`/blog/${blog.slug}`}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary group/link"
                      >
                        Read article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageNumbers={pageNumbers}
                  onGo={goToPage}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

const EmptyState = ({ track, sectionLabel }) => {
  const Icon = track.icon;
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-dashed border-primary/25 bg-gradient-to-br from-white via-primary/5 to-accent/15 p-12 md:p-16 text-center">
      <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent/30 blur-3xl" />
      <div className="relative max-w-2xl mx-auto">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-[0_20px_40px_-20px_rgba(98,85,164,0.55)]"
        >
          <Icon className="h-9 w-9" />
        </motion.div>

        <h3 className="mt-7 text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          Articles in the works.
        </h3>
        <p className="mt-4 text-slate-600 leading-relaxed">
          We're writing the {sectionLabel.toLowerCase()} pieces on{' '}
          <span className="font-semibold text-primary">{track.label}</span> right now. Drop your
          email and we'll send the link the moment the first one is live.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`mailto:nitin@gmdstech.com?subject=Notify%20me%20about%20${encodeURIComponent(track.label)}`}
            className="btn-primary"
          >
            <Mail className="mr-2 h-4 w-4" />
            Email me when ready
          </a>
          <Link to="/blogs" className="btn-secondary">
            Read the general blog
          </Link>
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, pageNumbers, onGo }) => (
  <nav
    aria-label="Posts pagination"
    className="mt-14 flex flex-wrap items-center justify-center gap-2"
  >
    <button
      type="button"
      onClick={() => onGo(currentPage - 1)}
      disabled={currentPage === 1}
      className="inline-flex h-10 items-center gap-1 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
    >
      <ChevronLeft className="h-4 w-4" />
      Previous
    </button>
    <ul className="flex items-center gap-1.5">
      {pageNumbers.map((n, i) =>
        n === '…' ? (
          <li key={`gap-${i}`} className="px-2 text-sm text-slate-400 select-none">
            …
          </li>
        ) : (
          <li key={n}>
            <button
              type="button"
              onClick={() => onGo(n)}
              aria-current={n === currentPage ? 'page' : undefined}
              className={
                n === currentPage
                  ? 'inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25'
                  : 'inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:border-primary/40 hover:text-primary transition'
              }
            >
              {n}
            </button>
          </li>
        )
      )}
    </ul>
    <button
      type="button"
      onClick={() => onGo(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="inline-flex h-10 items-center gap-1 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
    >
      Next
      <ChevronRight className="h-4 w-4" />
    </button>
  </nav>
);

export default TrackPostsPage;
