import React from 'react';
import { FileText } from 'lucide-react';
import SEO from '@/components/SEO.jsx';

const sections = [
  {
    title: '1. Acceptance of Terms',
    body:
      'By accessing and using Web2Sales services provided by GMDS Technologies OPC Private Limited, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.'
  },
  {
    title: '2. Services Description',
    intro: 'GMDS Technologies provides the following services:',
    list: [
      'Website Sales & Performance Audit',
      'Lead-Generating Business Website Development',
      'Monthly SEO Blog Writing Services'
    ],
    footer:
      'Service specifications, timelines, and deliverables are as described in the service packages and confirmed in writing upon purchase.'
  },
  {
    title: '3. Payment Terms',
    list: [
      'All prices are in Indian Rupees (INR) and inclusive of applicable taxes',
      'Payment is required in full before service delivery begins',
      'We accept payments via Razorpay (credit card, debit card, UPI, net banking)',
      'All sales are final. Refunds are provided only as per our Refund Policy'
    ]
  },
  {
    title: '4. Service Delivery',
    intro: 'We commit to delivering services within the specified timelines. However, timelines may be extended if:',
    list: [
      'Client delays in providing required information or materials',
      'Scope changes are requested by the client',
      'Unforeseen technical challenges arise'
    ],
    footer: 'We will communicate any delays promptly and work to minimize impact.'
  },
  {
    title: '5. Client Responsibilities',
    intro: 'Clients are responsible for:',
    list: [
      'Providing accurate and complete information',
      'Timely feedback and approvals',
      'Providing necessary access to existing systems (if applicable)',
      'Ensuring content provided does not violate any laws or third-party rights'
    ]
  },
  {
    title: '6. Intellectual Property',
    body:
      'Upon full payment, clients receive ownership of deliverables created specifically for them. However, GMDS Technologies retains the right to use project work in portfolios and case studies (with client permission).'
  },
  {
    title: '7. Limitation of Liability',
    body:
      'GMDS Technologies shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific service.'
  },
  {
    title: '8. Termination',
    body:
      'Either party may terminate services with written notice. In case of termination, clients will be charged for work completed up to the termination date.'
  },
  {
    title: '9. Governing Law',
    body:
      'These terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.'
  },
  {
    title: '10. Contact Information',
    body: 'For questions about these Terms of Service, contact us at:',
    contact: true
  }
];

const TermsPage = () => {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms of Service for Web2Sales by GMDS Technologies — website development, maintenance, and SEO services in India."
        keywords="web2sales terms of service, gmds technologies terms"
        path="/terms"
      />

      <div className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15 mb-5">
              <FileText className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Terms of Service
            </h1>
            <p className="mt-4 text-slate-600">The agreement between you and GMDS Technologies.</p>
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
                  {section.footer && <p className="mt-3 leading-relaxed">{section.footer}</p>}
                  {section.contact && (
                    <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200/70 p-5 text-sm space-y-1">
                      <p className="font-semibold text-slate-900">
                        GMDS Technologies OPC Private Limited
                      </p>
                      <p>
                        <span className="font-semibold">Email:</span>{' '}
                        <a
                          href="mailto:contact@gmdstech.com"
                          className="text-primary hover:underline"
                        >
                          contact@gmdstech.com
                        </a>
                      </p>
                      <p>
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

export default TermsPage;
