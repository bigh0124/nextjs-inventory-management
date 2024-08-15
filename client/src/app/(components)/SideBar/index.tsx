"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { Archive, CircleDollarSign, Clipboard, Layout, LucideIcon, Menu, SlidersHorizontal, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideBarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({ href, icon: Icon, label, isCollapsed }: SideBarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`flex items-center cursor-pointer ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:bg-blue-100 hover:text-blue-500 ${isActive && "bg-blue-200 text-white"} gap-3 transition-colors`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}>{label}</span>
      </div>
    </Link>
  );
};

const SideBar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <div>Logo</div>
        <h1 className={`${isSidebarCollapsed ? "hidden" : "block"} font-extrabold text-2xl whitespace-nowrap`}>
          E-STOCK
        </h1>

        <button className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100" onClick={toggleSidebar}>
          <Menu className="w-4 h-4" />
        </button>
      </div>
      {/* LINKS */}
      <div className="flex-grow mt-8">
        <SidebarLink href="/dashboard" isCollapsed={isSidebarCollapsed} icon={Layout} label="Dasdboard" />
        <SidebarLink href="/inventory" isCollapsed={isSidebarCollapsed} icon={Archive} label="Inventory" />
        <SidebarLink href="/products" isCollapsed={isSidebarCollapsed} icon={Clipboard} label="Products" />
        <SidebarLink href="/user" isCollapsed={isSidebarCollapsed} icon={User} label="User" />
        <SidebarLink href="/settings" isCollapsed={isSidebarCollapsed} icon={SlidersHorizontal} label="Settings" />
        <SidebarLink href="/expenses" isCollapsed={isSidebarCollapsed} icon={CircleDollarSign} label="Expenses" />
      </div>
      {/* FOOTER */}
      <div>
        <p className="text-xs text-center text-gray-500">&copy; 2024 E-STOCK</p>
      </div>
    </div>
  );
};

export default SideBar;
