import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CalendarClock } from 'lucide-react';
import SEO, { SITE_URL } from '@/components/SEO.jsx';
import Starfield from '@/components/Starfield.jsx';
import Reveal from '@/components/Reveal.jsx';
import { ALL_INDUSTRIES } from '@/lib/tracks.js';

const IndustriesPage = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url: `${SITE_URL}/industries`,
    name: 'Industries — Web2Sales',
    description:
      'Web2Sales builds and maintains websites for D2C brands, healthcare, real estate, education, local businesses, and startups across India. Browse industry-specific articles.',
    publisher: { '@type': 'Organization', name: 'Web2Sales', url: SITE_URL }
  };

  return (
    <>
      <SEO
        title="Industries — Web Design & Conversion Playbooks by Sector | Web2Sales"
        description="Industry-specific articles from Web2Sales: D2C brands, healthcare, real estate, education, local businesses, and startups. Each section is a playbook of conversion + SEO insights for your sector."
        keywords="industry website india, d2c website, healthcare website, real estate website, school website, local business seo, startup website, web design by industry"
        path="/industries"
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
            Industries
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]"
          >
            Pick your <span className="text-gradient">industry</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Six sectors we've worked with closely. Each card opens a feed of industry-specific
            articles, audits, and conversion playbooks.
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-28 -mt-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_INDUSTRIES.map((ind, index) => {
              const Icon = ind.icon;
              return (
                <Reveal key={ind.slug} delay={index * 0.05}>
                  <Link
                    to={ind.href}
                    className="group relative h-full block overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-7 md:p-8 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.2)] hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(98,85,164,0.3)] transition-all"
                  >
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-primary/10" />
                    <div className="relative flex flex-col h-full">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#3d3175] text-primary-foreground shadow-md shadow-primary/30 mb-5">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                        {ind.label}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-primary/80">{ind.tagline}</p>
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">
                        {ind.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                        Browse {ind.label} articles
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-gradient-to-br from-white via-primary/5 to-primary/10 p-10 md:p-16 text-center">
            <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative">
              <span className="eyebrow justify-center">
                <Sparkles className="h-3.5 w-3.5" />
                Different industry?
              </span>
              <h2 className="section-heading mt-3">We probably know yours too.</h2>
              <p className="section-copy mt-4 mx-auto">
                The categories above are the ones we've published most about — but the conversion
                principles are universal. Tell us about your business.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/contact?action=schedule" className="btn-primary group">
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Book a 20-min call
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/services" className="btn-secondary">
                  See our services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IndustriesPage;
