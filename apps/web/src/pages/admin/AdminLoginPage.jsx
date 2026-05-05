import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import api, { getToken, setToken } from '@/lib/apiClient';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (getToken()) {
      (async () => {
        try {
          const res = await api.me();
          if (res?.authenticated) navigate('/admin', { replace: true });
        } catch {
          /* ignore */
        }
      })();
    }
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!password) {
      setError('Please enter a password.');
      return;
    }
    setIsSubmitting(true);
    try {
      const { token } = await api.login(password);
      setToken(token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.data?.error || err.message || 'Invalid password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login — Web2Sales</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 mb-5">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Admin access</h1>
            <p className="mt-2 text-sm text-slate-600">
              Enter your password to manage blog posts.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.25)] space-y-5"
          >
            <div>
              <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                autoFocus
                required
                className="mt-1.5"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-2xl bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-full shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              <Lock className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>

            <p className="text-center text-xs text-slate-400">
              Protected area · All actions are logged
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
