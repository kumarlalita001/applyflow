import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, Calendar, Clock, FileSearch, 
  Mail, MessageSquare, Bell, Briefcase 
} from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: <FileSearch className="h-6 w-6" />,
      title: 'Application Tracking',
      description: 'Keep track of every job application in one centralized dashboard.'
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'Interview Scheduler',
      description: 'Schedule and manage all your interviews with built-in calendar integration.'
    },
    {
      icon: <BarChart2 className="h-6 w-6" />,
      title: 'Analytics Dashboard',
      description: 'Get insights into your application success rate and interview performance.'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Deadline Reminders',
      description: 'Never miss an application deadline with smart reminders.'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Templates',
      description: 'Professional email templates for follow-ups and thank you notes.'
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'Notes & Feedback',
      description: 'Record interview feedback and important notes for each application.'
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: 'Smart Notifications',
      description: 'Get timely alerts for upcoming interviews and application updates.'
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: 'Job Search Integration',
      description: 'Import job listings directly from popular job boards.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features to streamline your job search process and increase your chances of success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};