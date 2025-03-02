import React from "react";

interface HeaderProps {
  logoUrl: string;
  logoAlt?: string;
}

const Header: React.FC<HeaderProps> = ({
  logoUrl,
  logoAlt = "V-Fire Logo",
}) => {
  return (
    <header className="w-full h-[116px] flex items-center bg-white px-[41px] py-0 border-2 border-solid border-black max-sm:h-20 max-sm:px-5 max-sm:py-0">
      <img src={logoUrl} className="w-[65px] h-[86px]" alt={logoAlt} />
      <div className="ml-[21px]">
        <div className="text-[#F00] text-4xl font-semibold max-sm:text-[28px]">
          V-FIRE
        </div>
        <div className="text-black text-xl font-semibold mt-[-30px] ml-[124px] max-sm:text-base max-sm:ml-[90px]">
          INSPECT
        </div>
      </div>
    </header>
  );
};

export default Header;
