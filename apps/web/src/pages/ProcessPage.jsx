import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarClock,
  ClipboardList,
  PenTool,
  Code2,
  Rocket,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import SEO, { SITE_URL } from '@/components/SEO.jsx';
import Starfield from '@/components/Starfield.jsx';
import Reveal from '@/components/Reveal.jsx';

const steps = [
  {
    icon: CalendarClock,
    title: 'Discovery call',
    duration: '~20 minutes',
    tagline: 'Understand your business and goals',
    description:
      'A short, no-pitch call where we listen. We learn about your business, your current site, your customers, and what success actually looks like for you.',
    deliverables: [
      'Clear understanding of your goals',
      'High-level feasibility check',
      'Estimated timeline + budget range'
    ],
    cta: { label: 'Book your discovery call', href: '/contact?action=schedule' }
  },
  {
    icon: ClipboardList,
    title: 'Audit & requirement gathering',
    duration: '3–5 days',
    tagline: 'Diagnose, document, define',
    description:
      "We audit your existing site (if any), research competitors, and document detailed requirements. By the end you have a written scope of work — not a Slack thread.",
    deliverables: [
      'Performance, SEO, and UX audit',
      'Competitor + benchmark analysis',
      'Detailed requirement document',
      'Fixed-price proposal'
    ]
  },
  {
    icon: PenTool,
    title: 'Design',
    duration: '1–2 weeks',
    tagline: 'Wireframes through to high-fidelity comps',
    description:
      'Conversion-first design. We start with wireframes, iterate with you, then move to full visual design with the brand applied. Nothing ships without your sign-off.',
    deliverables: [
      'Wireframes (low-fidelity)',
      'Visual design system + tokens',
      'High-fidelity mockups',
      'Interactive prototype (optional)'
    ]
  },
  {
    icon: Code2,
    title: 'Development',
    duration: '2–4 weeks',
    tagline: 'Hand-coded, performant, owned by you',
    description:
      'Custom development with sub-second load times baked in from day one. Weekly demos, transparent code, no template bloat — and the source code lives in your repo.',
    deliverables: [
      'Custom React / static-site code',
      'CMS integration where needed',
      'Sub-second Core Web Vitals',
      'Source code in your repository'
    ]
  },
  {
    icon: Rocket,
    title: 'Launch',
    duration: '1–2 days',
    tagline: 'Smooth handoff, zero downtime',
    description:
      "DNS, SSL, analytics, search console, structured data — every box ticked before we flip the switch. Then we go live, monitor for 48 hours, and fix anything that surfaces.",
    deliverables: [
      'Production deploy with rollback plan',
      'DNS + SSL + analytics setup',
      'Sitemap + Search Console submission',
      '48-hour post-launch monitoring'
    ]
  },
  {
    icon: TrendingUp,
    title: 'Optimization',
    duration: 'Ongoing',
    tagline: 'Iterate based on real numbers',
    description:
      'Launching is the start, not the finish. We track conversion metrics, run A/B tests, refine copy + CTAs, and keep the SEO content engine running so the site keeps earning.',
    deliverables: [
      'Monthly performance + SEO report',
      'A/B test setup + analysis',
      'Iterative copy and CTA improvements',
      'Ongoing SEO content cadence'
    ]
  }
];

