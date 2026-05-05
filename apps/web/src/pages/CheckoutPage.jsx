import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Lock, ArrowLeft, Shield } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import pb from '@/lib/pocketbaseClient';
import SEO from '@/components/SEO.jsx';

const CheckoutPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { services, initiatePayment, paymentStatus, paymentDetails, resetPayment } = useAuth();

  const [customerData, setCustomerData] = useState({ name: '', email: '' });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const service = services[serviceId];

  useEffect(() => {
    if (!service) {
      navigate('/services');
    }
  }, [service, navigate]);

  useEffect(() => {
    if (paymentStatus === 'success' && paymentDetails) {
      savePaymentToDatabase();
    }
  }, [paymentStatus, paymentDetails]);

  const savePaymentToDatabase = async () => {
    try {
      await pb.collection('payments').create(paymentDetails, { $autoCancel: false });
      toast({
        title: 'Payment successful!',
        description: 'Your order has been confirmed. Check your email for details.',
        variant: 'default'
      });
      setTimeout(() => {
        navigate('/');
        resetPayment();
      }, 2000);
    } catch (error) {
      console.error('Error saving payment:', error);
      toast({
        title: 'Payment recorded',
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

    if (!customerData.name || !customerData.email) {
      toast({
        title: 'Validation error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    if (!termsAccepted) {
      toast({
        title: 'Terms required',
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
        title: 'Payment failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
      setIsProcessing(false);
    }
  };

  if (!service) return null;

  if (paymentStatus === 'success') {
    return (
      <>
        <SEO title="Payment Successful" description="Your Web2Sales payment was successful." noindex />
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-slate-200/70 bg-white p-10 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.3)] max-w-md w-full text-center"
          >
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-5">
              <CheckCircle className="h-9 w-9" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment successful!</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Thank you for your purchase. We'll send you an email confirmation shortly with next steps.
            </p>
            <div className="rounded-2xl bg-slate-50 p-4 mb-6 text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Order ID</p>
              <p className="mt-1 font-mono text-sm font-semibold text-slate-900 break-all">
                {paymentDetails?.razorpayPaymentId}
              </p>
            </div>
            <Button
              onClick={() => {
                navigate('/');
                resetPayment();
              }}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-full"
            >
              Back to home
            </Button>
          </motion.div>
        </div>
      </>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <>
        <SEO title="Payment Failed" description="Your Web2Sales payment could not be completed." noindex />
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-slate-200/70 bg-white p-10 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.3)] max-w-md w-full text-center"
          >
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600 mb-5">
              <XCircle className="h-9 w-9" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment failed</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              {paymentDetails?.error || 'Something went wrong with your payment. Please try again.'}
            </p>
            <Button
              onClick={() => {
                resetPayment();
                setIsProcessing(false);
              }}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-full"
            >
              Try again
            </Button>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`Checkout — ${service.name}`}
        description={`Complete your purchase for ${service.name} from Web2Sales.`}
        noindex
      />

      <div className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to services
          </Link>

          <div className="rounded-3xl border border-slate-200/70 bg-white shadow-[0_30px_80px_-50px_rgba(15,23,42,0.25)] overflow-hidden">
            {/* Service Summary Banner */}
            <div className="relative overflow-hidden dark-section px-8 py-10 md:px-12">
              <div className="relative z-10">
                <span className="eyebrow-light">You're buying</span>
                <h1 className="mt-3 text-3xl md:text-4xl font-bold text-white">{service.name}</h1>
                <p className="mt-2 text-slate-300 leading-relaxed max-w-2xl">{service.description}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_1fr]">
              {/* Left — Service Details */}
              <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-200/70 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-900 mb-5">Order summary</h2>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 mb-6">
                  <div className="flex justify-between text-sm py-1">
                    <span className="text-slate-600">Base price</span>
                    <span className="font-semibold text-slate-900">₹{service.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm py-1">
                    <span className="text-slate-600">GST (18%)</span>
                    <span className="font-semibold text-slate-900">₹{service.gst.toLocaleString()}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <div className="flex justify-between items-baseline">
                      <span className="text-base font-bold text-slate-900">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{service.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Timeline: <span className="font-semibold text-slate-700">{service.timeline}</span>
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="flex items-center text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Included
                  </h3>
                  <ul className="space-y-2">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-slate-700">
                        <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="flex items-center text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    <XCircle className="h-4 w-4 mr-2" />
                    Not included
                  </h3>
                  <ul className="space-y-2">
                    {service.excludes.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-slate-500">
                        <XCircle className="h-4 w-4 text-slate-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right — Checkout Form */}
              <div className="p-8 md:p-10">
                <h2 className="text-lg font-bold text-slate-900 mb-5">Your details</h2>
                <form onSubmit={handleCheckout} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
                      Full name <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={customerData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      required
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                      Email address <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={customerData.email}
                      onChange={handleInputChange}
                      placeholder="jane@example.com"
                      required
                      className="mt-1.5"
                    />
                    <p className="text-xs text-slate-500 mt-1.5">
                      We'll send order confirmation and next steps to this email.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={setTermsAccepted}
                      className="mt-0.5"
                    />
                    <Label htmlFor="terms" className="text-sm text-slate-600 leading-relaxed cursor-pointer">
                      I agree to the{' '}
                      <Link to="/terms" target="_blank" className="text-primary font-medium hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" target="_blank" className="text-primary font-medium hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div className="rounded-2xl bg-primary/5 border border-primary/15 p-4 flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Secure checkout via Razorpay. We never see or store your card details.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base py-6 rounded-full shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:-translate-y-0.5"
                  >
                    {isProcessing ? (
                      'Processing...'
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Pay ₹{service.total.toLocaleString()}
                      </>
                    )}
                  </Button>

                  <div className="flex items-start gap-2 pt-1">
                    <AlertCircle className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-500 leading-relaxed">
                      You'll be redirected to Razorpay's secure payment gateway to complete your purchase.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
