import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Target,
  Users,
  TrendingUp,
  Award,
  ArrowRight,
  Sparkles,
  Compass,
  Eye,
  Briefcase,
  Mail
} from 'lucide-react';
import SEO, { SITE_URL } from '@/components/SEO.jsx';
import StatCounter from '@/components/StatCounter.jsx';
import Starfield from '@/components/Starfield.jsx';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We focus on measurable outcomes that directly impact your bottom line.'
    },
    {
      icon: Users,
      title: 'Client-Centric',
      description: 'Your success is our success. We work as an extension of your team.'
    },
    {
      icon: TrendingUp,
      title: 'Data-Backed',
      description: 'Every recommendation is based on analytics and proven conversion strategies.'
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'We deliver premium solutions that stand the test of time.'
    }
  ];

  const stats = [
    { value: 100, suffix: '+', label: 'Websites Optimized' },
    { value: 3, suffix: '×', label: 'Average Conversion Increase' },
    { value: 95, suffix: '%', label: 'Client Satisfaction Rate' }
  ];

  return (
    <>
      <SEO
        title="About GMDS Technologies — Best Website Developer & Maintenance Team in India"
        description="Meet the team behind Web2Sales. GMDS Technologies is an India-based website development and maintenance agency building conversion-focused, SEO-ready sites for growth-minded businesses."
        keywords="about web2sales, gmds technologies, best website developer india, website development agency india, website maintenance team, conversion-focused web agency"
        path="/about"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          url: `${SITE_URL}/about`,
          name: 'About GMDS Technologies',
          description:
            'GMDS Technologies OPC Private Limited (Web2Sales) — India-based website development and maintenance agency.',
          publisher: {
            '@type': 'Organization',
            name: 'Web2Sales',
            legalName: 'GMDS Technologies OPC Private Limited',
            url: SITE_URL
          }
        }}
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
            About us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]"
          >
            We help businesses unlock the <span className="text-gradient">true potential</span> of their websites.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            A small team of conversion specialists obsessed with turning clicks into customers.
          </motion.p>
        </div>
      </section>

      {/* About Web2Sales */}
      <section id="about" className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start">
            <div className="md:sticky md:top-28">
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" />
                About Web2Sales
              </span>
              <h2 className="section-heading mt-3 md:max-w-xs">From pretty websites to profitable ones.</h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="space-y-5 text-lg text-slate-700 leading-relaxed"
            >
              <p>
                We've seen it too many times: businesses invest thousands in beautiful websites that look great but generate zero leads. The problem isn't the design — it's the strategy.
              </p>
              <p>
                That's why we created Web2Sales. We're not just another web design agency. We're conversion specialists who understand that your website should be your hardest-working salesperson.
              </p>
              <p>
                Every website we touch is optimized for one thing: turning visitors into customers. Through strategic design, compelling copy, and data-driven optimization, we transform underperforming websites into 24×7 sales machines.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission-vision" className="py-20 lg:py-24 bg-white border-y border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="eyebrow justify-center">
              <Sparkles className="h-3.5 w-3.5" />
              What drives us
            </span>
            <h2 className="section-heading mt-3">Mission &amp; Vision</h2>
            <p className="section-copy mt-4 mx-auto">
              Two short statements that decide every line of code we write and every page we ship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55 }}
              className="group relative overflow-hidden rounded-3xl border-2 border-primary/15 bg-white p-8 md:p-10 ring-1 ring-primary/5 shadow-[0_24px_50px_-30px_rgba(98,85,164,0.3)]"
            >
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/8 blur-3xl transition-transform duration-500 group-hover:scale-125" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/30">
                  <Compass className="h-6 w-6" />
                </div>
                <span className="mt-5 block text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  Our mission
                </span>
                <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                  Make every Indian business website earn its keep.
                </h3>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  We exist to turn underperforming websites into measurable revenue engines. Sub-second loads, conversion-first design, SEO that actually ranks — for businesses that need their site to do the selling.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="group relative overflow-hidden rounded-3xl border-2 border-white/15 bg-gradient-to-br from-primary to-[#3d3175] p-8 md:p-10 text-white shadow-[0_28px_60px_-30px_rgba(98,85,164,0.55)]"
            >
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/15 blur-3xl transition-transform duration-500 group-hover:scale-125" />
              <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-accent/30 blur-3xl" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <span className="mt-5 block text-xs font-bold uppercase tracking-[0.22em] text-accent">
                  Our vision
                </span>
                <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                  A web where the best site for the job wins on merit.
                </h3>
                <p className="mt-4 text-white/85 leading-relaxed">
                  Not the loudest ad budget. Not the prettiest template. We're building toward a future where Indian SMBs compete and win on speed, clarity, and craft — and where the website is the single most valuable asset a business owns.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section id="why-choose-us" className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              Why choose us
            </span>
            <h2 className="section-heading mt-3">Four things that won't change.</h2>
            <p className="section-copy mt-4">
              The principles every project goes through, regardless of scope or budget.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50 p-7 card-hover"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{value.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow">Our expertise</span>
          <h2 className="section-heading mt-3">Experience you can measure.</h2>
          <p className="section-copy mt-5 mx-auto">
            Our team combines years of experience in web development, conversion optimization, and digital marketing. We've helped businesses across industries transform their online presence and achieve measurable growth.
          </p>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.2)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(15,23,42,0.3)]"
              >
                <p className="text-5xl font-bold text-primary tabular-nums">
                  <StatCounter to={item.value} suffix={item.suffix} />
                </p>
                <p className="mt-3 text-sm font-medium text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers — empty state, postings will appear here */}
      <section id="careers" className="py-20 lg:py-24 bg-white border-y border-slate-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="eyebrow justify-center">
              <Briefcase className="h-3.5 w-3.5" />
              Careers
            </span>
            <h2 className="section-heading mt-3">Join the team.</h2>
            <p className="section-copy mt-4 mx-auto">
              We're not actively hiring right now — but we like to know talented folks in advance.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-white via-primary/5 to-white p-12 md:p-16 text-center"
          >
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/8 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-[0_20px_40px_-20px_rgba(98,85,164,0.55)]"
              >
                <Briefcase className="h-9 w-9" />
              </motion.div>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wider ring-1 ring-amber-200">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <motion.span
                    animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full bg-amber-500"
                  />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                </span>
                No openings right now
              </span>

              <h3 className="mt-5 text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                Roles will be posted here when they open.
              </h3>
              <p className="mt-4 text-slate-600 leading-relaxed max-w-xl mx-auto">
                If you're a designer, developer, SEO writer, or growth marketer who wants to build
                websites that actually move numbers — drop us a note. We'll keep your portfolio on
                file for the moment we're hiring.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="mailto:nitin@gmdstech.com?subject=Future%20careers%20at%20Web2Sales"
                  className="btn-primary group"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Submit your portfolio
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link to="/contact" className="btn-secondary">
                  Or send a message
                </Link>
              </div>

              <p className="mt-8 text-xs text-slate-400">
                Watch this space — postings appear here the moment a role opens.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dark-section rounded-[2.5rem] px-8 py-16 sm:px-12 text-center">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Ready to transform your website?
              </h2>
              <p className="mt-5 text-lg text-slate-300 leading-relaxed">
                Let's work together to turn your website into a powerful lead-generating machine.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/services" className="btn-primary">
                  View our services <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link to="/contact" className="btn-ghost-light">
                  Get free consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
