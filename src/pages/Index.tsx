
import React from "react";
import Header from "@/components/common/Header";
import LoginCard from "@/components/auth/LoginCard";
import { Helmet } from "react-helmet";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { signIn } = useAuth();

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    // Handle forgot password flow
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Admin Login | V-Fire Inspect</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <Header logoUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/692531a09f3d8f46fa6184a126a551c58ac31298" />

      <main>
        <LoginCard
          adminLogoUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/3498d51df3ff7e2a1f563eb8e42a91003b0e7ced"
          emailIconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/bb75a0c80c993a6a1a4e3dcea8cac3d773f93c92"
          passwordIconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/64da3df5875be6a0f4c466434f8f11592a3e6b65"
          showPasswordIconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/53101a4b8d9e90343971771b8ed800546628408a"
          onLogin={signIn}
          onForgotPassword={handleForgotPassword}
        />
      </main>
    </div>
  );
};

export default Index;
