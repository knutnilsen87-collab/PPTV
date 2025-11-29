'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Replace with actual API call
      if (formData.username && formData.email && formData.password) {
        try {
          localStorage.setItem('userRole', 'user');
        } catch (error) {
          console.warn('localStorage not available:', error);
        }
        router.push('/profile');
      } else {
        setError('Please fill in all fields');
      }
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-poker-950">
      <Navigation />

      <main className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Registration Form */}
            <div className="glass rounded-xl p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <Image
                    src="/Pro Poker.svg"
                    alt="Pro Poker Logo"
                    width={96}
                    height={96}
                    className="w-24 h-24 object-contain"
                  />
                  <div className="absolute -inset-4 bg-accent-green/10 rounded-2xl blur-2xl animate-pulse-slow" />
                </div>
              </div>

              <h2 className="text-h2 font-bold mb-8 text-center text-poker-100">
                Create Account
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 animate-shake">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                    {error}
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-poker-300"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-poker-400" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 bg-poker-800/50 rounded-xl text-poker-100 border border-poker-700 focus:border-accent-green focus:ring-2 focus:ring-accent-green/20 focus:outline-none transition-all duration-200 placeholder-poker-400"
                      placeholder="Choose a username"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-poker-300"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-poker-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 bg-poker-800/50 rounded-xl text-poker-100 border border-poker-700 focus:border-accent-green focus:ring-2 focus:ring-accent-green/20 focus:outline-none transition-all duration-200 placeholder-poker-400"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-poker-300"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-poker-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 p-3 bg-poker-800/50 rounded-xl text-poker-100 border border-poker-700 focus:border-accent-green focus:ring-2 focus:ring-accent-green/20 focus:outline-none transition-all duration-200 placeholder-poker-400"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-poker-400 hover:text-poker-300" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-poker-400 hover:text-poker-300" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-poker-300"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-poker-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 p-3 bg-poker-800/50 rounded-xl text-poker-100 border border-poker-700 focus:border-accent-green focus:ring-2 focus:ring-accent-green/20 focus:outline-none transition-all duration-200 placeholder-poker-400"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-poker-400 hover:text-poker-300" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-poker-400 hover:text-poker-300" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-accent-green focus:ring-accent-green border-poker-600 rounded bg-poker-800/50"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-poker-300">
                    I agree to the{' '}
                    <Link href="/terms" className="text-accent-green hover:text-accent-green/80">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-accent-green hover:text-accent-green/80">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-3 font-bold rounded-xl relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className={`relative z-10 flex items-center justify-center ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                    Create Account
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </span>
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-poker-400">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-accent-green hover:text-accent-green/80 font-medium transition-colors duration-200"
                >
                  Log in here
                </Link>
              </p>
            </div>

            {/* Right side - Features/Info */}
            <div className="hidden md:block space-y-6">
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-semibold text-poker-100 mb-4">Join Our Community</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-accent-green mr-2 flex-shrink-0" />
                    <span className="text-poker-300">Share your poker experiences</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-accent-green mr-2 flex-shrink-0" />
                    <span className="text-poker-300">Learn from professional players</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-accent-green mr-2 flex-shrink-0" />
                    <span className="text-poker-300">Build your poker network</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-accent-green mr-2 flex-shrink-0" />
                    <span className="text-poker-300">Access exclusive content</span>
                  </li>
                </ul>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-semibold text-poker-100 mb-4">Member Benefits</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-green">24/7</div>
                    <div className="text-sm text-poker-400">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-gold">100%</div>
                    <div className="text-sm text-poker-400">Free Access</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-blue">Unlimited</div>
                    <div className="text-sm text-poker-400">Uploads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-teal">Premium</div>
                    <div className="text-sm text-poker-400">Features</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
