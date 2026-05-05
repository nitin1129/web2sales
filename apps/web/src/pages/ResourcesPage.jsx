import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Newspaper,
  Video,
  Mic,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Mail
} from 'lucide-react';
import SEO, { SITE_URL } from '@/components/SEO.jsx';
import Starfield from '@/components/Starfield.jsx';
import Reveal from '@/components/Reveal.jsx';
import { ALL_RESOURCES } from '@/lib/tracks.js';

// Articles come from the shared track config (so the admin's track dropdown
// and these hub cards stay in sync). Plus a couple of fixed entries for the
// special-case content types: the general blog and Videos / Webinars.
const groups = [
  {
    title: 'Articles',
    description: 'Long-form writing on conversion, SEO, and shipping fast websites.',
    items: [
      {
        icon: Newspaper,
        title: 'Blog',
        description: 'Playbooks, teardowns, and case studies. Updated weekly.',
        to: '/blogs',
        featured: true
      },
      ...ALL_RESOURCES.map((t) => ({
        icon: t.icon,
        title: t.label,
        description: t.tagline,
        to: t.href
      }))
    ]
  },
  {
    title: 'Media',
    description: 'Watch and listen — process walkthroughs and live sessions.',
    items: [
      {
        icon: Video,
        title: 'Videos',
        description:
          'Short walkthroughs of how we audit, design, and deploy real client sites.',
        to: '/videos'
      },
      {
        icon: Mic,
        title: 'Webinars',
        description: 'Live sessions on conversion design, SEO, and growth — Q&A included.',
        to: '/webinars'
      }
    ]
  }
];

const ResourcesPage = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url: `${SITE_URL}/resources`,
    name: 'Resources — Web2Sales',
    description:
      'Web2Sales resources: blog, SEO guides, optimisation tips, case studies, videos, and webinars.',
    publisher: { '@type': 'Organization', name: 'Web2Sales', url: SITE_URL }
  };

  return (
    <>
      <SEO
        title="Resources — Blog, SEO Guides, Case Studies, Videos | Web2Sales"
        description="Articles, SEO guides, optimisation tips, case studies, videos, and webinars from Web2Sales — India's website development and maintenance agency."
        keywords="web2sales resources, website seo guides, conversion optimisation tips, web design case studies, web design videos, web design webinars"
        path="/resources"
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
            <Sparkles className="h-3.5 w-3.5" />
            Resources
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]"
          >
            Everything we've learned, <span className="text-gradient">written down</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Articles, downloads, and live sessions. Pick a category to dive into the feed.
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-24 -mt-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {groups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.05}>
              <div>
                <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                      {group.title}
                    </h2>
                    <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">{group.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {group.items.map((item, ii) => {
                    const Icon = item.icon;
                    const containerClass = item.featured
                      ? 'border-2 border-primary/30 bg-gradient-to-br from-white via-primary/5 to-primary/10 ring-1 ring-primary/10 shadow-[0_24px_50px_-25px_rgba(98,85,164,0.4)]'
                      : 'border border-slate-200/70 bg-white shadow-[0_16px_40px_-30px_rgba(15,23,42,0.2)] hover:border-primary/30 hover:shadow-[0_30px_60px_-30px_rgba(98,85,164,0.3)]';

                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.45, delay: ii * 0.05 }}
                        className={`group relative h-full overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${containerClass}`}
                      >
                        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-primary/10" />
                        <div className="relative flex h-full flex-col">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25 mb-4">
                            <Icon className="h-5 w-5" />
                          </span>
                          <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                          <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                            {item.description}
                          </p>
                          <Link
                            to={item.to}
                            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2 transition-all"
                          >
                            Browse {item.title.toLowerCase()}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-[#1a1330] via-primary to-[#3d3175] p-10 md:p-16 text-center text-white">
            <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-sm">
                <Mail className="h-3.5 w-3.5" />
                Get notified
              </span>
              <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight">
                Be the first to read what's next.
              </h2>
              <p className="mt-4 text-white/80 leading-relaxed">
                We'll email you when new guides, case studies, videos, and webinars go live —
                roughly once a month, no spam.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="mailto:nitin@gmdstech.com?subject=Subscribe%20to%20Web2Sales%20resources"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-primary font-semibold px-6 py-3 text-sm shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4" />
                  Email me when ready
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link to="/blogs" className="btn-ghost-light">
                  Read the blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResourcesPage;
