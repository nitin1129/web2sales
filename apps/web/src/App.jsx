import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import MainLayout from '@/layouts/MainLayout.jsx';
import AdminLayout from '@/layouts/AdminLayout.jsx';
import HomePage from '@/pages/HomePage.jsx';
import ServicesPage from '@/pages/ServicesPage.jsx';
import CheckoutPage from '@/pages/CheckoutPage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';
import BlogPage from '@/pages/BlogPage.jsx';
import BlogDetailPage from '@/pages/BlogDetailPage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import ProcessPage from '@/pages/ProcessPage.jsx';
import IndustriesPage from '@/pages/IndustriesPage.jsx';
import ResourcesPage from '@/pages/ResourcesPage.jsx';
import TrackPostsPage from '@/pages/TrackPostsPage.jsx';
import VideosPage from '@/pages/VideosPage.jsx';
import WebinarsPage from '@/pages/WebinarsPage.jsx';
import PrivacyPage from '@/pages/PrivacyPage.jsx';
import TermsPage from '@/pages/TermsPage.jsx';
import RefundPolicyPage from '@/pages/RefundPolicyPage.jsx';
import CookiePolicyPage from '@/pages/CookiePolicyPage.jsx';
import NotFoundPage from '@/pages/NotFoundPage.jsx';
import AdminLoginPage from '@/pages/admin/AdminLoginPage.jsx';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage.jsx';
import AdminEditorPage from '@/pages/admin/AdminEditorPage.jsx';
import AdminVideosPage from '@/pages/admin/AdminVideosPage.jsx';
import AdminVideoEditorPage from '@/pages/admin/AdminVideoEditorPage.jsx';
import AdminWebinarsPage from '@/pages/admin/AdminWebinarsPage.jsx';
import AdminWebinarEditorPage from '@/pages/admin/AdminWebinarEditorPage.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import RequireAuth from '@/components/RequireAuth.jsx';
import AppLoader from '@/components/AppLoader.jsx';
import RouteLoader from '@/components/RouteLoader.jsx';

function App() {
  return (
    <AuthProvider>
      <AppLoader />
      <BrowserRouter>
        <ScrollToTop />
        <RouteLoader />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="checkout/:serviceId" element={<CheckoutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="blogs" element={<BlogPage />} />
            <Route path="blog/:id" element={<BlogDetailPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="process" element={<ProcessPage />} />
            <Route path="industries" element={<IndustriesPage />} />
            <Route
              path="industries/:slug"
              element={<TrackPostsPage sectionType="industries" />}
            />
            <Route path="resources" element={<ResourcesPage />} />
            <Route
              path="resources/:slug"
              element={<TrackPostsPage sectionType="resources" />}
            />
            <Route path="videos" element={<VideosPage />} />
            <Route path="webinars" element={<WebinarsPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="refund-policy" element={<RefundPolicyPage />} />
            <Route path="cookies" element={<CookiePolicyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="new" element={<AdminEditorPage />} />
            <Route path="edit/:slug" element={<AdminEditorPage />} />
            <Route path="videos" element={<AdminVideosPage />} />
            <Route path="videos/new" element={<AdminVideoEditorPage />} />
            <Route path="videos/edit/:slug" element={<AdminVideoEditorPage />} />
            <Route path="webinars" element={<AdminWebinarsPage />} />
            <Route path="webinars/new" element={<AdminWebinarEditorPage />} />
            <Route path="webinars/edit/:slug" element={<AdminWebinarEditorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
