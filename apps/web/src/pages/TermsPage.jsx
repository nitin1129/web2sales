import React from 'react';
import { Helmet } from 'react-helmet';

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Web2Sales</title>
        <meta name="description" content="Terms of Service for Web2Sales by GMDS Technologies" />
      </Helmet>

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using Web2Sales services provided by GMDS Technologies OPC Private Limited, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Description</h2>
                <p className="mb-4">
                  GMDS Technologies provides the following services:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Website Sales & Performance Audit</li>
                  <li>Lead-Generating Business Website Development</li>
                  <li>Monthly SEO Blog Writing Services</li>
                </ul>
                <p className="mt-4">
                  Service specifications, timelines, and deliverables are as described in the service packages and confirmed in writing upon purchase.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Payment Terms</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All prices are in Indian Rupees (INR) and inclusive of applicable taxes</li>
                  <li>Payment is required in full before service delivery begins</li>
                  <li>We accept payments via Razorpay (credit card, debit card, UPI, net banking)</li>
                  <li>All sales are final. Refunds are provided only as per our Refund Policy</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Service Delivery</h2>
                <p className="mb-4">
                  We commit to delivering services within the specified timelines. However, timelines may be extended if:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Client delays in providing required information or materials</li>
                  <li>Scope changes are requested by the client</li>
                  <li>Unforeseen technical challenges arise</li>
                </ul>
                <p className="mt-4">
                  We will communicate any delays promptly and work to minimize impact.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Client Responsibilities</h2>
                <p className="mb-4">
                  Clients are responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Providing accurate and complete information</li>
                  <li>Timely feedback and approvals</li>
                  <li>Providing necessary access to existing systems (if applicable)</li>
                  <li>Ensuring content provided does not violate any laws or third-party rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
                <p>
                  Upon full payment, clients receive ownership of deliverables created specifically for them. However, GMDS Technologies retains the right to use project work in portfolios and case studies (with client permission).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
                <p>
                  GMDS Technologies shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
                <p>
                  Either party may terminate services with written notice. In case of termination, clients will be charged for work completed up to the termination date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
                <p>
                  These terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in [Your City], India.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
                <p>
                  For questions about these Terms of Service, contact us at:
                </p>
                <p className="mt-4">
                  <strong>GMDS Technologies OPC Private Limited</strong><br />
                  <strong>Email:</strong> contact@gmdstech.com<br />
                  <strong>Phone:</strong> +91 98765 43210
                </p>
              </section>

              <section>
                <p className="text-sm text-gray-600 mt-8">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;