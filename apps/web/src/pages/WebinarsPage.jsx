import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mic,
  Calendar,
  Clock,
  User,
  Tag,
  PlayCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
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
    return new Date(d).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  } catch {
    return '';
  }
};

const isUpcoming = (w) => new Date(w.scheduledFor).getTime() > Date.now();

const WebinarsPage = () => {
  const [webinars, setWebinars] = useState([]);
  const [status, setStatus] = useState('loading');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await api.listWebinars();
        if (!cancelled) {
          setWebinars(list || []);
          setStatus('ready');
        }
      } catch (err) {
        console.error('Failed to load webinars', err);
        if (!cancelled) setStatus('error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const upcoming = webinars.filter(isUpcoming);
  const past = webinars.filter((w) => !isUpcoming(w));

  const totalPagesPast = Math.max(1, Math.ceil(past.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPagesPast);
  const pagedPast = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return past.slice(start, start + PAGE_SIZE);
  }, [past, currentPage]);

  const goToPage = (n) => {
    const target = Math.min(Math.max(1, n), totalPagesPast);
    setPage(target);
    if (typeof window !== 'undefined') {
      const el = document.getElementById('past-webinars');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const pageNumbers = useMemo(() => {
    if (totalPagesPast <= 7) return Array.from({ length: totalPagesPast }, (_, i) => i + 1);
    const nums = new Set([1, totalPagesPast, currentPage, currentPage - 1, currentPage + 1]);
    const sorted = [...nums].filter((n) => n >= 1 && n <= totalPagesPast).sort((a, b) => a - b);
    const withGaps = [];
    sorted.forEach((n, idx) => {
      if (idx > 0 && n - sorted[idx - 1] > 1) withGaps.push('…');
      withGaps.push(n);
    });
    return withGaps;
  }, [currentPage, totalPagesPast]);

  return (
    <>
      <SEO
        title="Webinars — Live Sessions on Conversion, SEO & Growth | Web2Sales"
        description="Live Web2Sales webinars on conversion design, SEO, page speed, and website growth. Free to join, Q&A included, recordings available."
        keywords="web2sales webinars, conversion webinar, seo webinar india, website growth webinar, live web design session"
        path="/webinars"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          url: `${SITE_URL}/webinars`,
          name: 'Webinars — Web2Sales'
        }}
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
            <Mic className="h-3.5 w-3.5" />
            Webinars
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]"
          >
            Live sessions, <span className="text-gradient">real questions</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            45-minute deep-dives on conversion, SEO, and page speed — with a 15-minute Q&amp;A
            where you bring the actual problem you're stuck on.
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-24 -mt-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {status === 'loading' && (
            <div className="flex items-center justify-center py-24 text-slate-500">
              <Loader2 className="h-6 w-6 animate-spin text-primary mr-3" />
              Loading webinars…
            </div>
          )}

          {(status === 'error' || (status === 'ready' && webinars.length === 0)) && (
            <EmptyState />
          )}

          {status === 'ready' && webinars.length > 0 && (
            <>
              {upcoming.length > 0 && (
                <div className="mb-16">
                  <div className="mb-7 flex items-baseline justify-between gap-3 flex-wrap">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                      Upcoming
                    </h2>
                    <span className="text-sm text-slate-500">
                      {upcoming.length} {upcoming.length === 1 ? 'session' : 'sessions'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcoming.map((w, i) => (
                      <UpcomingCard key={w.slug} w={w} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {past.length > 0 && (
                <div id="past-webinars">
                  <div className="mb-7 flex items-baseline justify-between gap-3 flex-wrap">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                      Past sessions
                    </h2>
                    <span className="text-sm text-slate-500">
                      {past.length} {past.length === 1 ? 'recording' : 'recordings'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {pagedPast.map((w, i) => (
                      <PastCard key={w.slug} w={w} index={i} />
                    ))}
                  </div>

                  {totalPagesPast > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPagesPast}
                      pageNumbers={pageNumbers}
                      onGo={goToPage}
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

const UpcomingCard = ({ w, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.5, delay: index * 0.06 }}
    className="relative overflow-hidden rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-white via-primary/5 to-accent/15 p-6 md:p-8 shadow-[0_24px_50px_-25px_rgba(98,85,164,0.4)] ring-1 ring-primary/10"
  >
    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
    <div className="relative">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-200">
          <span className="relative inline-flex h-1.5 w-1.5">
            <motion.span
              animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full bg-emerald-500"
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Upcoming
        </span>
      </div>
      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">{w.title}</h3>
      {w.description && (
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">{w.description}</p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-primary" />
          {formatDate(w.scheduledFor)}
        </span>
        {w.durationMinutes && (
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary" />
            {w.durationMinutes} min
          </span>
        )}
        {w.speaker && (
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4 text-primary" />
            {w.speaker}
          </span>
        )}
      </div>

      {w.tags && w.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {w.tags.slice(0, 4).map((t) => (
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

      {w.meetingUrl && (
        <a
          href={w.meetingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:-translate-y-0.5"
        >
          Join the session
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </div>
  </motion.article>
);

const PastCard = ({ w, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.2)] hover:border-primary/30 hover:shadow-[0_30px_60px_-30px_rgba(98,85,164,0.3)] transition-all"
  >
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
          Past
        </span>
        <span className="text-xs text-slate-500">{formatDate(w.scheduledFor)}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-900 leading-snug">{w.title}</h3>
      {w.description && (
        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2 flex-1">
          {w.description}
        </p>
      )}
      <div className="mt-4 flex items-center gap-3">
        {w.recordingUrl ? (
          <a
            href={w.recordingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2 transition-all"
          >
            <PlayCircle className="h-4 w-4" />
            Watch recording
          </a>
        ) : (
          <span className="text-xs text-slate-400">Recording coming soon</span>
        )}
      </div>
    </div>
  </motion.article>
);

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
        <Mic className="h-9 w-9" />
      </motion.div>

      <h3 className="mt-7 text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
        First sessions in the works. Wait for the updates.
      </h3>
      <p className="mt-4 text-slate-600 leading-relaxed">
        We're locking dates with the first round of speakers and turning these into actual
        learning sessions — not slide-deck pitches.
      </p>

      <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-left text-sm text-slate-700 max-w-xl mx-auto">
        <li className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
          <span>Live audit clinic — bring your URL, get fixes</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
          <span>Conversion-first design, end to end</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
          <span>Technical SEO — what actually moves rankings</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
          <span>Q&A with founders who shipped a redesign</span>
        </li>
      </ul>

      <p className="mt-7 text-sm text-slate-500 max-w-md mx-auto">
        Each session is free, 45 minutes, with 15 minutes of Q&A. Drop your email and we'll send
        the invite the moment a date is locked.
      </p>

      <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="mailto:nitin@gmdstech.com?subject=Notify%20me%20about%20Web2Sales%20webinars"
          className="btn-primary"
        >
          <Mail className="mr-2 h-4 w-4" />
          Email me when scheduled
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
    aria-label="Past webinars pagination"
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

export default WebinarsPage;
