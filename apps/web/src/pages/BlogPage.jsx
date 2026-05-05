import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Sparkles, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import api, { resolveImageUrl } from '@/lib/apiClient';
import SEO, { SITE_URL } from '@/components/SEO.jsx';
import Starfield from '@/components/Starfield.jsx';

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

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState('loading');
  const [page, setPage] = useState(1);

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

  const totalPages = Math.max(1, Math.ceil(blogs.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedBlogs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return blogs.slice(start, start + PAGE_SIZE);
  }, [blogs, currentPage]);

  const goToPage = (next) => {
    const target = Math.min(Math.max(1, next), totalPages);
    setPage(target);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const nums = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
    const sorted = [...nums].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);
    const withGaps = [];
    sorted.forEach((n, idx) => {
      if (idx > 0 && n - sorted[idx - 1] > 1) withGaps.push('…');
      withGaps.push(n);
    });
    return withGaps;
  }, [currentPage, totalPages]);

  return (
    <>
      <SEO
        title="Web Development & Website Maintenance Blog — Web2Sales"
        description="Playbooks, teardowns, and case studies on website development, website maintenance, conversion design, and SEO from Web2Sales — India's best website developer and management agency."
        keywords="website development blog, website maintenance blog, web design india blog, conversion rate optimization blog, SEO blog india, web2sales blog"
        path="/blogs"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Web2Sales Blog',
            url: `${SITE_URL}/blogs`,
            description:
              'Website development and maintenance insights from Web2Sales (GMDS Technologies).',
            publisher: {
              '@type': 'Organization',
              name: 'Web2Sales',
              url: SITE_URL
            }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: blogs.slice(0, 20).map((b, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${SITE_URL}/blog/${b.slug}`,
              name: b.title
            }))
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blogs` }
            ]
          }
        ]}
      />

      {/* Hero */}
      <section className="page-hero relative">
        <Starfield />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Blog
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            Insights on building websites that <span className="text-gradient">actually sell</span>.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Playbooks, teardowns, and case studies from our work with growth-focused teams.
          </p>
        </div>
      </section>

      {/* List */}
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

          {status === 'error' && (
            <div className="text-center py-20">
              <p className="text-slate-600">Couldn't load articles right now. Please try again later.</p>
            </div>
          )}

          {status === 'ready' && blogs.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-14 text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15 mb-4">
                <FileText className="h-7 w-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">No articles yet</h2>
              <p className="mt-2 text-slate-600">Check back soon — new pieces drop regularly.</p>
            </div>
          )}

          {status === 'ready' && blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pagedBlogs.map((blog, index) => (
                <motion.article
                  key={blog.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_16px_40px_-30px_rgba(15,23,42,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-40px_rgba(15,23,42,0.3)] hover:border-primary/30"
                >
                  <Link to={`/blog/${blog.slug}`} className="block overflow-hidden aspect-[16/10] bg-slate-100">
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
                      <Link to={`/blog/${blog.slug}`} className="hover:text-primary transition-colors">
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
          )}

          {status === 'ready' && totalPages > 1 && (
            <nav
              aria-label="Blog pagination"
              className="mt-14 flex flex-wrap items-center justify-center gap-2"
            >
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex h-10 items-center gap-1 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-700"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <ul className="flex items-center gap-1.5">
                {pageNumbers.map((n, i) =>
                  n === '…' ? (
                    <li
                      key={`gap-${i}`}
                      className="px-2 text-sm text-slate-400 select-none"
                      aria-hidden="true"
                    >
                      …
                    </li>
                  ) : (
                    <li key={n}>
                      <button
                        type="button"
                        onClick={() => goToPage(n)}
                        aria-current={n === currentPage ? 'page' : undefined}
                        className={
                          n === currentPage
                            ? 'inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25'
                            : 'inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-primary/40 hover:text-primary'
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
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex h-10 items-center gap-1 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-700"
                aria-label="Next page"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogPage;
