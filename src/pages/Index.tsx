
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-4xl px-4 py-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-600 text-transparent bg-clip-text mb-3">
            V-FIRE Inspect
          </h1>
          <p className="text-xl md:text-2xl text-gray-600">
            Web-Based Fire Safety Establishment Inspection Management System
          </p>
          <p className="text-lg text-gray-500">
            Bureau of Fire Protection Valenzuela City Chapter
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto mb-12">
          <p className="text-lg mb-6">
            Welcome to V-FIRE Inspect. Please select your role to proceed:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all p-6 h-full flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="font-bold text-lg mb-2">Establishment Owner</h2>
              <p className="text-gray-500 text-sm mb-4">
                Register establishments and apply for fire safety certifications
              </p>
              <Link to="/owner/login" className="w-full mt-auto">
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  Login as Owner
                </Button>
              </Link>
              <p className="mt-2 text-sm text-gray-500">
                New user? <Link to="/owner/signup" className="text-orange-500 hover:underline">Sign up</Link>
              </p>
            </div>
            
            <div className="rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all p-6 h-full flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h2 className="font-bold text-lg mb-2">Fire Inspector</h2>
              <p className="text-gray-500 text-sm mb-4">
                Conduct inspections and manage your assigned tasks
              </p>
              <Link to="/inspector/login" className="w-full mt-auto">
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  Login as Inspector
                </Button>
              </Link>
            </div>
            
            <div className="rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all p-6 h-full flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="font-bold text-lg mb-2">Administrator</h2>
              <p className="text-gray-500 text-sm mb-4">
                Oversee the system and manage users, applications, and inspections
              </p>
              <Link to="/admin/login" className="w-full mt-auto">
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  Login as Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-500 mb-2">Developed for Bureau of Fire Protection Valenzuela City Chapter</p>
          <p className="text-gray-400 text-sm">&copy; 2025 V-FIRE Inspect. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
