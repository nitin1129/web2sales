import React from 'react';
import { ShieldCheck } from 'lucide-react';
import SEO from '@/components/SEO.jsx';

const sections = [
  {
    title: '1. Information We Collect',
    intro: 'We collect information you provide directly to us when you:',
    list: [
      'Fill out contact forms on our website',
      'Purchase our services',
      'Subscribe to our newsletter or blog',
      'Communicate with us via email or phone'
    ]
  },
  {
    title: '2. How We Use Your Information',
    intro: 'We use the information we collect to:',
    list: [
      'Provide, maintain, and improve our services',
      'Process your transactions and send related information',
      'Send you technical notices and support messages',
      'Respond to your comments and questions',
      'Send you marketing communications (with your consent)'
    ]
  },
  {
    title: '3. Information Sharing',
    intro:
      'We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:',
    list: [
      'With your consent',
      'To comply with legal obligations',
      'To protect our rights and prevent fraud',
      'With service providers who assist in our operations (under strict confidentiality agreements)'
    ]
  },
  {
    title: '4. Data Security',
    body: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
  },
  {
    title: '5. Your Rights',
    intro: 'You have the right to:',
    list: [
      'Access your personal information',
      'Correct inaccurate data',
      'Request deletion of your data',
      'Opt-out of marketing communications',
      'Withdraw consent at any time'
    ]
  },
  {
    title: '6. Cookies',
    body: 'We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.'
  },
  {
    title: '7. Contact Us',
    body: 'If you have any questions about this Privacy Policy, please contact us at:',
    contact: true
  }
];

const PrivacyPage = () => {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="How Web2Sales (GMDS Technologies) collects, uses, and protects your information."
        keywords="web2sales privacy policy, gmds technologies privacy"
        path="/privacy"
      />

      <div className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15 mb-5">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Privacy Policy
            </h1>
            <p className="mt-4 text-slate-600">
              How we collect, use, and safeguard your information.
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
                  {section.contact && (
                    <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200/70 p-5 text-sm">
                      <p>
                        <span className="font-semibold">Email:</span>{' '}
                        <a
                          href="mailto:contact@gmdstech.com"
                          className="text-primary hover:underline"
                        >
                          contact@gmdstech.com
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

export default PrivacyPage;
