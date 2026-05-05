import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Sparkles, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import SEO, { SITE_URL } from '@/components/SEO.jsx';
import Starfield from '@/components/Starfield.jsx';
import { WHATSAPP_URL } from '@/components/WhatsAppButton.jsx';

const ContactPage = () => {
  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: 'nitin@gmdstech.com',
      href: 'mailto:nitin@gmdstech.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 85951 13841',
      href: 'tel:+918595113841'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+91 85951 13841',
      href: WHATSAPP_URL,
      external: true
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'GMDS Technologies OPC Private Limited, India',
      href: null
    }
  ];

  return (
    <>
      <SEO
        title="Contact Web2Sales — Hire India's Best Website Developer & Maintenance Team"
        description="Talk to Web2Sales about building or maintaining your business website. Free 20-minute consultation with India's best website developer and website management agency."
        keywords="contact web2sales, hire website developer india, website maintenance agency india, book web development consultation, gmds technologies contact"
        path="/contact"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          url: `${SITE_URL}/contact`,
          name: 'Contact Web2Sales',
          description:
            'Get in touch with Web2Sales (GMDS Technologies) for website development and maintenance services in India.',
          publisher: {
            '@type': 'Organization',
            name: 'Web2Sales',
            email: 'nitin@gmdstech.com',
            telephone: '+91-85951-13841',
            url: SITE_URL
          }
        }}
      />

      {/* Hero Section */}
      <section className="page-hero relative">
        <Starfield />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Get in touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]"
          >
            Let's turn your website into a <span className="text-gradient">sales machine</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Have a question or a project in mind? Reach out — we'll respond within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Contact info + form */}
      <section id="contact-form" className="py-20 lg:py-24 -mt-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-10">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-slate-200/70 bg-white p-8 md:p-10 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.25)]"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Contact information</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Prefer to reach out directly? Here's how to find us.
              </p>

              <div className="mt-8 space-y-5">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-start gap-4 rounded-2xl p-4 transition-colors group-hover:bg-slate-50">
                      <div className="flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-base font-medium text-slate-900 break-all">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="group block"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.label} className="group">
                      {content}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6">
                <div className="flex items-center gap-2 text-slate-900">
                  <Clock className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Business hours</h3>
                </div>
                <div className="mt-3 space-y-1 text-sm text-slate-700">
                  <p>Monday – Friday · 9:00 AM – 6:00 PM IST</p>
                  <p className="text-slate-500">Saturday – Sunday · Closed</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl border border-slate-200/70 bg-white p-8 md:p-10 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.25)]"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Send us a message</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
