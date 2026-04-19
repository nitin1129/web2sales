import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <p className="text-lg font-semibold mb-4" style={{ color: '#D9CCE5' }}>
              A product by GMDS Technologies OPC Private Limited
            </p>
            <p className="text-gray-400 text-sm">
              Transforming business websites into 24×7 sales machines through strategic optimization and lead generation.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <p className="text-lg font-semibold mb-4">Contact Us</p>
            <div className="space-y-3">
              <a
                href="mailto:contact@gmdstech.com"
                className="flex items-center text-gray-400 hover:text-[#D9CCE5] transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                <span>contact@gmdstech.com</span>
              </a>
              <a
                href="tel:+918595113841"
                className="flex items-center text-gray-400 hover:text-[#D9CCE5] transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                <span>+91 8595113841</span>
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <p className="text-lg font-semibold mb-4">Legal</p>
            <div className="space-y-2">
              <Link
                to="/privacy"
                className="block text-gray-400 hover:text-[#D9CCE5] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="block text-gray-400 hover:text-[#D9CCE5] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} GMDS Technologies OPC Private Limited. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm" style={{ color: '#D9CCE5' }}>
              All prices are inclusive of applicable taxes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;