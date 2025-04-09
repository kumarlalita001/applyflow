import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Menu, X } from 'lucide-react';
import { appName } from '../../constants/names';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white shadow-md z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">{appName}</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How it Works</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden"
          >
            <div  onClick={() => setIsMenuOpen(false)} className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavLink href="#features">Features</MobileNavLink>
              <MobileNavLink href="#how-it-works">How it Works</MobileNavLink>
              <MobileNavLink href="#pricing">Pricing</MobileNavLink>
              <MobileNavLink href="#contact">Contact</MobileNavLink>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

const NavLink = ({ href, children }) => (
  <motion.a
    href={href}
    className="text-gray-600 hover:text-blue-600 transition-colors"
    whileHover={{ scale: 1.1 }}
  >
    {children}
  </motion.a>
);

const MobileNavLink = ({ href, children }) => (
  <motion.a
    href={href}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
    whileHover={{ scale: 1.05 }}
  >
    {children}
  </motion.a>
);