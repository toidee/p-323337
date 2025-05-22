
import React from "react";
import Header from "@/components/layout/Header";

interface ShellProps {
  children: React.ReactNode;
  title?: string;
}

export const Shell: React.FC<ShellProps> = ({ children, title }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={title} />
      <main className="container mx-auto px-4 py-8 flex-1">
        {children}
      </main>
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} V-FIRE Inspect. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
