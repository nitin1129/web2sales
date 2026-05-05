import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, User, ArrowRight } from 'lucide-react';
import api, { resolveImageUrl } from '@/lib/apiClient';
import SEO, { SITE_URL } from '@/components/SEO.jsx';
import Starfield from '@/components/Starfield.jsx';

const calculateReadTime = (content) => {
  if (!content) return 1;
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return '';
  }
};

const BlogDetailPage = () => {
  const { id: slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const coverRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ['start end', 'end start']
  });
  const coverY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    (async () => {
      try {
        const record = await api.getBlog(slug);
        if (!cancelled) setBlog(record);
      } catch (err) {
        console.error('Error fetching blog:', err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
          <p className="text-sm font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="rounded-3xl border border-slate-200/70 bg-white p-10 text-center shadow-[0_30px_80px_-50px_rgba(15,23,42,0.25)]">
          <p className="text-lg text-slate-700 mb-5">Article not found</p>
          <Link to="/blogs" className="btn-primary">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const seo = blog.seo || {};
  const metaTitle = seo.metaTitle || blog.title;
  const metaDescription = seo.metaDescription || blog.excerpt || blog.title;
  const keywords = seo.keywords || '';
  const postPath = `/blog/${blog.slug}`;
  const canonical =
    seo.canonicalUrl && seo.canonicalUrl !== `${SITE_URL}/`
      ? seo.canonicalUrl
      : `${SITE_URL}${postPath}`;
  const ogImage = resolveImageUrl(seo.ogImage || blog.coverImage || '');
  const coverImage = resolveImageUrl(blog.coverImage || '');

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    headline: blog.title,
    description: metaDescription,
    image: ogImage || undefined,
    datePublished: blog.publishDate,
    dateModified: blog.updatedAt || blog.publishDate,
    author: blog.author
      ? { '@type': 'Person', name: blog.author }
      : { '@type': 'Organization', name: 'Web2Sales' },
    publisher: {
      '@type': 'Organization',
      name: 'Web2Sales',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` }
    },
    keywords: keywords || undefined,
    articleSection: blog.category || undefined,
    inLanguage: 'en-IN'
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blogs` },
      { '@type': 'ListItem', position: 3, name: blog.title, item: canonical }
    ]
  };

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        keywords={keywords}
        canonical={canonical}
        image={ogImage}
        ogType="article"
        author={blog.author}
        publishedTime={blog.publishDate}
        modifiedTime={blog.updatedAt || blog.publishDate}
        jsonLd={[articleJsonLd, breadcrumbJsonLd]}
      />

      <article>
        {/* Header */}
        <section className="page-hero relative">
          <Starfield density={0.6} />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>

            {blog.category && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-5">
                {blog.category}
              </span>
            )}

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-3xl">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="mt-5 text-lg text-slate-300 leading-relaxed max-w-2xl">
                {blog.excerpt}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300">
              {blog.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{blog.author}</span>
                </div>
              )}
              {blog.publishDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(blog.publishDate)}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{calculateReadTime(blog.content)} min read</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cover image — subtle parallax on scroll */}
        {coverImage && (
          <div ref={coverRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
            <div className="overflow-hidden rounded-3xl border border-white/20 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.5)]">
              <motion.img
                src={coverImage}
                alt={blog.title}
                style={{ y: coverY, scale: 1.08 }}
                className="w-full h-auto object-cover will-change-transform"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-8 md:p-12 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.25)]">
            <div className="space-y-5 text-slate-700 leading-[1.8]">
              {(blog.content || '')
                .split(/\n{2,}/)
                .map((paragraph, index) =>
                  paragraph.trim() ? <p key={index}>{paragraph}</p> : null
                )}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 dark-section rounded-[2rem] p-10 md:p-14 text-center">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to transform your website?
              </h2>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                Let's turn your website into a 24×7 sales machine.
              </p>
              <Link to="/services" className="btn-primary">
                View our services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogDetailPage;
