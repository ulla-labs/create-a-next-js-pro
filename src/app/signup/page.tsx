'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input';
import { UserPlus } from 'lucide-react';

export default function SignupPage() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirm = formData.get('confirmPassword') as string;

    if (password.length < 8) {
      setErrors({ password: 'Password must be at least 8 characters' });
      return;
    }

    if (password !== confirm) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    console.log('Signing up...', Object.fromEntries(formData));
    alert('Account created! Check console.');
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join us to get started with our platform">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input label="Full Name" name="name" type="text" placeholder="John Doe" required />
          <Input label="Email Address" name="email" type="email" placeholder="name@company.com" required />
          <Input 
            label="Password" 
            name="password" 
            type="password" 
            placeholder="••••••••" 
            required 
            error={errors.password}
          />
          <Input 
            label="Confirm Password" 
            name="confirmPassword" 
            type="password" 
            placeholder="••••••••" 
            required 
            error={errors.confirmPassword}
          />
        </div>

        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <UserPlus className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
          </span>
          Sign up
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}