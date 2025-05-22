
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import React from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth Pages
import OwnerLogin from "./pages/auth/OwnerLogin";
import InspectorLogin from "./pages/auth/InspectorLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import OwnerSignup from "./pages/auth/OwnerSignup";

// Admin Pages
import AdminCalendar from "./pages/admin/Calendar";
import AdminInspections from "./pages/admin/Inspections";
import AdminMap from "./pages/admin/Map";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminEstablishments from "./pages/admin/Establishments";
import AdminApplications from "./pages/admin/Applications";
import AdminAnalytics from "./pages/admin/Analytics";

// Inspector Pages
import InspectorDashboard from "./pages/inspector/Dashboard";
import InspectorCalendar from "./pages/inspector/Calendar";
import InspectorInspections from "./pages/inspector/Inspections";
import InspectorMap from "./pages/inspector/Map";
import InspectorNotifications from "./pages/inspector/Notifications";

// Owner Pages
import OwnerDashboard from "./pages/owner/Dashboard";
import OwnerEstablishments from "./pages/owner/Establishments";
import OwnerApplications from "./pages/owner/Applications";
import OwnerInspections from "./pages/owner/Inspections";
import OwnerCalendar from "./pages/owner/Calendar";
import OwnerMap from "./pages/owner/Map";
import OwnerNotifications from "./pages/owner/Notifications";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Public pages */}
                <Route path="/" element={<Index />} />
                
                {/* Auth routes */}
                <Route path="/owner/login" element={<OwnerLogin />} />
                <Route path="/inspector/login" element={<InspectorLogin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/owner/signup" element={<OwnerSignup />} />
                
                {/* Admin routes */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/establishments" element={<AdminEstablishments />} />
                <Route path="/admin/applications" element={<AdminApplications />} />
                <Route path="/admin/inspections" element={<AdminInspections />} />
                <Route path="/admin/calendar" element={<AdminCalendar />} />
                <Route path="/admin/map" element={<AdminMap />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                
                {/* Inspector routes */}
                <Route path="/inspector/dashboard" element={<InspectorDashboard />} />
                <Route path="/inspector/inspections" element={<InspectorInspections />} />
                <Route path="/inspector/calendar" element={<InspectorCalendar />} />
                <Route path="/inspector/map" element={<InspectorMap />} />
                <Route path="/inspector/notifications" element={<InspectorNotifications />} />
                
                {/* Owner routes */}
                <Route path="/owner/dashboard" element={<OwnerDashboard />} />
                <Route path="/owner/establishments" element={<OwnerEstablishments />} />
                <Route path="/owner/applications" element={<OwnerApplications />} />
                <Route path="/owner/inspections" element={<OwnerInspections />} />
                <Route path="/owner/calendar" element={<OwnerCalendar />} />
                <Route path="/owner/map" element={<OwnerMap />} />
                <Route path="/owner/notifications" element={<OwnerNotifications />} />
                
                {/* Catch-all for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
