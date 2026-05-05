import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LogOut, FileText, Video, Mic, ExternalLink } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { clearToken } from '@/lib/apiClient';

const AdminLayout = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    clearToken();
    navigate('/admin/login');
  };

  const linkBase =
    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors';
  const activeCls = 'bg-primary/10 text-primary';
  const inactiveCls = 'text-slate-600 hover:text-primary hover:bg-slate-100';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-6">
            <div className="flex items-center gap-6">
              <Link to="/admin" className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                  W
                </span>
                <span className="font-semibold text-slate-900">Web2Sales · Admin</span>
              </Link>
              <nav className="hidden md:flex items-center gap-1">
                <NavLink
                  to="/admin"
                  end
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? activeCls : inactiveCls}`
                  }
                >
                  <FileText className="h-4 w-4" />
                  Blogs
                </NavLink>
                <NavLink
                  to="/admin/videos"
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? activeCls : inactiveCls}`
                  }
                >
                  <Video className="h-4 w-4" />
                  Videos
                </NavLink>
                <NavLink
                  to="/admin/webinars"
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? activeCls : inactiveCls}`
                  }
                >
                  <Mic className="h-4 w-4" />
                  Webinars
                </NavLink>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/blogs"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary"
              >
                <ExternalLink className="h-4 w-4" />
                View site
              </Link>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default AdminLayout;
