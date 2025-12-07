import { LogOut, MessageSquare, User, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser, useClerk, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Branding */}
          <div className="flex items-center gap-4">
            <Link to={'/'} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md transform transition-all duration-200 group-hover:scale-105">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="hidden sm:inline text-lg font-bold text-slate-800">Smart Health Assistant</span>
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <SignedIn>
              <button
                type="button"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-gray-50"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
              </button>
            </SignedIn>

            {/* User menu with Clerk UserButton */}
            <SignedIn>
              <div className="flex items-center gap-3">
                
                <UserButton 
                  afterSignOutUrl="/login"
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9",
                      userButtonPopoverCard: "shadow-lg",
                    }
                  }}
                />
                <span className="hidden sm:inline text-sm font-medium text-slate-700">
                  {user?.fullName || user?.firstName || 'User'}
                </span>
              </div>
            </SignedIn>

            {/* Login/Register - when signed out */}
            <SignedOut>
              <div className="flex items-center gap-2">
                <Link to={'/login'} className="px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-gray-50">
                  Login
                </Link>
                <Link to={'/register'} className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold">
                  Sign up
                </Link>
              </div>
            </SignedOut>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Open menu"
              onClick={() => setMenuOpen((s) => !s)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;