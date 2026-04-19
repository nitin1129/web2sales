import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import pb from '@/lib/pocketbaseClient';

const CheckoutPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { services, initiatePayment, paymentStatus, paymentDetails, resetPayment } = useAuth();

  const [customerData, setCustomerData] = useState({
    name: '',
    email: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const service = services[serviceId];

  useEffect(() => {
    if (!service) {
      navigate('/services');
    }
  }, [service, navigate]);

  useEffect(() => {
    // Handle payment success
    if (paymentStatus === 'success' && paymentDetails) {
      savePaymentToDatabase();
    }
  }, [paymentStatus, paymentDetails]);

  const savePaymentToDatabase = async () => {
    try {
      await pb.collection('payments').create(paymentDetails, { $autoCancel: false });
      
      toast({
        title: 'Payment Successful!',
        description: 'Your order has been confirmed. Check your email for details.',
        variant: 'default'
      });

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        navigate('/');
        resetPayment();
      }, 2000);
    } catch (error) {
      console.error('Error saving payment:', error);
      toast({
        title: 'Payment Recorded',
        description: 'Payment successful but there was an issue saving details. We will contact you via email.',
        variant: 'default'
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    // Validation
    if (!customerData.name || !customerData.email) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    if (!termsAccepted) {
      toast({
        title: 'Terms Required',
        description: 'Please accept the terms and conditions to proceed.',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);

    try {
      await initiatePayment(serviceId, customerData.email, customerData.name);
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Payment Failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
      setIsProcessing(false);
    }
  };

  if (!service) {
    return null;
  }

  // Success state
  if (paymentStatus === 'success') {
    return (
      <>
        <Helmet>
          <title>Payment Successful - Web2Sales</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center"
          >
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. We'll send you an email confirmation shortly with next steps.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-mono text-lg font-semibold text-gray-900">
                {paymentDetails?.razorpayPaymentId}
              </p>
            </div>
            <Button
              onClick={() => {
                navigate('/');
                resetPayment();
              }}
              className="w-full bg-[#6255A4] hover:bg-[#6255A4]/90"
            >
              Back to Home
            </Button>
          </motion.div>
        </div>
      </>
    );
  }

  // Failed state
  if (paymentStatus === 'failed') {
    return (
      <>
        <Helmet>
          <title>Payment Failed - Web2Sales</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center"
          >
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Failed</h2>
            <p className="text-gray-600 mb-6">
              {paymentDetails?.error || 'Something went wrong with your payment. Please try again.'}
            </p>
            <Button
              onClick={() => {
                resetPayment();
                setIsProcessing(false);
              }}
              className="w-full bg-[#6255A4] hover:bg-[#6255A4]/90"
            >
              Try Again
            </Button>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Checkout - ${service.name} | Web2Sales`}</title>
        <meta name="description" content={`Complete your purchase for ${service.name}`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Service Summary */}
            <div className="bg-gradient-to-r from-[#6255A4] to-[#7B6FB8] p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
              <p className="text-lg opacity-90">{service.description}</p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Left Column - Service Details */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Details</h2>
                  
                  {/* Price Breakdown */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Base Price</span>
                      <span className="font-semibold">₹{service.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">GST (18%)</span>
                      <span className="font-semibold">₹{service.gst.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-lg font-bold text-[#6255A4]">₹{service.total.toLocaleString()}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">All prices inclusive of applicable taxes</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-600 mb-2">
                      <strong>Timeline:</strong> {service.timeline}
                    </p>
                  </div>

                  {/* What's Included */}
                  <div className="mb-6">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      What's Included
                    </h3>
                    <ul className="space-y-2">
                      {service.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What's NOT Included */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      What's NOT Included
                    </h3>
                    <ul className="space-y-2">
                      {service.excludes.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column - Checkout Form */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Details</h2>
                  <form onSubmit={handleCheckout} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={customerData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={customerData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        We'll send order confirmation and next steps to this email
                      </p>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={setTermsAccepted}
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                        I agree to the{' '}
                        <a href="/terms" target="_blank" className="text-[#6255A4] hover:underline">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="/privacy" target="_blank" className="text-[#6255A4] hover:underline">
                          Privacy Policy
                        </a>
                      </Label>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                      <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-800">
                        You'll be redirected to Razorpay's secure payment gateway to complete your purchase.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-[#6255A4] hover:bg-[#6255A4]/90 text-white font-bold text-lg py-6"
                    >
                      {isProcessing ? 'Processing...' : `Pay ₹${service.total.toLocaleString()}`}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;