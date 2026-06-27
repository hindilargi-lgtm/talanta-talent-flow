import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-2">Talanta Jobs</h3>
            <p className="text-gray-400 max-w-md">
              Application portal for short-term stadium jobs at Talanta Stadium. 
              Find your next opportunity and join our team today.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end gap-6">
            <h4 className="text-lg font-semibold">Contact Support</h4>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/254108673423" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-colors px-4 py-2 rounded-full font-medium"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
              <a 
                href="https://t.me/hrtalantastadium" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-full font-medium"
              >
                <Send size={20} />
                Telegram
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Talanta Stadium Jobs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
