"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LoginModal from './LoginModal';

interface User {
  email: string;
  role: string;
  name?: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileCard(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      checkLoginStatus();
    }
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/auth/check', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      if (!res.ok) {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('token');
        return;
      }

      const data = await res.json();
      setIsLoggedIn(data.isLoggedIn);
      if (data.isLoggedIn && data.user) {
        setUser(data.user);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('token');
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      if (!res.ok) {
        console.error('Failed to logout');
        return;
      }

      const data = await res.json();
      if (data.success) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
        setShowProfileCard(false);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    checkLoginStatus();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 w-full will-change-transform" 
           style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}>
        <div className="w-full">
          <div className="flex items-center justify-between h-16 px-4 max-w-[1920px] mx-auto">
            {/* Logo */}
            <div className="flex-shrink-0 w-[100px]">
              <Link href="/" className="block">
                <Image
                  src="/icons/logodaiku.png"
                  alt="Daiku Logo"
                  width={100}
                  height={40}
                  priority
                  quality={100}
                  className="h-8 w-auto"
                  style={{ objectFit: 'contain' }}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="flex-1 flex justify-center items-center max-w-2xl">
              <div className="hidden md:flex items-center space-x-[60px]">
                {['BERANDA', 'TENTANG KAMI', 'DESAIN', 'BLOG'].map((item) => (
                  <Link
                    key={item}
                    href={
                      item === 'BERANDA' 
                        ? '/' 
                        : item === 'TENTANG KAMI'
                          ? '/aboutus'
                          : `/${item.toLowerCase().replace(' ', '')}`
                    }
                    className="text-gray-800 font-medium transition-colors relative group no-underline"
                  >
                    {item}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Login Button / User Profile */}
            <div className="flex-shrink-0 w-[100px] flex justify-end">
              {isLoggedIn ? (
                <div className="relative" ref={profileRef}>
                  <button 
                    onClick={() => setShowProfileCard(!showProfileCard)}
                    className="rounded-full p-1 transition-colors hover:bg-gray-100"
                  >
                    <Image 
                      src="/icons/user.svg"
                      alt="User Icon"
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                  </button>

                  {/* Profile Dropdown Card */}
                  {showProfileCard && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                      <div className="p-4 bg-gradient-to-r from-orange-400 to-orange-500">
                        <div className="flex items-center space-x-3">
                          <div className="bg-white p-2 rounded-full">
                            <Image 
                              src="/icons/user.svg"
                              alt="Profile"
                              width={24}
                              height={24}
                              className="w-6 h-6"
                            />
                          </div>
                          <div className="text-white">
                            <p className="font-medium">{user?.name || user?.email}</p>
                            <p className="text-sm text-orange-100">{user?.role}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-md flex items-center space-x-3">
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Edit Profile</span>
                        </button>

                        {user?.role === 'ADMIN' && (
                          <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-md flex items-center space-x-3">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Admin Panel</span>
                          </button>
                        )}

                        <div className="my-2 border-t border-gray-100"></div>

                        <button 
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-md flex items-center space-x-3"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Keluar</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-6 py-2 rounded-full border-2 border-gray-800 text-gray-800 font-medium hover:bg-gray-800 hover:text-white transition-colors"
                >
                  Masuk
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-800 p-2"
              >
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t`}>
            <div className="px-4 py-2 space-y-1">
              {['BERANDA', 'TENTANG KAMI', 'DESAIN', 'BLOG'].map((item) => (
                <Link
                  key={item}
                  href={
                    item === 'BERANDA' 
                      ? '/' 
                      : item === 'TENTANG KAMI'
                        ? '/aboutus'
                        : `/${item.toLowerCase().replace(' ', '')}`
                  }
                  className="block px-2 py-2 text-gray-800 hover:text-orange-400 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}