import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [paymentStatus, setPaymentStatus] = useState(null); // 'pending', 'success', 'failed'
  const [currentService, setCurrentService] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Service definitions
  const services = {
    audit: {
      id: 'audit',
      name: 'Website Sales & Performance Audit',
      price: 2000,
      gst: 360,
      total: 2360,
      timeline: '5 days',
      description: 'Comprehensive analysis of your website\'s sales performance',
      includes: [
        'Detailed conversion funnel analysis',
        'User behavior tracking review',
        'Sales page optimization recommendations',
        'Competitor comparison report',
        'Actionable improvement roadmap'
      ],
      excludes: [
        'Website redesign or development',
        'Content writing',
        'Ongoing support after delivery'
      ]
    },
    website: {
      id: 'website',
      name: 'Lead-Generating Business Website',
      price: 12000,
      gst: 2160,
      total: 14160,
      timeline: '10 days',
      description: 'Professional website designed to convert visitors into leads',
      includes: [
        'Custom responsive design (5-7 pages)',
        'Lead capture forms with email integration',
        'SEO-optimized structure',
        'Mobile-first approach',
        'Contact form with auto-responder',
        '30 days post-launch support'
      ],
      excludes: [
        'E-commerce functionality',
        'Custom web applications',
        'Ongoing maintenance after 30 days',
        'Content writing (client provides content)'
      ]
    },
    seo: {
      id: 'seo',
      name: 'Monthly SEO Blog Writing',
      price: 5000,
      gst: 900,
      total: 5900,
      timeline: 'Monthly subscription',
      description: '4 SEO-optimized blog posts per month to drive organic traffic',
      includes: [
        '4 blog posts per month (800-1200 words each)',
        'Keyword research and optimization',
        'Meta descriptions and title tags',
        'Internal linking strategy',
        'Publishing schedule coordination'
      ],
      excludes: [
        'Social media promotion',
        'Paid advertising',
        'Website maintenance',
        'Graphic design for blog images'
      ]
    }
  };

  const initiatePayment = async (serviceId, customerEmail, customerName) => {
    const service = services[serviceId];
    if (!service) {
      throw new Error('Invalid service ID');
    }

    setCurrentService(service);
    setPaymentStatus('pending');
    setIsProcessing(true);

    try {
      // Check if Razorpay is loaded
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay SDK not loaded. Please refresh the page.');
      }

      const options = {
        key: 'rzp_live_SDJyVJ9zILAxfn', // Live Razorpay key
        amount: service.total * 100, // Amount in paise
        currency: 'INR',
        name: 'GMDS Technologies',
        description: service.name,
        image: 'https://horizons-cdn.hostinger.com/41f08a37-28d2-45b3-a758-ebd6cdef8c1e/1379502dbc027119db4b230911e57743.png',
        prefill: {
          email: customerEmail,
          name: customerName
        },
        theme: {
          color: '#6255A4'
        },
        handler: function (response) {
          handlePaymentSuccess(response, service, customerEmail, customerName);
        },
        modal: {
          ondismiss: function () {
            handlePaymentError(new Error('Payment cancelled by user'));
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      handlePaymentError(error);
    }
  };

  const handlePaymentSuccess = async (response, service, customerEmail, customerName) => {
    try {
      const paymentData = {
        serviceId: service.id,
        serviceName: service.name,
        amount: service.total,
        currency: 'INR',
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id || '',
        customerEmail: customerEmail,
        customerName: customerName,
        status: 'success',
        paymentDate: new Date().toISOString(),
        notes: `Payment for ${service.name}`
      };

      setPaymentDetails(paymentData);
      setPaymentStatus('success');
      setIsProcessing(false);

      // Note: Saving to PocketBase will be done in CheckoutPage after success
      return paymentData;
    } catch (error) {
      console.error('Error processing payment success:', error);
      handlePaymentError(error);
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    setPaymentStatus('failed');
    setIsProcessing(false);
    setPaymentDetails({
      error: error.message || 'Payment failed. Please try again.'
    });
  };

  const resetPayment = () => {
    setPaymentStatus(null);
    setCurrentService(null);
    setPaymentDetails(null);
    setIsProcessing(false);
  };

  const value = {
    services,
    paymentStatus,
    currentService,
    paymentDetails,
    isProcessing,
    initiatePayment,
    handlePaymentSuccess,
    handlePaymentError,
    resetPayment
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};