const ProcessPage = () => {
  const processJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How Web2Sales builds a website',
    description:
      'The 6-step process Web2Sales follows for every project — from discovery call to optimization.',
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.description
    }))
  };

  return (
    <>
      <SEO
        title="How We Work — The Web2Sales Process"
        description="The 6-step process Web2Sales follows for every project: discovery, audit, design, development, launch, and optimization. Transparent timelines, fixed pricing, written scopes."
        keywords="web2sales process, website development process, how we work, web design workflow, website project lifecycle, website development timeline india"
        path="/process"
        jsonLd={processJsonLd}
      />

      {/* Hero */}
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
            How we work
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]"
          >
            From hello to launch — and{' '}
            <span className="text-gradient">beyond</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Six steps. Transparent timelines. Written scopes. No mystery, no surprises — here's
            exactly how every Web2Sales project goes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10"
          >
            <Link to="/contact?action=schedule" className="btn-primary group">
              <CalendarClock className="mr-2 h-4 w-4" />
              Start with a discovery call
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Editorial alternating sections — each step gets its own full-width spread */}
      <div className="relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const flip = index % 2 === 1; // alternate sides
          const tinted = index % 2 === 1;
          return (
            <section
              key={step.title}
              className={`relative overflow-hidden py-24 lg:py-32 ${
                tinted
                  ? 'bg-gradient-to-br from-primary/5 via-white to-accent/10'
                  : 'bg-white'
              } ${index > 0 ? 'border-t border-slate-200/60' : ''}`}
            >
              {/* Floating background blob */}
              <div
                aria-hidden
                className={`pointer-events-none absolute h-[500px] w-[500px] rounded-full blur-[140px] ${
                  flip
                    ? '-bottom-40 -right-40 bg-primary/8'
                    : '-top-40 -left-40 bg-accent/30'
                }`}
              />

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                  className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                    flip ? 'lg:[&>*:first-child]:order-last' : ''
                  }`}
                >
                  {/* MASSIVE step number — the visual anchor */}
                  <Reveal y={30}>
                    <div className="relative">
                      <span
                        aria-hidden
                        className="select-none block leading-[0.85] font-black tracking-tighter text-[10rem] sm:text-[14rem] lg:text-[18rem] xl:text-[22rem] bg-gradient-to-br from-primary via-[#9183c5] to-accent bg-clip-text text-transparent"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Icon badge floats over the bottom-right of the number */}
                      <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 220, damping: 18 }}
                        className="absolute -bottom-2 right-2 sm:right-6 lg:right-12"
                      >
                        <div className="flex h-20 w-20 lg:h-24 lg:w-24 items-center justify-center rounded-3xl bg-white text-primary shadow-[0_24px_50px_-15px_rgba(98,85,164,0.45)] ring-2 ring-primary/15">
                          <Icon className="h-9 w-9 lg:h-11 lg:w-11" />
                        </div>
                      </motion.div>

                      {/* Vertical connector — only between sections */}
                      {index < steps.length - 1 && (
                        <span
                          aria-hidden
                          className="absolute left-1/2 -translate-x-1/2 -bottom-32 h-24 w-px bg-gradient-to-b from-primary/40 to-transparent hidden lg:block"
                        />
                      )}
                    </div>
                  </Reveal>

                  {/* Content */}
                  <Reveal y={30} delay={0.1}>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary ring-1 ring-primary/15">
                          Step {index + 1}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          {step.duration}
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.05]">
                        {step.title}.
                      </h2>
                      <p className="mt-3 text-lg font-medium text-primary">{step.tagline}</p>
                      <p className="mt-5 text-slate-600 leading-relaxed text-base md:text-lg max-w-xl">
                        {step.description}
                      </p>

                      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 max-w-xl">
                        {step.deliverables.map((d) => (
                          <div
                            key={d}
                            className="flex items-start gap-2.5 text-sm text-slate-700"
                          >
                            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                            <span className="leading-relaxed">{d}</span>
                          </div>
                        ))}
                      </div>

                      {step.cta && (
                        <Link
                          to={step.cta.href}
                          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 group"
                        >
                          {step.cta.label}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      )}
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Final CTA */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-gradient-to-br from-white via-primary/5 to-primary/10 p-10 md:p-16 text-center">
            <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative">
              <span className="eyebrow justify-center">
                <Sparkles className="h-3.5 w-3.5" />
                Ready when you are
              </span>
              <h2 className="section-heading mt-3">Step 1 starts with a 20-minute call.</h2>
              <p className="section-copy mt-4 mx-auto">
                No pressure, no pitch deck — just a conversation about whether we're a fit.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/contact?action=schedule" className="btn-primary group">
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Book discovery call
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/services" className="btn-secondary">
                  See pricing first
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProcessPage;
