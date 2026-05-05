import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Sparkles,
  PenTool,
  Code2,
  Search,
  Target,
  Wrench,
  CalendarClock,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import SEO, { SITE_URL } from '@/components/SEO.jsx';
import Reveal from '@/components/Reveal.jsx';
import Starfield from '@/components/Starfield.jsx';

const ServicesPage = () => {
  const { services } = useAuth();

  const serviceTopics = [
    {
      icon: PenTool,
      title: 'Website Design',
      description:
        'Brand-aligned, conversion-focused UI/UX. Wireframes through to high-fidelity comps that feel premium without sacrificing clarity.',
      deliverables: [
        'Wireframes + design system',
        'Mobile-first responsive layouts',
        'Brand-consistent UI components',
        'Information architecture built to convert'
      ]
    },
    {
      icon: Code2,
      title: 'Website Development',
      description:
        'Hand-coded, performant, owned by you. No template bloat, no platform lock-in, sub-second load times on real devices.',
      deliverables: [
        'Custom React / static-site builds',
        'Sub-second Core Web Vitals',
        'Source code you own outright',
        'Deploy + DNS configuration done'
      ]
    },
    {
      icon: Search,
      title: 'SEO Services',
      description:
        'Technical SEO baked into every build, plus on-page content work to climb Google\'s first page — and stay there.',
      deliverables: [
        'Technical SEO audit + fixes',
        'Schema.org structured data',
        'Sitemap, robots.txt, canonicals done right',
        'Keyword-targeted content + on-page optimisation'
      ]
    },
    {
      icon: Target,
      title: 'Conversion Rate Optimisation',
      description:
        'Same traffic, more customers. We strip funnel friction, sharpen messaging, and re-test until the numbers move.',
      deliverables: [
        'Heatmap + behaviour analysis',
        'A/B test setup + reporting',
        'CTA hierarchy and copy rewrites',
        'Funnel-friction audit, page by page'
      ]
    },
    {
      icon: Wrench,
      title: 'Website Maintenance',
      description:
        'Keep your site fast, secure, and current. Monthly retainer covering uptime, updates, performance, and content tweaks.',
      deliverables: [
        'Uptime monitoring + alerts',
        'Security patches + dependency updates',
        'Monthly performance + SEO health report',
        'Content + copy edits as needed'
      ]
    }
  ];

  // The fourth pricing tier ("Custom quote") routes to scheduling for everything
  // outside the three bookable packages — maintenance, CRO sprints, e-commerce, etc.
  const pricingCards = [
    {
      groupLabel: 'Audit',
      ...services.audit,
      ctaText: 'Buy now',
      ctaLink: '/checkout/audit',
      badge: 'Start here'
    },
    {
      groupLabel: 'Website packages',
      ...services.website,
      ctaText: 'Buy now',
      ctaLink: '/checkout/website',
      badge: 'Most popular',
      highlight: true
    },
    {
      groupLabel: 'SEO packages',
      ...services.seo,
      ctaText: 'Subscribe now',
      ctaLink: '/checkout/seo',
      badge: 'Ongoing growth'
    }
  ];

  const provider = { '@type': 'Organization', name: 'Web2Sales', url: SITE_URL };
  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Web2Sales — Website Design, Development, SEO, CRO & Maintenance Services',
    itemListElement: [
      { '@type': 'Service', position: 1, name: 'Website Design', provider, areaServed: 'IN', serviceType: 'Website design' },
      { '@type': 'Service', position: 2, name: 'Website Development', provider, areaServed: 'IN', serviceType: 'Website development' },
      { '@type': 'Service', position: 3, name: 'SEO Services', provider, areaServed: 'IN', serviceType: 'Search engine optimisation' },
      { '@type': 'Service', position: 4, name: 'Conversion Rate Optimisation', provider, areaServed: 'IN', serviceType: 'Conversion rate optimisation' },
      { '@type': 'Service', position: 5, name: 'Website Maintenance', provider, areaServed: 'IN', serviceType: 'Website maintenance' }
    ]
  };

  return (
    <>
      <SEO
        title="Website Design, Development, SEO & Maintenance Services in India — Web2Sales"
        description="Full-stack website services in India: design, development, SEO, conversion rate optimisation, and ongoing maintenance. Buy a fixed package or get a custom quote."
        keywords="website design india, website development india, SEO services india, conversion rate optimisation india, website maintenance india, best website developer india, website audit, custom website quote, monthly website maintenance"
        path="/services"
        jsonLd={servicesJsonLd}
      />

      {/* Hero Section */}
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
            Our services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]"
          >
            Design, build, rank, convert, and{' '}
            <span className="text-gradient">maintain</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Five things we do, three packages plus a custom quote. See the work below, then pick a price.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400"
          >
            <a href="#services" className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 hover:border-accent/40 hover:text-white transition-colors">
              Services
            </a>
            <a href="#pricing" className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 hover:border-accent/40 hover:text-white transition-colors">
              Pricing
            </a>
          </motion.div>
        </div>
      </section>

      {/* 3.x Services — what we do */}
      <section id="services" className="py-20 lg:py-24 -mt-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-12">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              Services
            </span>
            <h2 className="section-heading mt-3">What we do, end to end.</h2>
            <p className="section-copy mt-4">
              Five disciplines that work as a system — buy them packaged below, or scope a custom
              engagement around just what you need.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 md:p-7 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_30px_60px_-30px_rgba(98,85,164,0.35)]"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-primary/10" />
                  <div className="relative flex flex-col h-full">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/25 mb-5">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{topic.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {topic.description}
                    </p>
                    <ul className="mt-5 space-y-2 pt-4 border-t border-slate-100">
                      {topic.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs text-slate-600"
                        >
                          <CheckCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}

            {/* 6th cell — pointer to pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: serviceTopics.length * 0.06 }}
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-primary to-[#3d3175] p-6 md:p-7 text-white shadow-[0_24px_50px_-25px_rgba(98,85,164,0.55)] flex flex-col justify-between"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10 blur-xl" />
              <div className="relative">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                  Ready when you are
                </span>
                <h3 className="mt-3 text-xl font-bold leading-snug">
                  Got the brief? Pick a package.
                </h3>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  Pricing starts at ₹2,360 for an audit. Custom scopes welcome — we'll quote
                  within 24 hours.
                </p>
              </div>
              <a
                href="#pricing"
                className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white"
              >
                Jump to pricing
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6.x Pricing — bookable packages + custom quote */}
      <section id="pricing" className="py-20 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-12">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              Pricing
            </span>
            <h2 className="section-heading mt-3">
              Three set packages, one custom path.
            </h2>
            <p className="section-copy mt-4">
              Fixed pricing for the most common needs — and a custom quote for everything else
              (maintenance retainers, CRO sprints, e-commerce, redesigns).
            </p>
          </Reveal>

          <div className="space-y-6">
            {pricingCards.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`relative overflow-hidden rounded-3xl border shadow-[0_30px_80px_-50px_rgba(15,23,42,0.3)] ${
                  service.highlight
                    ? 'border-primary/30 bg-white ring-1 ring-primary/10'
                    : 'border-slate-200/70 bg-white'
                }`}
              >
                {service.highlight && (
                  <div className="absolute -top-px left-10 right-10 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                )}
                <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-200/70">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Sparkles className="h-3.5 w-3.5 text-primary" />
                          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                            {service.groupLabel}
                          </span>
                        </div>
                        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                          {service.badge}
                        </span>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                          {service.name}
                        </h2>
                        <p className="mt-3 text-slate-600 leading-relaxed">{service.description}</p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-slate-900">
                          ₹{service.total.toLocaleString()}
                        </span>
                        <span className="text-sm text-slate-500">incl. GST</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        Base ₹{service.price.toLocaleString()} + GST ₹{service.gst.toLocaleString()}
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-3 pt-4 border-t border-slate-200">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Timeline
                          </p>
                          <p className="mt-0.5 text-sm font-semibold text-slate-800">{service.timeline}</p>
                        </div>
                        <Link
                          to={service.ctaLink}
                          className="btn-primary text-sm"
                        >
                          {service.ctaText} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 md:p-10 bg-gradient-to-br from-slate-50/60 via-white to-white">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <h3 className="flex items-center text-sm font-bold uppercase tracking-wider text-emerald-700 mb-4">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Included
                        </h3>
                        <ul className="space-y-3">
                          {service.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start text-sm text-slate-700">
                              <CheckCircle className="h-4 w-4 text-emerald-500 mr-2.5 mt-0.5 flex-shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="flex items-center text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                          <XCircle className="h-4 w-4 mr-2" />
                          Not included
                        </h3>
                        <ul className="space-y-3">
                          {service.excludes.map((item, idx) => (
                            <li key={idx} className="flex items-start text-sm text-slate-500">
                              <XCircle className="h-4 w-4 text-slate-400 mr-2.5 mt-0.5 flex-shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* 6.4 — Custom quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: pricingCards.length * 0.08 }}
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#1a1330] via-primary to-[#3d3175] p-8 md:p-12 text-white shadow-[0_30px_80px_-40px_rgba(98,85,164,0.55)]"
            >
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
              <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-accent" />
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                      Custom quote
                    </span>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                    Talk to us
                  </span>
                  <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                    Need something we don't have a price tag for?
                  </h2>
                  <p className="mt-3 text-white/80 leading-relaxed max-w-xl">
                    Maintenance retainers, CRO sprints, e-commerce builds, full redesigns, multi-site
                    rollouts — anything outside the standard packages gets a tailored scope and a
                    quote within 24 hours.
                  </p>
                  <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 max-w-xl">
                    {[
                      'Website maintenance retainers',
                      'CRO sprints (14-day cycles)',
                      'E-commerce + Shopify builds',
                      'Multi-site / multi-language',
                      'Existing site rescue',
                      'Larger website scopes'
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-white/85"
                      >
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-sm p-6 md:p-7">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    What you get
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-white/85">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      <span>20-min discovery call</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      <span>Written scope + fixed quote in 24h</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      <span>No obligation, no pitch deck</span>
                    </li>
                  </ul>
                  <Link
                    to="/contact?action=schedule"
                    className="mt-6 group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white text-primary font-semibold px-5 py-3 text-sm shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5"
                  >
                    <CalendarClock className="h-4 w-4" />
                    Schedule a meeting
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <Link
                    to="/contact"
                    className="mt-3 inline-flex w-full items-center justify-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white transition-colors"
                  >
                    Or send us a message
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="eyebrow">At a glance</span>
            <h2 className="section-heading mt-3">Quick comparison</h2>
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.25)]">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-5 text-left text-sm font-semibold">Feature</th>
                  <th className="p-5 text-center text-sm font-semibold">Audit</th>
                  <th className="p-5 text-center text-sm font-semibold bg-primary">Website</th>
                  <th className="p-5 text-center text-sm font-semibold">SEO Blogs</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-semibold text-slate-700">Price</td>
                  <td className="p-5 text-center text-slate-700">₹2,360</td>
                  <td className="p-5 text-center text-slate-900 font-semibold bg-primary/5">₹14,160</td>
                  <td className="p-5 text-center text-slate-700">₹5,900/mo</td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50/40">
                  <td className="p-5 font-semibold text-slate-700">Timeline</td>
                  <td className="p-5 text-center text-slate-700">5 days</td>
                  <td className="p-5 text-center text-slate-900 font-semibold bg-primary/5">10 days</td>
                  <td className="p-5 text-center text-slate-700">Monthly</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold text-slate-700">Best for</td>
                  <td className="p-5 text-center text-slate-600">Existing websites</td>
                  <td className="p-5 text-center text-slate-900 font-semibold bg-primary/5">New / redesign projects</td>
                  <td className="p-5 text-center text-slate-600">Ongoing SEO growth</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-gradient-to-br from-white via-primary/5 to-primary/10 p-10 md:p-16 text-center">
            <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative">
              <span className="eyebrow">Not sure which fits?</span>
              <h2 className="section-heading mt-3">Let's figure it out together.</h2>
              <p className="section-copy mt-4 mx-auto">
                Get a free consultation and we'll recommend the best path based on your business goals.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/contact" className="btn-primary">
                  Get free consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link to="/about" className="btn-secondary">
                  Learn about us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
