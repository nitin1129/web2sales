import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import MainLayout from '@/layouts/MainLayout.jsx';
import HomePage from '@/pages/HomePage.jsx';
import ServicesPage from '@/pages/ServicesPage.jsx';
import CheckoutPage from '@/pages/CheckoutPage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';
import BlogPage from '@/pages/BlogPage.jsx';
import BlogDetailPage from '@/pages/BlogDetailPage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import PrivacyPage from '@/pages/PrivacyPage.jsx';
import TermsPage from '@/pages/TermsPage.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="checkout/:serviceId" element={<CheckoutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="blogs" element={<BlogPage />} />
            <Route path="blog/:id" element={<BlogDetailPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;