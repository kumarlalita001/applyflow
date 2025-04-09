import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { appName } from '../../constants/names';

export const Hero = () => {
  return (
    <div className="pt-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Track Your Job Applications
              <span className="text-blue-600"> Effortlessly</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Never lose track of your job applications again. Organize, monitor, and optimize
              your job search journey with {appName}.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                'Track unlimited applications',
                'Smart status updates',
                'Interview scheduling',
                'Application analytics',
              ].map((feature) => (
                <motion.div
                  key={feature}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  <CheckCircle className="text-green-500 h-5 w-5" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="bg-blue-600 text-white cursor-pointer px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
                <Link to="/auth/login">
              <span>Get Started Free</span>
              </Link>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              alt="Job Application Dashboard"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-lg" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};