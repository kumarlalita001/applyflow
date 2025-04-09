import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { appName } from '../../constants/names';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{appName}</h3>
            <p className="text-gray-400">
              Simplify your job search journey with our powerful application tracking system.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Twitter size={20} />} href="#" />
              <SocialIcon icon={<Github size={20} />} href="#" />
              <SocialIcon icon={<Linkedin size={20} />} href="#" />
              <SocialIcon icon={<Mail size={20} />} href="#" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <FooterLinks
              links={[
                { label: 'Features', href: '#' },
                { label: 'Pricing', href: '#' },
                { label: 'Tutorial', href: '#' },
                { label: 'Updates', href: '#' },
              ]}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <FooterLinks
              links={[
                { label: 'About Us', href: '#' },
                { label: 'Careers', href: '#' },
                { label: 'Blog', href: '#' },
                { label: 'Contact', href: '#' },
              ]}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <FooterLinks
              links={[
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Cookie Policy', href: '#' },
              ]}
            />
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} {appName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }) => (
  <motion.a
    href={href}
    className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
  </motion.a>
);

const FooterLinks = ({ links }) => (
  <ul className="space-y-2">
    {links.map((link) => (
      <li key={link.label}>
        <motion.a
          href={link.href}
          className="text-gray-400 hover:text-white transition-colors"
          whileHover={{ x: 5 }}
        >
          {link.label}
        </motion.a>
      </li>
    ))}
  </ul>
);