import React from 'react';
import { Cookie } from 'lucide-react';
import SEO from '@/components/SEO.jsx';

const sections = [
  {
    title: '1. What are cookies?',
    body:
      "Cookies are small text files that websites place on your device. They help sites remember information about your visit — things like your preferred language, your session, and which pages you've already seen. Most modern websites use them, ours included."
  },
  {
    title: '2. Cookies we use',
    intro:
      'We keep cookie usage minimal. The cookies you may encounter on Web2Sales fall into these categories:',
    list: [
      "Essential cookies — required for the site to function (e.g. session, admin authentication, form submissions). Without these, parts of the site won't work",
      "Performance cookies — help us understand which pages are popular, how visitors flow through the site, and where we should improve. Aggregated, no personal identification",
      "Functional cookies — remember non-essential preferences like dismissed banners or theme choices",
      "Third-party cookies — set by services we embed, such as Razorpay (payments) or Google Fonts. We don't control these directly"
    ]
  },
  {
    title: '3. What we do not use',
    intro: "We deliberately don't use cookies for:",
    list: [
      'Cross-site behavioural advertising',
      'Selling visitor data to third parties',
      'Building shadow profiles across the web',
      'Tracking you after you leave our site'
    ]
  },
  {
    title: '4. Third-party services',
    intro:
      'When you interact with embedded services on our site, those services may set their own cookies under their own privacy terms:',
    list: [
      'Razorpay — used to process payments at /checkout. See razorpay.com/privacy',
      'Google Fonts — serves the Jost typeface from Google CDN. See policies.google.com/privacy',
      'Hostinger CDN — serves brand logo assets',
      'WhatsApp wa.me — only opens when you click the WhatsApp button'
    ],
    footer:
      "We don't add Google Analytics, Meta Pixel, Hotjar, or similar tracking by default."
  },
  {
    title: '5. Managing cookies',
    intro:
      'You stay in control of cookies through your browser settings. Most browsers let you:',
    list: [
      'Block all cookies (note: this may break logins, payments, and some forms)',
      'Block third-party cookies only',
      'Delete cookies stored from previous visits',
      'Get a notification before any cookie is set'
    ],
    footer:
      "Each browser handles this differently — search for 'manage cookies in [your browser name]' for the exact steps."
  },
  {
    title: '6. Updates to this policy',
    body:
      "If we change how we use cookies (e.g. add an analytics tool), we'll update this page and revise the date below. Material changes will be highlighted on the home page or via a banner the next time you visit."
  },
  {
    title: '7. Contact us',
    body:
      "Questions about cookies, what we collect, or how to opt out of any of the above? We're happy to walk you through it.",
    contact: true
  }
];

const CookiePolicyPage = () => {
  return (
    <>
      <SEO
        title="Cookie Policy"
        description="How Web2Sales (GMDS Technologies) uses cookies — what we set, what we don't, third-party services, and how to manage cookies in your browser."
        keywords="web2sales cookie policy, gmds technologies cookies, website cookie policy india"
        path="/cookies"
      />

      <div className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15 mb-5">
              <Cookie className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Cookie Policy
            </h1>
            <p className="mt-4 text-slate-600">
              What we set, what we don't, and how to control them in your browser.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/70 bg-white p-8 md:p-12 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.2)]">
            <div className="space-y-10 text-slate-700">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                    {section.title}
                  </h2>
                  {section.intro && <p className="mb-3 leading-relaxed">{section.intro}</p>}
                  {section.body && <p className="leading-relaxed">{section.body}</p>}
                  {section.list && (
                    <ul className="mt-3 space-y-2 pl-5 list-disc marker:text-primary/60">
                      {section.list.map((item) => (
                        <li key={item} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.footer && (
                    <p className="mt-3 leading-relaxed text-slate-600 italic">
                      {section.footer}
                    </p>
                  )}
                  {section.contact && (
                    <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200/70 p-5 text-sm">
                      <p>
                        <span className="font-semibold">Email:</span>{' '}
                        <a
                          href="mailto:nitin@gmdstech.com"
                          className="text-primary hover:underline"
                        >
                          nitin@gmdstech.com
                        </a>
                      </p>
                      <p className="mt-1">
                        <span className="font-semibold">Phone:</span> +91 85951 13841
                      </p>
                    </div>
                  )}
                </section>
              ))}

              <p className="text-xs text-slate-500 pt-6 border-t border-slate-200">
                Last updated:{' '}
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicyPage;
