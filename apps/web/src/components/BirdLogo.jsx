import React from 'react';

/**
 * Real GMDS brand bird — served as an <img>, not a drawn SVG.
 *
 * Priority:
 *   1. If /bird.png (or /bird.svg) exists in apps/web/public/, use that.
 *   2. Otherwise fall back to the Hostinger-hosted brand asset.
 *
 * To self-host the logo: save the file to apps/web/public/bird.png and it
 * will be picked up automatically (no code change needed).
 */
const FALLBACK_SRC =
  'https://horizons-cdn.hostinger.com/41f08a37-28d2-45b3-a758-ebd6cdef8c1e/1379502dbc027119db4b230911e57743.png';

const LOCAL_SRC = '/bird.png';

const BirdLogo = ({
  className = 'h-12 w-12',
  title = 'GMDS Technologies',
  src,
  draggable = false
}) => {
  const [failed, setFailed] = React.useState(false);
  const resolvedSrc = src || (failed ? FALLBACK_SRC : LOCAL_SRC);

  return (
    <img
      src={resolvedSrc}
      alt={title}
      className={className}
      draggable={draggable}
      onError={() => {
        if (!failed) setFailed(true);
      }}
    />
  );
};

export default BirdLogo;
