import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className=" border-t border-gray-200 py-6 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        {/* Logo & Text */}
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <img src='/favicon.svg' alt="Imagify Logo" className="w-6 h-6" />
          <span className="text-white text-sm">
            All right reserved. Copyright ©imagify
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-black hover:text-white transition">
            <FaFacebookF size={14} />
          </a>
          <a href="#" className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-black hover:text-white transition">
            <FaTwitter size={14} />
          </a>
          <a href="#" className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-black hover:text-white transition">
            <FaInstagram size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
