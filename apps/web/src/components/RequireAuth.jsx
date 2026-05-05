import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import api, { getToken, clearToken } from '@/lib/apiClient';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const [state, setState] = useState(() => (getToken() ? 'checking' : 'denied'));

  useEffect(() => {
    let cancelled = false;
    if (!getToken()) {
      setState('denied');
      return;
    }
    (async () => {
      try {
        const res = await api.me();
        if (cancelled) return;
        if (res?.authenticated) setState('allowed');
        else {
          clearToken();
          setState('denied');
        }
      } catch {
        if (!cancelled) {
          clearToken();
          setState('denied');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (state === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-slate-500">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
          <p className="text-sm font-medium">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (state === 'denied') {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
