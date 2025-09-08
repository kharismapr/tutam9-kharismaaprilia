import React from 'react';
import Rawr from './assets/my logo.png';
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-sage-400 to-sage-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={Rawr} alt="Logo" className="h-8 w-auto mr-2" />
          <h1 className="text-xl font-bold">Kharisma's To Do List</h1>
        </div>
        <div className="flex items-center space-x-6 mr-2">
          <Link to="/home" className="text-md md:text-base hover:underline font-bold">
            Home
          </Link>
          <Link to="/todolist" className="text-md md:text-base hover:underline font-bold">
            Todo List
          </Link>
        </div>
      </div>
    </nav>
  );
}