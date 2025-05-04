import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-[#5CC3C3] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">My To Do List </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/home" className="text-sm md:text-base hover:underline font-semibold">
            Home
          </Link>
          <Link to="/todolist" className="text-sm md:text-base hover:underline font-semibold">
            Todo List
          </Link>
          <div className="flex items-center space-x-2">
            <span className="text-sm md:text-base font-semibold">Kharisma Aprilia</span>
          </div>
        </div>
      </div>
    </nav>
  );
}