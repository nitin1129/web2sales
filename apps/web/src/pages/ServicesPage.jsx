import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const ServicesPage = () => {
  const { services } = useAuth();

  const serviceDetails = [
    {
      ...services.audit,
      ctaText: 'Buy Now',
      ctaLink: '/checkout/audit'
    },
    {
      ...services.website,
      ctaText: 'Buy Now',
      ctaLink: '/checkout/website'
    },
    {
      ...services.seo,
      ctaText: 'Subscribe Now',
      ctaLink: '/checkout/seo'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Services - Website Optimization & Lead Generation | Web2Sales</title>
        <meta
          name="description"
          content="Professional website audit, lead-generating website development, and monthly SEO blog writing services. Transform your website into a sales machine."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#6255A4] to-[#9489CC] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Choose the perfect solution to transform your website into a lead-generating sales machine
          </p>
        </div>
      </section>

      {/* Services Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {serviceDetails.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#6255A4] to-[#7B6FB8] p-8 text-white">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{service.name}</h2>
                      <p className="text-lg opacity-90">{service.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-4xl font-bold">₹{service.total.toLocaleString()}</p>
                      <p className="text-sm opacity-80">
                        (Base: ₹{service.price.toLocaleString()} + GST: ₹{service.gst.toLocaleString()})
                      </p>
                      <p className="text-lg mt-2">{service.timeline}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* What's Included */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                        What's Included
                      </h3>
                      <ul className="space-y-3">
                        {service.includes.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What's NOT Included */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <XCircle className="h-6 w-6 text-red-500 mr-2" />
                        What's NOT Included
                      </h3>
                      <ul className="space-y-3">
                        {service.excludes.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Link to={service.ctaLink}>
                      <Button
                        size="lg"
                        className="bg-[#6255A4] hover:bg-[#6255A4]/90 text-white font-bold text-lg px-12 py-6"
                      >
                        {service.ctaText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#6255A4] text-white">
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-center">Audit</th>
                  <th className="p-4 text-center">Website</th>
                  <th className="p-4 text-center">SEO Blogs</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Price</td>
                  <td className="p-4 text-center">₹2,360</td>
                  <td className="p-4 text-center">₹14,160</td>
                  <td className="p-4 text-center">₹5,900/mo</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-semibold">Timeline</td>
                  <td className="p-4 text-center">5 days</td>
                  <td className="p-4 text-center">10 days</td>
                  <td className="p-4 text-center">Monthly</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Best For</td>
                  <td className="p-4 text-center">Existing websites</td>
                  <td className="p-4 text-center">New/redesign projects</td>
                  <td className="p-4 text-center">Ongoing SEO growth</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#D9CCE5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Not Sure Which Service You Need?</h2>
          <p className="text-xl text-gray-700 mb-8">
            Contact us for a free consultation and we'll recommend the best solution for your business.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-[#6255A4] hover:bg-[#6255A4]/90 text-white font-bold text-lg px-8 py-6"
            >
              Get Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;