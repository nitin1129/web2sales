import React from 'react';
import { RefreshCcw } from 'lucide-react';
import SEO from '@/components/SEO.jsx';

const sections = [
  {
    title: '1. All sales are final',
    body:
      'All purchases made through Web2Sales (GMDS Technologies OPC Private Limited) are final. We do not offer refunds on completed services, completed audits, or delivered website projects.'
  },
  {
    title: '2. Why we operate as no-refund',
    intro: "Our pricing is built around fixed-scope, fixed-price work that we deliver in compressed timelines. Specifically:",
    list: [
      "Audits begin the moment we receive your access details — work cannot be returned",
      "Website builds reserve developer + designer time on your start date",
      "SEO and content subscriptions begin work the day they are billed",
      "Engineering hours, once booked, cannot be re-sold to another client"
    ]
  },
  {
    title: '3. What we will do instead',
    intro:
      "Refunds are not available, but we are committed to making sure you get value. If you are unhappy with the deliverable, we will:",
    list: [
      'Re-do or revise the deliverable until it meets the agreed scope',
      'Extend the engagement at no extra cost if we miss our committed timeline',
      'Provide additional rounds of revisions where reasonably warranted',
      'Pause monthly subscriptions for up to 30 days, on request'
    ],
    footer:
      "We have never had a client leave dissatisfied — and that's because we don't ship until you're happy."
  },
  {
    title: '4. Cancellation of subscriptions',
    intro:
      'Monthly subscription services (SEO content, website maintenance) can be cancelled at any time:',
    list: [
      'Cancellations are effective at the end of the current billing cycle',
      'Already-paid months will be served out in full',
      'No prorated refunds are issued for cancelled subscriptions',
      'You retain rights to all deliverables produced during the paid period'
    ]
  },
  {
    title: '5. Failed or duplicate payments',
    body:
      "If you are charged twice for the same purchase, or charged for a service we did not deliver, contact us within 7 days. We will refund the duplicate or undelivered charge directly via the original payment method, typically within 5 business days."
  },
  {
    title: '6. Disputes',
    body:
      'We aim to resolve disagreements directly and in good faith. If we cannot, the matter will be governed by the laws of India and subject to the jurisdiction of the courts in our registered location.'
  },
  {
    title: '7. Contact us',
    body:
      'Questions about this policy or a billing issue? Reach out before disputing a charge — we resolve almost everything in a single email.',
    contact: true
  }
];

const RefundPolicyPage = () => {
  return (
    <>
      <SEO
        title="Refund Policy"
        description="Refund Policy for Web2Sales by GMDS Technologies — fixed-price services with no-refund terms, alternative remedies, and subscription cancellation rules."
        keywords="web2sales refund policy, gmds technologies refund, no refund policy, website service refunds india"
        path="/refund-policy"
      />

      <div className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15 mb-5">
              <RefreshCcw className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Refund Policy
            </h1>
            <p className="mt-4 text-slate-600">
              All sales are final — and here's exactly why, plus what we'll do if something goes wrong.
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

export default RefundPolicyPage;
