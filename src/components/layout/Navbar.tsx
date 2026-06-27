import React from 'react';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/storage';
import { User } from '@/types';
import { LogOut, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onAuthClick: (type: 'signin' | 'signup') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onAuthClick, onLogout }) => {
  const logoUrl = 'https://storage.googleapis.com/dala-prod-public-storage/attachments/b438e72e-bb62-4ecf-af9b-527039257c18/1782580218082_1782570804405.jpg';

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
          <img src={logoUrl} alt="Talanta Logo" className="h-10 w-auto object-contain" />
          <span className="font-bold text-xl tracking-tight text-black">
            Talanta <span className="text-red-600">Jobs</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm font-medium">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <UserIcon size={16} />
                </div>
                <span>{user.fullName} {user.role === 'admin' && '(HR Admin)'}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onAuthClick('signin')}
                className="font-medium"
              >
                Sign In
              </Button>
              <Button 
                size="sm" 
                onClick={() => onAuthClick('signup')}
                className="bg-red-600 hover:bg-red-700 text-white font-medium"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
