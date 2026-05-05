import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Home, Compass } from 'lucide-react';
import BirdLogo from '@/components/BirdLogo.jsx';
import SEO from '@/components/SEO.jsx';

const popularPages = [
  { path: '/services', label: 'Services', desc: 'Audit, build, and ongoing maintenance.' },
  { path: '/blogs', label: 'Blog', desc: 'Playbooks for converting websites.' },
  { path: '/about', label: 'About', desc: 'The team behind Web2Sales.' },
  { path: '/contact?action=schedule', label: 'Schedule a meeting', desc: 'Book a 20-min call.' }
];

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const onSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    // Treat the search as a blog-list filter — BlogPage already supports a search box.
    navigate(`/blogs?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <SEO
        title="Page not found"
        description="The page you're looking for doesn't exist. Try one of the popular pages below."
        path="/404"
        noindex
      />

      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4 py-24">
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-accent/40 blur-[100px]" />
        <div className="pointer-events-none absolute inset-0 bg-grid-soft opacity-50" />

        <div className="relative w-full max-w-2xl text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 12 }}
            animate={{
              scale: [1, 1.04, 1],
              y: [0, -6, 0],
              opacity: 1
            }}
            transition={{
              scale: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 0.5 }
            }}
            className="mx-auto mb-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-[0_24px_60px_-30px_rgba(98,85,164,0.45)]"
          >
            <BirdLogo className="h-16 w-16 object-contain" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-bold uppercase tracking-[0.32em] text-primary"
          >
            Error 404
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900"
          >
            This page flew the nest.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 mx-auto max-w-md text-base md:text-lg text-slate-600 leading-relaxed"
          >
            We couldn't find what you were looking for. Maybe a typo, a moved page, or it never
            existed. Try a search or pick a popular spot below.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            onSubmit={onSearch}
            className="mt-8 mx-auto flex max-w-md items-stretch overflow-hidden rounded-full border border-slate-200 bg-white shadow-[0_18px_40px_-30px_rgba(15,23,42,0.25)] focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/20"
          >
            <span className="inline-flex items-center pl-5 text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="flex-1 bg-transparent px-3 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="m-1.5 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-transform hover:-translate-y-0.5"
            >
              Search
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-12"
          >
            <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              <Compass className="h-3.5 w-3.5" />
              Popular destinations
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 text-left">
              {popularPages.map((page, i) => (
                <motion.div
                  key={page.path}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.07 }}
                >
                  <Link
                    to={page.path}
                    className="group flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_20px_40px_-30px_rgba(98,85,164,0.35)]"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold text-slate-900 group-hover:text-primary">
                        {page.label}
                      </span>
                      <span className="block text-xs text-slate-500 truncate">{page.desc}</span>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-10"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
            >
              <Home className="h-4 w-4" />
              Back to home
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
