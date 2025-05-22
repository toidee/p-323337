
import { useState } from "react";
import OwnerLayout from "@/components/layouts/OwnerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { mockNotifications } from "@/data/mockNotifications";

const OwnerNotifications = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all");
  
  // Filter notifications for this owner
  const notifications = mockNotifications.filter(
    n => n.role === "owner" && (user ? n.user_id === user.id : true)
  );
  
  // Filter based on active tab
  const filteredNotifications = activeTab === "all"
    ? notifications
    : notifications.filter(n => n.status === activeTab);
  
  return (
    <OwnerLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-gray-600 mt-2">
            Stay updated with your establishment applications and inspections.
          </p>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input
              placeholder="Search notifications..."
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={(v) => setActiveTab(v as "all" | "unread" | "read")} className="w-full md:w-auto">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex justify-end mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            {filteredNotifications.length > 0 ? (
              <div className="divide-y">
                {filteredNotifications.map((notification, index) => (
                  <div key={notification.id} className={`p-4 flex ${notification.status === "unread" ? "bg-orange-50" : ""}`}>
                    <div className={`rounded-full p-2 ${
                      notification.type === "inspection" 
                        ? "bg-blue-100 text-blue-600" 
                        : notification.type === "application" 
                        ? "bg-green-100 text-green-600" 
                        : "bg-purple-100 text-purple-600"
                    }`}>
                      {notification.type === "inspection" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      ) : notification.type === "application" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-medium">{notification.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-gray-400">
                            {new Date(notification.created_at).toLocaleDateString()}
                          </span>
                          {notification.status === "unread" && (
                            <Badge className="mt-1 bg-orange-500">New</Badge>
                          )}
                        </div>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <Button variant="ghost" size="sm" className="text-vfire-orange">
                          {notification.status === "unread" ? "Mark as Read" : "Mark as Unread"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <div className="rounded-full bg-gray-100 mx-auto p-3 w-12 h-12 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="mt-2 text-sm font-medium">No notifications found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {activeTab === "unread" 
                    ? "You have no unread notifications."
                    : activeTab === "read" 
                    ? "You have no read notifications." 
                    : "You have no notifications yet."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </OwnerLayout>
  );
};

export default OwnerNotifications;
