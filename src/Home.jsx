import React from 'react';
import Logo from './assets/clovey.svg';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mx-auto py-20 px-4 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
      {/* Right Section */}
      <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
        <img
          src={Logo}
          alt="Clover Icon"
          className="w-[200px] md:w-[300px] object-contain"
        />
      </div>

      {/* Left Section */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl font-bold">WELCOME ORANG KEREN!</h1>
        <p className="text-lg my-10">
          Seru banget dah jadi orang sibuk, kek suka bikin mikir terus jadi pusing jir. Tapi lega banget kalo bisa kelar apalagi kalo sesuai harapan. YAA GASIH??
        </p>
        <Link
          to="/todolist"
          className="bg-sage-700 text-white font-bold px-6 py-4 rounded-full hover:bg-sage-400 transition-colors"
        >
          YASSS LESGO!!!
        </Link>
      </div>

    </div>
  );
}
