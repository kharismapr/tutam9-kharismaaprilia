import React from 'react';
import Logo from './assets/list.svg';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mx-auto py-20 px-4 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
      {/* Left Section */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl font-bold mb-8">Start Your Day with To-Do List Today!</h1>
        <p className="text-lg mb-8">
          Take control of your tasks with our easy-to-use To-Do List app. Whether it's for work, school, or personal projects, our app helps you stay organized and productive. Start today and never forget an important task again—getting organized has never been easier!
        </p>
        <Link
          to="/todolist"
          className="bg-[#5CC3C3] text-white px-4 py-2 rounded hover:bg-[#4DB7B7] transition-colors"
        >
          Get Started
        </Link>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src={Logo}
          alt="To Do List Icon"
          className="w-[200px] md:w-[300px] object-contain"
        />
      </div>
    </div>
  );
}
