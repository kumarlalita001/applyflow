import React from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Users, Trophy } from 'lucide-react';
import { appName } from '../../constants/names';

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: 'Find Jobs',
      description: 'Browse through job listings or import them directly from your favorite job boards.'
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Track Applications',
      description: 'Add applications to your dashboard and track their status in real-time.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Manage Interviews',
      description: 'Schedule interviews and get reminders for upcoming meetings.'
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: 'Land the Job',
      description: 'Accept your dream offer and celebrate your success!'
    }
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How {appName} Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four simple steps to organize your job search and land your dream role.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-blue-200"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};