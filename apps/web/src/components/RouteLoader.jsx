import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import BirdLogo from './BirdLogo.jsx';

/**
 * Brief overlay shown on every client-side route change. Triggers when the
 * location pathname changes, fades in for ~300ms, hides automatically.
 * Complements AppLoader which only fires on initial full page load.
 */
const RouteLoader = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    // Skip the very first render — AppLoader covers initial load.
    if (firstRender) {
      setFirstRender(false);
      return undefined;
    }

    setVisible(true);
    const t = setTimeout(() => setVisible(false), 650);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Top progress bar */}
          <motion.div
            key="bar"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            className="fixed inset-x-0 top-0 z-[9998] h-[3px] bg-gradient-to-r from-primary via-primary/80 to-accent"
          />

          {/* Soft vignette + bird pulse */}
          <motion.div
            key="veil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[9997] flex items-center justify-center"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(243,237,250,0.85) 0%, rgba(217,204,229,0.55) 60%, rgba(217,204,229,0) 100%)',
              backdropFilter: 'blur(2px)'
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <BirdLogo className="h-14 w-14 object-contain animate-pulse drop-shadow-[0_8px_20px_rgba(98,85,164,0.35)]" />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RouteLoader;
