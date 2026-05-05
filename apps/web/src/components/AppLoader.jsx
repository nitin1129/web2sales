import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BirdLogo from './BirdLogo.jsx';

const MIN_MS = 1400;
const MAX_MS = 2600;

const AppLoader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return undefined;

    const startedAt = Date.now();
    const dismiss = () => {
      const elapsed = Date.now() - startedAt;
      const wait = Math.max(0, MIN_MS - elapsed);
      setTimeout(() => setVisible(false), wait);
    };

    const onLoad = () => dismiss();

    if (document.readyState === 'complete') {
      dismiss();
    } else {
      window.addEventListener('load', onLoad, { once: true });
    }

    const hardCap = setTimeout(() => setVisible(false), MAX_MS);

    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(hardCap);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          aria-hidden={!visible}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse at 50% 35%, #f3edfa 0%, #e8defc 45%, #d9cce5 100%)'
          }}
        >
          {/* soft concentric rings */}
          <motion.span
            aria-hidden="true"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.8], opacity: [0.35, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            className="absolute h-80 w-80 rounded-full border border-primary/30"
          />
          <motion.span
            aria-hidden="true"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.8], opacity: [0.25, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
            className="absolute h-80 w-80 rounded-full border border-primary/25"
          />

          <div className="relative flex flex-col items-center">
            {/* Halo glow behind the bird */}
            <motion.span
              aria-hidden="true"
              initial={{ scale: 0.9, opacity: 0.4 }}
              animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-10 rounded-full bg-primary/25 blur-2xl"
            />

            {/* Bird with gentle bob + tiny scale pulse */}
            <motion.div
              initial={{ scale: 0.85, y: 10, opacity: 0 }}
              animate={{
                scale: [1, 1.04, 1],
                y: [0, -6, 0],
                opacity: 1
              }}
              transition={{
                scale: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
                y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 0.4 }
              }}
              className="relative"
            >
              <BirdLogo className="h-28 w-28 object-contain drop-shadow-[0_14px_30px_rgba(98,85,164,0.45)]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex flex-col items-center gap-2"
            >
              <p className="text-2xl font-bold tracking-tight text-slate-900">
                <span className="text-primary">GMDS</span> Technologies
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary/70">
                Web2Sales
              </p>
            </motion.div>

            {/* progress line */}
            <div className="relative mt-6 h-[3px] w-40 overflow-hidden rounded-full bg-primary/15">
              <motion.span
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppLoader;
