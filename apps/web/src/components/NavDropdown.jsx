import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * Hover/click dropdown for nav. Opens on mouseenter, closes on mouseleave
 * (with a short delay so the cursor can travel to the panel) or on outside
 * click. Closes on route change.
 *
 * `items` shape:
 *   { icon, label, description?, to?, href?, soon?: boolean }[]
 */
const NavDropdown = ({ label, items, columns = 1, panelClassName = '' }) => {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const wrapperRef = useRef(null);
  const location = useLocation();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Click outside to close
  useEffect(() => {
    if (!open) return undefined;
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const isActive = items.some((it) => it.to && location.pathname === it.to);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`relative inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
          isActive ? 'text-primary' : 'text-slate-600 hover:text-primary'
        }`}
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`absolute left-1/2 top-full z-40 -translate-x-1/2 pt-3 ${panelClassName}`}
            role="menu"
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] ring-1 ring-primary/5">
              <div
                className={`p-3 grid gap-1 ${
                  columns === 2 ? 'sm:grid-cols-2 sm:w-[34rem]' : 'w-72'
                }`}
              >
                {items.map((item) => {
                  const Icon = item.icon;
                  const inner = (
                    <div className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-primary/5">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900">{item.label}</span>
                          {item.soon && (
                            <span className="inline-flex items-center rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-700 ring-1 ring-amber-200">
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
                    </div>
                  );
                  if (item.to) {
                    return (
                      <Link
                        key={item.label}
                        to={item.to}
                        role="menuitem"
                        className="group/item block"
                      >
                        {inner}
                      </Link>
                    );
                  }
                  return (
                    <a
                      key={item.label}
                      href={item.href || '#'}
                      role="menuitem"
                      className="group/item block"
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                    >
                      {inner}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavDropdown;
