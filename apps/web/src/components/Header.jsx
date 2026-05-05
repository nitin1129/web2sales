import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ArrowUpRight,
  CalendarClock,
  ChevronDown,
  ShoppingBag,
  Stethoscope,
  Building2,
  GraduationCap,
  Store,
  Rocket,
  Newspaper,
  BookOpen,
  Lightbulb,
  FileBarChart,
  Video,
  Mic
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BirdLogo from './BirdLogo.jsx';
import NavDropdown from './NavDropdown.jsx';

const simpleLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Process', path: '/process' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

const industriesItems = [
  { icon: ShoppingBag, label: 'D2C Brands', description: 'Stop renting customers from marketplaces.', to: '/industries/d2c' },
  { icon: Stethoscope, label: 'Healthcare', description: 'Trust signals first, leads second.', to: '/industries/healthcare' },
  { icon: Building2, label: 'Real Estate', description: 'Listings that convert, not just look pretty.', to: '/industries/real-estate' },
  { icon: GraduationCap, label: 'Education', description: 'Programs that fill, not just rank.', to: '/industries/education' },
  { icon: Store, label: 'Local Businesses', description: 'Show up for "near me" searches.', to: '/industries/local-businesses' },
  { icon: Rocket, label: 'Startups', description: 'Credible launch sites in 2-3 weeks.', to: '/industries/startups' }
];

const resourcesItems = [
  { icon: Newspaper, label: 'Blog', description: 'Playbooks, teardowns, case studies.', to: '/blogs' },
  { icon: BookOpen, label: 'SEO Guides', description: 'Step-by-step technical + on-page.', to: '/resources/seo-guides' },
  { icon: Lightbulb, label: 'Optimisation Tips', description: 'Quick fixes you can apply today.', to: '/resources/optimisation-tips' },
  { icon: FileBarChart, label: 'Case Studies', description: 'Real projects, real numbers.', to: '/resources/case-studies' },
  { icon: Video, label: 'Videos', description: 'Audit + design walkthroughs.', to: '/videos' },
  { icon: Mic, label: 'Webinars', description: 'Live sessions with Q&A.', to: '/webinars' }
];

const mobileGroups = [
  { name: 'Industries', basePath: '/industries', icon: ShoppingBag, items: industriesItems },
  { name: 'Resources', basePath: '/resources', icon: Newspaper, items: resourcesItems }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenMobileGroup(null);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_6px_24px_-18px_rgba(15,23,42,0.35)]'
          : 'bg-white/70 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <BirdLogo className="h-11 w-auto transition-transform duration-300 group-hover:scale-105" />
            <span className="hidden sm:inline-block text-lg font-semibold tracking-tight text-slate-900">
              GMDS Technologies
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {simpleLinks.slice(0, 3).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive(link.path) ? 'text-primary' : 'text-slate-600 hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            <NavDropdown label="Industries" items={industriesItems} columns={2} />
            <NavDropdown label="Resources" items={resourcesItems} columns={2} />

            {simpleLinks.slice(3).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive(link.path) ? 'text-primary' : 'text-slate-600 hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <Link
              to="/contact?action=schedule"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              <CalendarClock className="h-4 w-4" />
              <span className="hidden xl:inline">Schedule meeting</span>
              <span className="xl:hidden">Schedule</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-primary/40"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/80 max-h-[80vh] overflow-y-auto"
          >
            <nav className="px-4 py-4 space-y-1.5">
              {simpleLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block rounded-2xl px-4 py-3 text-base font-medium transition ${
                    isActive(link.path)
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {mobileGroups.map((group) => {
                const isOpen = openMobileGroup === group.name;
                return (
                  <div key={group.name} className="rounded-2xl border border-slate-200/70 bg-white/60 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenMobileGroup(isOpen ? null : group.name)}
                      className={`flex w-full items-center justify-between px-4 py-3 text-base font-medium transition ${
                        isOpen ? 'text-primary bg-primary/5' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                      aria-expanded={isOpen}
                    >
                      <span>{group.name}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.18 }}
                          className="border-t border-slate-200/70"
                        >
                          <ul className="p-2 space-y-1">
                            {group.items.map((item) => {
                              const Icon = item.icon;
                              return (
                                <li key={item.label}>
                                  <Link
                                    to={item.to || group.basePath}
                                    className="flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-primary/5 hover:text-primary transition-colors"
                                  >
                                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                      <Icon className="h-4 w-4" />
                                    </span>
                                    <span className="flex-1 min-w-0">
                                      <span className="flex items-center gap-1.5">
                                        <span className="font-semibold">{item.label}</span>
                                        {item.soon && (
                                          <span className="inline-flex items-center rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-700">
                                            Soon
                                          </span>
                                        )}
                                      </span>
                                      {item.description && (
                                        <span className="mt-0.5 block text-xs text-slate-500 leading-snug">
                                          {item.description}
                                        </span>
                                      )}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {simpleLinks.slice(3).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block rounded-2xl px-4 py-3 text-base font-medium transition ${
                    isActive(link.path)
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/contact?action=schedule"
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
              >
                <CalendarClock className="h-4 w-4" />
                Schedule meeting
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
