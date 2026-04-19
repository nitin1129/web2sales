import React from 'react';
import { Helmet } from 'react-helmet';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Get in Touch | Web2Sales</title>
        <meta
          name="description"
          content="Have questions about our services? Contact GMDS Technologies for a free consultation on website optimization and lead generation."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#6255A4] to-[#9489CC] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Have questions? We're here to help transform your website into a sales machine.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-[#6255A4] mr-4 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a
                      href="mailto:nitin@gmdstech.com"
                      className="text-gray-600 hover:text-[#6255A4] transition-colors"
                    >
                      contanitinct@gmdstech.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-[#6255A4] mr-4 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <a
                      href="tel:+918595113841"
                      className="text-gray-600 hover:text-[#6255A4] transition-colors"
                    >
                      +91 8595113841
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-[#6255A4] mr-4 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">
                      GMDS Technologies OPC Private Limited<br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-[#D9CCE5] rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Business Hours</h3>
                <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                <p className="text-gray-700">Saturday - Sunday: Closed</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;