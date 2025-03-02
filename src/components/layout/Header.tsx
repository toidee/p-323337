import React from "react";
import logo from "@/assets/images/logo.svg";

const Header: React.FC = () => {
  return (
    <header className="flex items-center bg-white px-[41px] py-[19px] border-2 border-solid border-black max-sm:px-5 max-sm:py-2.5">
      <img
        src={logo}
        className="w-[65px] h-[86px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] max-sm:w-[45px] max-sm:h-[60px]"
        alt="V-Fire Logo"
      />
      <div className="flex ml-[21px] max-sm:ml-2.5">
        <div className="text-[#f00] text-4xl font-semibold max-sm:text-2xl">
          V-FIRE
        </div>
        <div className="text-black text-xl font-semibold ml-1.5 mt-3 max-sm:text-base max-sm:mt-2">
          INSPECT
        </div>
      </div>
      <nav className="flex gap-[52px] ml-auto max-md:gap-[30px] max-sm:hidden">
        <a
          href="#"
          className="text-black text-2xl font-semibold hover:text-[#fe623f] transition-colors"
        >
          HOME
        </a>
        <a
          href="#"
          className="text-black text-2xl font-semibold hover:text-[#fe623f] transition-colors"
        >
          FAQS
        </a>
        <a
          href="#"
          className="text-black text-2xl font-semibold hover:text-[#fe623f] transition-colors"
        >
          ABOUT
        </a>
      </nav>
    </header>
  );
};

export default Header;
