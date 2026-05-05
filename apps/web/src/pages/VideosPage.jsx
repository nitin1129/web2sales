import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Video,
  Play,
  Tag,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Mail,
  Loader2
} from 'lucide-react';
import api from '@/lib/apiClient';
import SEO, { SITE_URL } from '@/components/SEO.jsx';
import Starfield from '@/components/Starfield.jsx';

const PAGE_SIZE = 6;

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

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [status, setStatus] = useState('loading');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await api.listVideos();
        if (!cancelled) {
          setVideos(list || []);
          setStatus('ready');
        }
      } catch (err) {
        console.error('Failed to load videos', err);
        if (!cancelled) setStatus('error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(videos.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return videos.slice(start, start + PAGE_SIZE);
  }, [videos, currentPage]);

  const goToPage = (n) => {
    const target = Math.min(Math.max(1, n), totalPages);
    setPage(target);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url: `${SITE_URL}/videos`,
    name: 'Videos — Web2Sales',
    description:
      'Web2Sales video library — process walkthroughs, audit teardowns, and design demos.'
  };

  return (
    <>
      <SEO
        title="Videos — Web Design & SEO Walkthroughs | Web2Sales"
        description="Watch Web2Sales videos: real client audit walkthroughs, conversion design teardowns, SEO demos, and behind-the-build process."
        keywords="web2sales videos, website audit videos, conversion design videos, seo tutorial videos, web design walkthroughs"
        path="/videos"
        jsonLd={jsonLd}
      />

      <section className="page-hero relative">
        <Starfield />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-sm"
          >
            <Video className="h-3.5 w-3.5" />
            Videos
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]"
          >
            Watch how we <span className="text-gradient">build, audit, and ship</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Short walkthroughs of real client audits, conversion teardowns, and the design
            decisions behind sites we've shipped.
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-24 -mt-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {status === 'loading' && (
            <div className="flex items-center justify-center py-24 text-slate-500">
              <Loader2 className="h-6 w-6 animate-spin text-primary mr-3" />
              Loading videos…
            </div>
          )}

          {/* Treat 'no videos' and 'API offline' the same — both mean the visitor
              sees nothing actionable. A friendly waiting screen reads better than
              a red error. */}
          {(status === 'error' || (status === 'ready' && videos.length === 0)) && (
            <EmptyState />
          )}

          {status === 'ready' && videos.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paged.map((v, index) => (
                  <motion.article
                    key={v.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_16px_40px_-30px_rgba(15,23,42,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_30px_70px_-30px_rgba(98,85,164,0.35)]"
                  >
                    <a
                      href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative overflow-hidden aspect-video bg-slate-900"
                    >
                      <img
                        src={v.thumbnailUrl}
                        alt={v.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;
                        }}
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-primary shadow-2xl transition-transform group-hover:scale-110">
                          <Play className="h-7 w-7 fill-current ml-1" />
                        </span>
                      </span>
                    </a>

                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        {v.publishDate && <span>{formatDate(v.publishDate)}</span>}
                      </div>
                      <h2 className="text-lg font-bold text-slate-900 leading-snug">
                        <a
                          href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          {v.title}
                        </a>
                      </h2>
                      {v.description && (
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {v.description}
                        </p>
                      )}
                      {v.tags && v.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {v.tags.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary"
                            >
                              <Tag className="h-2.5 w-2.5" />
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      <a
                        href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2 transition-all"
                      >
                        Watch on YouTube
                        <ArrowRight className="h-4 w-4" />
                      </a>
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

const EmptyState = () => (
  <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-dashed border-primary/25 bg-gradient-to-br from-white via-primary/5 to-accent/15 p-12 md:p-16 text-center">
    <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-primary/8 blur-3xl" />
    <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent/30 blur-3xl" />
    <div className="relative max-w-2xl mx-auto">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-[0_20px_40px_-20px_rgba(98,85,164,0.55)]"
      >
        <Video className="h-9 w-9" />
      </motion.div>

      <h3 className="mt-7 text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
        We're filming. Wait for the updates.
      </h3>
      <p className="mt-4 text-slate-600 leading-relaxed">
        The studio's set up and the first batch is in production — short, sharp walkthroughs on
        the things we get asked about most.
      </p>

      <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-left text-sm text-slate-700 max-w-xl mx-auto">
        <li className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
          <span>Auditing a slow D2C site live, on camera</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
          <span>Lighthouse score teardowns, end to end</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
          <span>Hero-section rewrites that moved the needle</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
          <span>From Figma to deploy in 30 minutes</span>
        </li>
      </ul>

      <p className="mt-7 text-sm text-slate-500 max-w-md mx-auto">
        Bookmark this page or drop your email below — we'll send the link the moment the first
        one publishes.
      </p>

      <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="mailto:nitin@gmdstech.com?subject=Notify%20me%20about%20Web2Sales%20videos"
          className="btn-primary"
        >
          <Mail className="mr-2 h-4 w-4" />
          Email me when the first one drops
        </a>
        <Link to="/blogs" className="btn-secondary">
          Read articles in the meantime
        </Link>
      </div>
    </div>
  </div>
);

const Pagination = ({ currentPage, totalPages, pageNumbers, onGo }) => (
  <nav
    aria-label="Videos pagination"
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

export default VideosPage;
