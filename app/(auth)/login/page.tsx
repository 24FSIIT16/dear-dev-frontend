'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Logo from '@components/ui/Logo/Logo';
import UserAuthForm from './components/UserAuthForm';

const LoginPage: React.FC = () => (
  <div className="grid grid-cols-2">
    <div className="bg-primaryGreen-light dark:bg-primaryGreen-bg">
      <div className="flex min-h-screen flex-col p-16">
        <Logo className="h-8 w-8 flex-1" />
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: 'easeInOut',
          }}
        >
          <h1 className="text-2xl font-medium">Where productivity meets happiness</h1>
          <p className="py-8 pr-8 text-lg font-light dark:text-black">
            Discover a new way to track your happiness and boost your productivity. yappi helps you monitor your
            emotional well-being, learn from your experiences, and achieve greater efficiency in your daily life. Join
            us now and take the first step towards a happier, more productive you.
          </p>
        </motion.div>
      </div>
    </div>
    <div className="flex items-center justify-center">
      <UserAuthForm className="px-8" />
    </div>
  </div>
);

export default LoginPage;
