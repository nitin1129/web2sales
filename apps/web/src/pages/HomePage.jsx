import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const HomePage = () => {
  const { services } = useAuth();

  const painPoints = [
    {
      icon: <TrendingUp className="h-8 w-8 text-red-500" />,
      title: 'Low Conversion Rates',
      description: 'Your website gets traffic, but visitors leave without taking action. No inquiries, no sales.'
    },
    {
      icon: <Users className="h-8 w-8 text-red-500" />,
      title: 'Poor User Experience',
      description: 'Confusing navigation, slow loading times, and unclear messaging drive potential customers away.'
    },
    {
      icon: <Target className="h-8 w-8 text-red-500" />,
      title: 'No Clear Call-to-Action',
      description: 'Visitors don\'t know what to do next. Your website lacks strategic CTAs that guide them to convert.'
    },
    {
      icon: <Zap className="h-8 w-8 text-red-500" />,
      title: 'Missing Lead Capture',
      description: 'You have no system to capture visitor information, losing potential customers forever.'
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-red-500" />,
      title: 'Zero SEO Visibility',
      description: 'Your website is invisible on Google. No organic traffic means no free leads or sales.'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Audit & Strategy',
      description: 'We analyze your current website performance, identify conversion blockers, and create a strategic roadmap for improvement.'
    },
    {
      step: '02',
      title: 'Optimize & Build',
      description: 'We redesign your website with conversion-focused elements, lead capture forms, and SEO optimization to attract and convert visitors.'
    },
    {
      step: '03',
      title: 'Drive Traffic & Convert',
      description: 'Through strategic SEO content and ongoing optimization, we drive qualified traffic that converts into paying customers.'
    }
  ];

  const serviceCards = [
    {
      ...services.audit,
      icon: <TrendingUp className="h-12 w-12 text-[#6255A4]" />,
      benefit: 'Discover exactly why your website isn\'t converting'
    },
    {
      ...services.website,
      icon: <Target className="h-12 w-12 text-[#6255A4]" />,
      benefit: 'Get a professional website that generates leads 24/7'
    },
    {
      ...services.seo,
      icon: <Zap className="h-12 w-12 text-[#6255A4]" />,
      benefit: 'Rank on Google and attract organic traffic consistently'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Web2Sales - Turn Your Website Into a 24×7 Sales Machine | GMDS Technologies</title>
        <meta
          name="description"
          content="Stop losing customers to poorly designed websites. Web2Sales transforms your business website into a lead-generating sales machine with proven conversion strategies."
        />
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6255A4] via-[#7B6FB8] to-[#9489CC] text-white"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(98, 85, 164, 0.95) 0%, rgba(123, 111, 184, 0.9) 50%, rgba(148, 137, 204, 0.85) 100%)',
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            We turn business websites into 24×7 sales machines
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100"
          >
            Your website should be your best salesperson. But if it's not generating leads or sales, you're losing money every single day.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/services">
              <Button
                size="lg"
                className="bg-white text-[#6255A4] hover:bg-gray-100 font-bold text-lg px-8 py-6 rounded-full shadow-2xl"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Most Websites Don't Generate Business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These critical mistakes are costing you customers and revenue every day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{point.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Web2Sales Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven 3-step system transforms your website into a lead-generating machine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative bg-gradient-to-br from-[#D9CCE5] to-[#E8E0F0] p-8 rounded-xl shadow-lg"
              >
                <div className="absolute -top-6 left-8 bg-[#6255A4] text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                  {step.step}
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the solution that fits your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceCards.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-3xl font-bold text-[#6255A4] mb-2">₹{service.total.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mb-4">{service.timeline}</p>
                <p className="text-gray-600 mb-6">{service.benefit}</p>
                <Link to={`/checkout/${service.id}`}>
                  <Button className="w-full bg-[#6255A4] hover:bg-[#6255A4]/90 text-white font-semibold">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-[#6255A4] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Trusted by Growing Businesses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-5xl font-bold mb-2">100+</p>
              <p className="text-xl">Websites Optimized</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">3x</p>
              <p className="text-xl">Average Conversion Increase</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">24/7</p>
              <p className="text-xl">Lead Generation</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;