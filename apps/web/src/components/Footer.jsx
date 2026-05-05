import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, CalendarClock, Instagram, Linkedin } from 'lucide-react';
import BirdLogo from './BirdLogo.jsx';

const socials = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/company/gmdstechnologies'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://www.instagram.com/web2sales.in'
  }
];

// Top-level pages — flat single-link items (Industries / Resources get their
// own grouped columns below since they each have many sub-pages).
const siteLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Process', path: '/process' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

// Each industry has its own posts feed at /industries/:slug.
const industriesLinks = [
  { name: 'D2C Brands', path: '/industries/d2c' },
  { name: 'Healthcare', path: '/industries/healthcare' },
  { name: 'Real Estate', path: '/industries/real-estate' },
  { name: 'Education', path: '/industries/education' },
  { name: 'Local Businesses', path: '/industries/local-businesses' },
  { name: 'Startups', path: '/industries/startups' }
];

const resourcesLinks = [
  { name: 'Blog', path: '/blogs' },
  { name: 'SEO Guides', path: '/resources/seo-guides' },
  { name: 'Optimisation Tips', path: '/resources/optimisation-tips' },
  { name: 'Case Studies', path: '/resources/case-studies' },
  { name: 'Videos', path: '/videos' },
  { name: 'Webinars', path: '/webinars' }
];

const legalLinks = [
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Terms of Service', path: '/terms' },
  { name: 'Refund Policy', path: '/refund-policy' },
  { name: 'Cookie Policy', path: '/cookies' }
];

const LinkColumn = ({ title, items }) => (
  <div className="space-y-4">
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
      {title}
    </p>
    <ul className="space-y-2.5">
      {items.map((link) => (
        <li key={link.path}>
          <Link
            to={link.path}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#150e2e] text-slate-200">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute -top-40 -left-20 h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute -bottom-40 -right-20 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top: brand on left, link columns on right */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] items-start">
          {/* Brand column — kept tight so it doesn't tower over the link columns */}
          <div className="space-y-4 max-w-sm md:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="group inline-flex items-center gap-3"
              aria-label="GMDS Technologies — back to home"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 ring-1 ring-white/20 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
                <BirdLogo className="h-7 w-auto" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-base font-semibold tracking-tight text-white">
                  GMDS Technologies
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Web2Sales
                </span>
              </span>
            </Link>

            <p className="text-lg font-semibold text-white leading-snug">
              We build websites that{' '}
              <span className="text-accent">rank</span> and{' '}
              <span className="text-accent">convert</span>.
            </p>

            <div className="space-y-2 pt-1">
              <a
                href="mailto:contact@gmdstech.com"
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5 flex-shrink-0 text-accent" />
                <span className="break-all">contact@gmdstech.com</span>
              </a>
              <a
                href="tel:+918595113841"
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5 flex-shrink-0 text-accent" />
                +91 85951 13841
              </a>
              <Link
                to="/contact?action=schedule"
                className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-white transition-colors"
              >
                <CalendarClock className="h-3.5 w-3.5 flex-shrink-0" />
                Schedule a meeting
              </Link>
            </div>

            <div className="flex items-center gap-2 pt-1">
              {socials.map(({ name, icon: Icon, href }) => {
                const isPlaceholder = href === '#';
                return (
                  <a
                    key={name}
                    href={href}
                    target={isPlaceholder ? undefined : '_blank'}
                    rel={isPlaceholder ? undefined : 'noopener noreferrer'}
                    aria-label={name}
                    title={isPlaceholder ? `${name} — link coming soon` : name}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
                      isPlaceholder
                        ? 'border-white/10 bg-white/5 text-slate-500 cursor-not-allowed'
                        : 'border-white/15 bg-white/5 text-slate-300 hover:border-accent/40 hover:bg-accent/10 hover:text-white hover:-translate-y-0.5'
                    }`}
                    onClick={isPlaceholder ? (e) => e.preventDefault() : undefined}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns — Site, Industries, Resources, Legal */}
          <LinkColumn title="Site" items={siteLinks} />
          <LinkColumn title="Industries" items={industriesLinks} />
          <LinkColumn title="Resources" items={resourcesLinks} />
          <LinkColumn title="Legal" items={legalLinks} />
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-xs text-slate-500 flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <p>
            © {new Date().getFullYear()} GMDS Technologies OPC Private Limited. All rights reserved.
          </p>
          <p>All prices are inclusive of applicable taxes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
