import {
  ShoppingBag,
  Stethoscope,
  Building2,
  GraduationCap,
  Store,
  Rocket,
  BookOpen,
  Lightbulb,
  FileBarChart
} from 'lucide-react';

/**
 * Single source of truth for blog tracks (categories).
 *
 * A blog post's `track` field is either an empty string (general blog) or a
 * `${section}:${slug}` string like `industries:d2c` or `resources:seo-guides`.
 *
 * Sub-pages: /industries/:slug and /resources/:slug filter blogs by track.
 * Admin: dropdown options are derived from these arrays.
 *
 * To add a new industry or resource type:
 *   1. Add an entry below
 *   2. (optional) Add the path to apps/api/src/utils/site-routes.js so the
 *      sitemap picks it up
 * That's it — admin can immediately publish posts under it.
 */

export const INDUSTRY_TRACKS = [
  {
    slug: 'd2c',
    label: 'D2C Brands',
    icon: ShoppingBag,
    tagline: 'Stop renting customers from marketplaces',
    description:
      'Marketplace fees eat your margin and conversion on your own site is half what it should be. Posts here break down what we change to fix that — for skincare, food, fashion, and beyond.'
  },
  {
    slug: 'healthcare',
    label: 'Healthcare',
    icon: Stethoscope,
    tagline: 'Trust signals first, lead capture second',
    description:
      'Patients vet you in 8 seconds and most clinics lose appointments to whoever ranks first. The articles below cover credibility cues, schema markup for doctors, and appointment-flow design.'
  },
  {
    slug: 'real-estate',
    label: 'Real Estate',
    icon: Building2,
    tagline: 'Listings that convert, not just look',
    description:
      'Beautiful listings, dead enquiry forms — the most common pattern we see. Posts here cover image-heavy speed fixes, high-intent forms, and WhatsApp-first capture for property buyers.'
  },
  {
    slug: 'education',
    label: 'Education',
    icon: GraduationCap,
    tagline: 'Programs that fill, not just rank',
    description:
      'High traffic, low applications. The articles below cover enrolment-focused page design, counsellor-friendly forms, and outcome storytelling that convinces parents.'
  },
  {
    slug: 'local-businesses',
    label: 'Local Businesses',
    icon: Store,
    tagline: "Show up when 'near me' searches happen",
    description:
      "You're the best in town but invisible online. Posts here cover Google Business Profile, service-area schema, multi-location landing pages, and local SEO that works in tier-2 cities."
  },
  {
    slug: 'startups',
    label: 'Startups',
    icon: Rocket,
    tagline: 'Ship a credible launch site in days, not months',
    description:
      'Investor due diligence opens your site first. The articles below cover launch-ready site design, founder-led SEO, beta capture flows, and looking less like a template than every other startup.'
  }
];

export const RESOURCE_TRACKS = [
  {
    slug: 'seo-guides',
    label: 'SEO Guides',
    icon: BookOpen,
    tagline: 'Step-by-step playbooks',
    description:
      'In-depth guides on technical SEO, page speed, schema, local SEO, on-page work, and internal linking — written for people who ship, not just learn.'
  },
  {
    slug: 'optimisation-tips',
    label: 'Optimisation Tips',
    icon: Lightbulb,
    tagline: 'Quick fixes you can apply this afternoon',
    description:
      'Bite-sized performance and conversion tips — small enough to ship today, big enough to show up on your Lighthouse score tomorrow.'
  },
  {
    slug: 'case-studies',
    label: 'Case Studies',
    icon: FileBarChart,
    tagline: 'Real projects, real numbers',
    description:
      "Detailed write-ups of websites we've built and rebuilt — what we changed, what we measured, and where we got it wrong."
  }
];

const decorate = (track, section) => ({
  ...track,
  section,
  trackKey: `${section}:${track.slug}`,
  href: `/${section}/${track.slug}`
});

export const ALL_INDUSTRIES = INDUSTRY_TRACKS.map((t) => decorate(t, 'industries'));
export const ALL_RESOURCES = RESOURCE_TRACKS.map((t) => decorate(t, 'resources'));

/** Find a track by its full key (e.g. 'industries:d2c'). Returns null if unknown. */
export const findTrack = (key) => {
  if (!key || typeof key !== 'string') return null;
  return [...ALL_INDUSTRIES, ...ALL_RESOURCES].find((t) => t.trackKey === key) || null;
};

/** Resolve a section + slug pair to a decorated track (or null if not in the catalog). */
export const findTrackBySlug = (section, slug) => {
  if (section === 'industries') return ALL_INDUSTRIES.find((t) => t.slug === slug) || null;
  if (section === 'resources') return ALL_RESOURCES.find((t) => t.slug === slug) || null;
  return null;
};
