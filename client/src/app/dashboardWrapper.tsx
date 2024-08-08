import React from "react";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`light flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
      SideBar
      <main className={`flex flex-col w-full h-full bg-gray-50 px-9 py-7 md:pl-24`}>{children}</main>
    </div>
  );
};

export default DashboardWrapper;
