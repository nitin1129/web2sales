import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Users, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  const values = [
    {
      icon: <Target className="h-12 w-12 text-[#6255A4]" />,
      title: 'Results-Driven',
      description: 'We focus on measurable outcomes that directly impact your bottom line.'
    },
    {
      icon: <Users className="h-12 w-12 text-[#6255A4]" />,
      title: 'Client-Centric',
      description: 'Your success is our success. We work as an extension of your team.'
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-[#6255A4]" />,
      title: 'Data-Backed',
      description: 'Every recommendation is based on analytics and proven conversion strategies.'
    },
    {
      icon: <Award className="h-12 w-12 text-[#6255A4]" />,
      title: 'Quality First',
      description: 'We deliver premium solutions that stand the test of time.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - GMDS Technologies | Web2Sales</title>
        <meta
          name="description"
          content="Learn about GMDS Technologies and our mission to help businesses transform their websites into powerful lead-generating sales machines."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#6255A4] to-[#9489CC] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About GMDS Technologies</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            We're on a mission to help businesses unlock the true potential of their websites
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                We've seen it too many times: businesses invest thousands in beautiful websites that look great but generate zero leads. The problem isn't the design—it's the strategy.
              </p>
              <p>
                That's why we created Web2Sales. We're not just another web design agency. We're conversion specialists who understand that your website should be your hardest-working salesperson.
              </p>
              <p>
                Every website we touch is optimized for one thing: turning visitors into customers. Through strategic design, compelling copy, and data-driven optimization, we transform underperforming websites into 24×7 sales machines.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why We Built Web2Sales</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe every business deserves a website that actually generates revenue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Credibility Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Expertise</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Our team combines years of experience in web development, conversion optimization, and digital marketing. We've helped businesses across industries transform their online presence and achieve measurable growth.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-[#D9CCE5] p-6 rounded-lg">
              <p className="text-4xl font-bold text-[#6255A4] mb-2">100+</p>
              <p className="text-gray-700">Websites Optimized</p>
            </div>
            <div className="bg-[#D9CCE5] p-6 rounded-lg">
              <p className="text-4xl font-bold text-[#6255A4] mb-2">3x</p>
              <p className="text-gray-700">Average Conversion Increase</p>
            </div>
            <div className="bg-[#D9CCE5] p-6 rounded-lg">
              <p className="text-4xl font-bold text-[#6255A4] mb-2">95%</p>
              <p className="text-gray-700">Client Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#6255A4] to-[#7B6FB8] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Website?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's work together to turn your website into a powerful lead-generating machine
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services">
              <Button size="lg" className="bg-white text-[#6255A4] hover:bg-gray-100 font-bold">
                View Our Services
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#6255A4] font-bold"
              >
                Get Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;