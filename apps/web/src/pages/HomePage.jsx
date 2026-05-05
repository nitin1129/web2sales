import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Zap,
  Target,
  Sparkles,
  ArrowUpRight,
  Star,
  ShieldCheck,
  Gauge,
  Search,
  Rocket,
  Wrench
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Reveal from '@/components/Reveal.jsx';
import StatCounter from '@/components/StatCounter.jsx';
import Starfield from '@/components/Starfield.jsx';

const HomePage = () => {
  const { services } = useAuth();
  const [activeSolution, setActiveSolution] = useState(0);

  const painPoints = [
    {
      icon: TrendingUp,
      title: 'Low Conversion Rates',
      description: 'Your website gets traffic, but visitors leave without taking action. No inquiries, no sales.'
    },
    {
      icon: Users,
      title: 'Poor User Experience',
      description: 'Confusing navigation, slow loading times, and unclear messaging drive potential customers away.'
    },
    {
      icon: Target,
      title: 'No Clear Call-to-Action',
      description: "Visitors don't know what to do next. Your website lacks strategic CTAs that guide them to convert."
    },
    {
      icon: Zap,
      title: 'Missing Lead Capture',
      description: 'You have no system to capture visitor information, losing potential customers forever.'
    },
    {
      icon: CheckCircle,
      title: 'Zero SEO Visibility',
      description: 'Your website is invisible on Google. No organic traffic means no free leads or sales.'
    },
    {
      icon: Gauge,
      title: 'Slow Performance',
      description: 'Every extra second of load time loses 20% of your visitors before they even see your offer.'
    }
  ];

  const solutions = [
    {
      icon: Users,
      title: 'Get more leads',
      tagline: 'Turn visitors into qualified prospects',
      description:
        'Most sites bleed traffic because there\'s no clear way for a buyer to raise their hand. We engineer the capture path end-to-end.',
      bullets: [
        'High-converting lead-capture forms',
        'Strategic lead magnets and gated offers',
        'Email + WhatsApp capture flows',
        'Heatmap-driven CTA placement'
      ],
      cta: { label: 'Plan my lead engine', href: '/contact?action=schedule' }
    },
    {
      icon: Target,
      title: 'Improve conversion rate',
      tagline: 'Same traffic, more customers',
      description:
        'You don\'t need more visitors — you need more of the ones you have to act. We strip friction at every step of the funnel.',
      bullets: [
        'Above-the-fold value prop rewrite',
        'A/B-tested CTA hierarchy',
        'Trust signals where they matter',
        'Friction audits across the funnel'
      ],
      cta: { label: 'Audit my conversion path', href: '/services' }
    },
    {
      icon: Search,
      title: 'Rank on Google',
      tagline: 'First-page rankings, not invisible',
      description:
        'Technical SEO baked in from day one — fast loads, clean structured data, content that earns positions and holds them.',
      bullets: [
        'Sub-second Core Web Vitals',
        'Schema.org + sitemap done right',
        'Keyword-targeted blog cadence',
        'On-page SEO every page ships with'
      ],
      cta: { label: 'Get my SEO plan', href: '/services' }
    },
    {
      icon: Rocket,
      title: 'Launch a new website',
      tagline: 'A site engineered to sell',
      description:
        'Skip the year-long redesign. We ship a fresh, conversion-tuned, SEO-ready site in weeks — designed to drive revenue, not just look pretty.',
      bullets: [
        'Conversion-focused information architecture',
        'Custom design (no template bloat)',
        'Built on owned code — no lock-in',
        'Live in 4–6 weeks'
      ],
      cta: { label: 'Start a new site', href: '/services' }
    },
    {
      icon: Wrench,
      title: 'Fix existing website',
      tagline: 'Rescue what isn\'t working',
      description:
        'You don\'t need to scrap everything. We audit, optimise, and rebuild only the parts dragging your numbers down — keeping what works.',
      bullets: [
        'Performance + UX audit',
        'Page-by-page conversion fixes',
        'Speed and SEO upgrades',
        'No full rebuild required'
      ],
      cta: { label: 'Audit my site', href: '/services' }
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Audit & Strategy',
      description: 'We analyze your current website performance, identify conversion blockers, and create a strategic roadmap for improvement.'
    },
    {
      step: '02',
      title: 'Optimize & Build',
      description: 'We redesign your website with conversion-focused elements, lead capture forms, and SEO optimization to attract and convert visitors.'
    },
    {
      step: '03',
      title: 'Drive Traffic & Convert',
      description: 'Through strategic SEO content and ongoing optimization, we drive qualified traffic that converts into paying customers.'
    }
  ];

  const serviceCards = [
    {
      ...services.audit,
      icon: TrendingUp,
      benefit: "Discover exactly why your website isn't converting"
    },
    {
      ...services.website,
      icon: Target,
      benefit: 'Get a professional website that generates leads 24/7'
    },
    {
      ...services.seo,
      icon: Zap,
      benefit: 'Rank on Google and attract organic traffic consistently'
    }
  ];

  const testimonials = [
    {
      quote:
        "Within six weeks our qualified leads tripled. The new site finally does what a website should: sell for us, not just sit there.",
      name: 'Priya Sharma',
      role: 'Founder · ClearLedger',
      rating: 5
    },
    {
      quote:
        "They rebuilt our landing page end-to-end. Page speed, copy, CTAs — everything. Our cost-per-lead dropped by 42%.",
      name: 'Rahul Mehta',
      role: 'Head of Growth · Northbound',
      rating: 5
    },
    {
      quote:
        "The audit alone was worth 10× the price. Clear, specific, actionable. We knew exactly what to fix and why.",
      name: 'Ananya Desai',
      role: 'CEO · Loomwork Studio',
      rating: 5
    }
  ];

  const faqs = [
    {
      q: 'How long does a typical website project take?',
      a: 'Most business websites launch within 10 days. Complex projects with custom integrations take 3-4 weeks. Our audit reports are delivered within 5 business days.'
    },
    {
      q: 'Do I own the website and code after it’s built?',
      a: 'Yes — on final payment the site, code, design files, and hosting accounts are fully transferred to you. No lock-in, no ongoing fees.'
    },
    {
      q: 'What if I already have a website?',
      a: 'Start with our Website Audit. We pinpoint the exact blockers costing you conversions and hand you a prioritized fix list — whether we build it or your team does.'
    },
    {
      q: 'How do you measure success?',
      a: 'We track conversion rate, qualified leads, bounce rate, Core Web Vitals, and keyword rankings. You get a monthly report showing the numbers that actually move revenue.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Web2Sales — Turn Your Website Into a 24×7 Sales Machine | GMDS Technologies</title>
        <meta
          name="description"
          content="Stop losing customers to poorly designed websites. Web2Sales transforms your business website into a lead-generating sales machine with proven conversion strategies."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="page-hero relative">
        <Starfield />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-sm"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Websites that pay for themselves
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05]"
              >
                Your best salesperson should be your{' '}
                <span className="text-gradient">website</span>.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mt-6 max-w-xl text-lg leading-8 text-slate-300"
              >
                We engineer conversion-first websites that load in under a second, speak directly to
                your buyer, and turn strangers into qualified leads — while you sleep, eat, or ship
                the next thing.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Link to="/services" className="btn-primary group">
                  Start your project
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/contact" className="btn-ghost-light">
                  Book a free call
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Sub-second load time
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  SEO-ready on day one
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Owned code, no lock-in
                </div>
              </motion.div>
            </div>

            {/* Browser-mockup visual */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-accent/30 blur-3xl"
              />
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-primary/50 blur-3xl"
              />

              <div className="relative rounded-[1.75rem] border border-white/15 bg-slate-900/80 backdrop-blur-xl shadow-[0_40px_120px_-40px_rgba(0,0,0,0.7)]">
                {/* browser chrome */}
                <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="flex-1 max-w-[220px] rounded-full bg-white/5 border border-white/10 px-3 py-1 text-center">
                    <span className="text-[11px] font-mono text-slate-400">
                      yourbusiness.com
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="relative inline-flex h-2 w-2">
                      <motion.span
                        animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full bg-emerald-400"
                      />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                      Live
                    </span>
                  </div>
                </div>

                {/* browser body */}
                <div className="p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="eyebrow-light">Launch report</p>
                      <p className="mt-1.5 text-2xl font-bold text-white">Your site, scored</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 text-[11px] font-semibold text-emerald-300">
                      <ShieldCheck className="h-3 w-3" /> A+ grade
                    </span>
                  </div>

                  {/* Score bars */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-3.5">
                    {[
                      { label: 'Performance', score: 98, color: 'from-emerald-400 to-accent' },
                      { label: 'SEO', score: 100, color: 'from-accent to-primary' },
                      { label: 'Accessibility', score: 96, color: 'from-primary to-fuchsia-400' },
                      { label: 'Best practices', score: 100, color: 'from-fuchsia-400 to-rose-400' },
                    ].map((row, i) => (
                      <div key={row.label}>
                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="text-slate-300 font-medium">{row.label}</span>
                          <span className="font-mono font-semibold text-white tabular-nums">
                            <StatCounter to={row.score} duration={1.2} />
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${row.score}%` }}
                            transition={{ duration: 1.1, delay: 0.5 + i * 0.12, ease: 'easeOut' }}
                            className={`h-full bg-gradient-to-r ${row.color} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* stat tiles */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Largest paint
                      </p>
                      <p className="mt-1.5 text-xl font-bold text-white">0.6s</p>
                      <p className="mt-0.5 text-[11px] text-emerald-300">↓ from 3.2s</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Bundle size
                      </p>
                      <p className="mt-1.5 text-xl font-bold text-white">48 kB</p>
                      <p className="mt-0.5 text-[11px] text-emerald-300">↓ 84% smaller</p>
                    </div>
                  </div>

                  {/* status row */}
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <span className="inline-flex flex-shrink-0 h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30">
                      <CheckCircle className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-300 truncate">
                        All pages pass <span className="text-white font-semibold">Core Web Vitals</span>
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 flex-shrink-0">mobile · desktop</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-14">
            <span className="eyebrow">The problem</span>
            <h2 className="section-heading mt-3">Why most websites don't generate business</h2>
            <p className="section-copy mt-4">
              These critical mistakes are quietly costing you customers and revenue every single day.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-7 card-hover"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-primary/10" />
                  <div className="relative">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-slate-900">{point.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{point.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions Section — interactive tabs */}
      <section className="relative py-20 lg:py-28 bg-white border-y border-slate-200/70 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/5 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-[120px]"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-14">
            <span className="eyebrow">Solutions</span>
            <h2 className="section-heading mt-3">
              Pick the outcome that <span className="text-primary">moves your business</span>.
            </h2>
            <p className="section-copy mt-4">
              Whatever's stuck — leads, conversions, search rankings, or the site itself — we've
              built a path to fix it. Click one to see how.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8 items-start">
            {/* Left rail — clickable tabs */}
            <Reveal className="space-y-3 lg:col-span-2" delay={0.05}>
              {solutions.map((solution, index) => {
                const Icon = solution.icon;
                const isActive = activeSolution === index;
                return (
                  <button
                    key={solution.title}
                    type="button"
                    onClick={() => setActiveSolution(index)}
                    onMouseEnter={() => setActiveSolution(index)}
                    aria-selected={isActive}
                    role="tab"
                    className={`group relative w-full overflow-hidden rounded-2xl border p-4 sm:p-5 text-left transition-all duration-300 ${
                      isActive
                        ? 'border-primary/50 bg-primary/5 ring-2 ring-primary/15 shadow-[0_20px_40px_-22px_rgba(98,85,164,0.45)]'
                        : 'border-slate-200/70 bg-white hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-20px_rgba(15,23,42,0.15)]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="solution-active-indicator"
                        className="absolute inset-y-0 left-0 w-[3px] rounded-r-full bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <div className="flex items-center gap-4">
                      <span
                        className={`inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                            : 'bg-primary/10 text-primary group-hover:bg-primary/15'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm sm:text-base font-bold transition-colors ${
                            isActive ? 'text-primary' : 'text-slate-900'
                          }`}
                        >
                          {solution.title}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500 truncate">
                          {solution.tagline}
                        </p>
                      </div>
                      <ArrowRight
                        className={`h-4 w-4 flex-shrink-0 transition-all duration-300 ${
                          isActive
                            ? 'text-primary translate-x-0 opacity-100'
                            : 'text-slate-300 -translate-x-1 opacity-0 group-hover:opacity-60 group-hover:translate-x-0'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </Reveal>

            {/* Right panel — animated detail */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSolution}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.32, ease: 'easeOut' }}
                  className="relative overflow-hidden rounded-3xl border-2 border-primary/15 bg-white p-8 md:p-10 ring-1 ring-primary/5 shadow-[0_30px_60px_-25px_rgba(98,85,164,0.35),0_8px_24px_-12px_rgba(15,23,42,0.12)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
                  />

                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                        {React.createElement(solutions[activeSolution].icon, {
                          className: 'h-7 w-7'
                        })}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                        {String(activeSolution + 1).padStart(2, '0')} ·{' '}
                        {solutions[activeSolution].tagline}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl md:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                      {solutions[activeSolution].title}.
                    </h3>

                    <p className="mt-4 text-slate-600 leading-relaxed">
                      {solutions[activeSolution].description}
                    </p>

                    <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                      {solutions[activeSolution].bullets.map((bullet, i) => (
                        <motion.li
                          key={bullet}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.28, delay: 0.08 + i * 0.05 }}
                          className="flex items-start gap-2.5 text-sm text-slate-700"
                        >
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <span>{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <Link
                        to={solutions[activeSolution].cta.href}
                        className="btn-primary group"
                      >
                        {solutions[activeSolution].cta.label}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        to="/services"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
                      >
                        See full services
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots indicator (mobile-only flair) */}
              <div className="mt-5 flex justify-center gap-1.5 lg:hidden">
                {solutions.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveSolution(i)}
                    aria-label={`Show solution ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      activeSolution === i
                        ? 'w-8 bg-primary'
                        : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-28 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <span className="eyebrow">The method</span>
            <h2 className="section-heading mt-3">How Web2Sales works</h2>
            <p className="section-copy mt-4 mx-auto text-center">
              Our proven 3-step system turns your website into a lead-generating machine.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
            <div
              aria-hidden
              className="hidden md:block absolute top-14 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            />
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50 p-8 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.25)]"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-lg shadow-primary/25">
                    {step.step}
                  </span>
                  {index < howItWorks.length - 1 && (
                    <ArrowRight className="hidden md:block h-5 w-5 text-slate-300" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="eyebrow">What we offer</span>
              <h2 className="section-heading mt-3">Our services</h2>
              <p className="section-copy mt-4">Choose the solution that fits where your business is right now.</p>
            </div>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              View all services
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceCards.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative flex flex-col rounded-3xl border border-slate-200/70 bg-white p-8 card-hover"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary ring-1 ring-primary/10">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-slate-900">{service.name}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{service.benefit}</p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">
                      ₹{service.total.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500">incl. GST</span>
                  </div>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                    {service.timeline}
                  </p>
                  <Link
                    to={`/checkout/${service.id}`}
                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-primary group-hover:-translate-y-0.5"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow">Proof it works</span>
            <h2 className="section-heading mt-3">Founders who stopped settling for pretty websites.</h2>
            <p className="section-copy mt-4">
              Real teams, real revenue. Here's what they say after switching to a conversion-focused site.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex flex-col rounded-3xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50 p-8 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.25)]"
              >
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-slate-800 leading-relaxed">
                  <span className="text-primary/30 text-4xl leading-none font-serif absolute top-6 right-7 select-none">
                    ”
                  </span>
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-slate-200/70">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold flex items-center justify-center">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="eyebrow">Frequently asked</span>
            <h2 className="section-heading mt-3">Answers before you ask.</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((f, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.2)] open:border-primary/30 transition-colors"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <span className="text-base font-semibold text-slate-900">{f.q}</span>
                  <span className="flex-shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-slate-500 text-lg leading-none transition-all group-open:bg-primary group-open:text-white group-open:border-primary group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Final CTA Section */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dark-section rounded-[2.5rem] px-8 py-16 sm:px-12 lg:px-16">
            <div className="text-center max-w-3xl mx-auto">
              <span className="eyebrow-light">Results-driven growth</span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Trusted by businesses that want to <span className="text-gradient">grow faster</span>.
              </h2>
              <p className="mt-5 text-slate-300 leading-relaxed">
                Real outcomes from teams who stopped settling for brochure websites.
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                { stat: '100+', label: 'Websites Optimized' },
                { stat: '3×', label: 'Average Conversion Increase' },
                { stat: '24/7', label: 'Lead Generation Automation' }
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-1"
                >
                  <p className="text-5xl font-bold text-white">{item.stat}</p>
                  <p className="mt-3 text-sm text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/services" className="btn-primary">
                Explore services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn-ghost-light">
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
