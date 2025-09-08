import React, { useState } from 'react';
import Rawr from './assets/my logo.png';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-sage-400 to-sage-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Judul */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <img src={Rawr} alt="Logo" className="h-8 w-auto" />
            <h1 className="text-lg md:text-xl font-bold leading-tight break-words">
              Kharisma's To Do List
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-6">
            <Link to="/home" className="text-base hover:text-sage-200 font-bold transition-colors">
              Home
            </Link>
            <Link to="/todolist" className="text-base hover:text-sage-200 font-bold transition-colors">
              Todo List
            </Link>
          </div>

          {/* Burger Menu Button */}
          <button
            onClick={toggleMenu}
            className="sm:hidden p-2 rounded-lg hover:bg-sage-500 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          } sm:hidden overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <div className="py-3 space-y-3 border-t border-sage-500">
            <Link
              to="/home"
              className="block px-4 py-2 text-base font-bold hover:bg-sage-500 rounded-lg transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/todolist"
              className="block px-4 py-2 text-base font-bold hover:bg-sage-500 rounded-lg transition-colors"
              onClick={toggleMenu}
            >
              Todo List
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}