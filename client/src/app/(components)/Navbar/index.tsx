"use client";
import { Bell, Menu, Settings, Sun } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full mb-7 gap-3">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button className="p-3 rounded-full bg-gray-100 hover:bg-blue-100">
          <Menu className="w-4 h-4" />
        </button>
        <div className="relative">
          <input
            type="search"
            placeholder="Start type to search groups & products"
            className="pl-10 pr-4 py-2 w-50 md:w-80 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 flex justify-center items-center pl-3 pointer-events-none">
            <Bell className="text-gray-500" size={20} />
          </div>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <button>
            <Sun size={24} className="text-gray-500" />
          </button>
          <div className="relative">
            <Bell size={24} className="text-gray-500 cursor-pointer" />
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-300 inline-flex justify-center items-center text-white text-xs font-semibold leading-none">
              1
            </div>
          </div>
          <hr className="w-0 h-7 border border-solid border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9">Image</div>
            <span className="font-semibold">Max</span>
          </div>
        </div>
        <Link href="/settings">
          <Settings size={24} className="text-gray-500" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
