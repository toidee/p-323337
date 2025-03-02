import React from "react";
import Header from "@/components/layout/Header";
import LoginForm from "@/components/auth/LoginForm";
import teamPhoto from "@/assets/images/team-photo.svg";
import chatIcon from "@/assets/images/chat-icon.svg";

const Index: React.FC = () => {
  const handleChatClick = () => {
    console.log("Chat icon clicked");
    // Implement chat functionality here
  };

  return (
    <div className="min-h-screen relative bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex gap-[78px] p-10 max-md:flex-col max-md:p-5 max-sm:p-2.5">
        {/* Team Photo */}
        <img
          src={teamPhoto}
          className="w-[984px] h-[518px] shadow-[10px_8px_5.6px_rgba(0,0,0,0.60)] rounded-[11px] max-md:w-full max-md:h-auto"
          alt="Team Photo"
        />

        {/* Login Form */}
        <LoginForm />
      </main>

      {/* Chat Icon */}
      <button
        onClick={handleChatClick}
        className="fixed w-[60px] h-[60px] cursor-pointer right-10 bottom-10 max-sm:w-10 max-sm:h-10 max-sm:right-5 max-sm:bottom-5"
        aria-label="Open chat"
      >
        <img src={chatIcon} alt="Chat Icon" className="w-full h-full" />
      </button>
    </div>
  );
};

export default Index;
