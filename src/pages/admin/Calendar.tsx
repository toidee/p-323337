
import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusFilter } from "@/components/ui/calendar/StatusFilter";
import { EventDetailsDialog } from "@/components/ui/calendar/EventDetailsDialog";
import { events } from "@/data/mockData";
import { Event, InspectionStatus } from "@/types/inspection";

const AdminCalendar = () => {
  const [selectedStatus, setSelectedStatus] = useState<InspectionStatus | "all">("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter events by status if a status is selected
  const filteredEvents = selectedStatus === "all"
    ? events
    : events.filter(event => event.status === selectedStatus);

  // Mock date for UI
  const currentDate = new Date(2025, 4, 21); // May 21, 2025
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Handler for clicking an event
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  // Handler for closing the event details dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-gray-600 mt-2">
              Manage and schedule inspections across Valenzuela City.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button variant="outline" className="text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </Button>
            <Button className="bg-vfire-orange hover:bg-vfire-orange-600 text-sm">
              Today
            </Button>
            <Button variant="outline" className="text-sm">
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Filters and views */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Tabs defaultValue="month" className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="agenda">Agenda</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex flex-1 justify-end space-x-2">
            <StatusFilter selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
          </div>
        </div>

        {/* Calendar */}
        <Card className="p-4">
          <div className="min-h-[600px]">
            <div className="grid grid-cols-7 gap-px mb-1">
              <div className="text-center text-sm font-medium py-2">Sunday</div>
              <div className="text-center text-sm font-medium py-2">Monday</div>
              <div className="text-center text-sm font-medium py-2">Tuesday</div>
              <div className="text-center text-sm font-medium py-2">Wednesday</div>
              <div className="text-center text-sm font-medium py-2">Thursday</div>
              <div className="text-center text-sm font-medium py-2">Friday</div>
              <div className="text-center text-sm font-medium py-2">Saturday</div>
            </div>
            
            <div className="grid grid-cols-7 grid-rows-5 gap-px bg-gray-200">
              {/* Previous month days */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`prev-${i}`} className="min-h-[100px] bg-gray-50 p-2">
                  <span className="text-sm text-gray-400">
                    {getDaysInMonth(currentYear, currentMonth - 1) - firstDayOfMonth + i + 1}
                  </span>
                </div>
              ))}
              
              {/* Current month days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isToday = day === currentDate.getDate();
                const dayEvents = getEventsForDay(day);
                
                return (
                  <div key={`current-${day}`} className={`min-h-[100px] bg-white p-2 ${isToday ? 'ring-2 ring-vfire-orange bg-orange-50' : ''}`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${isToday ? 'text-vfire-orange' : ''}`}>{day}</span>
                      {isToday && <span className="text-xs bg-vfire-orange text-white px-1 rounded">Today</span>}
                    </div>
                    
                    {/* Events */}
                    {dayEvents.length > 0 && (
                      <div className="mt-2">
                        {dayEvents.map((event, eventIndex) => {
                          let bgColor = "bg-blue-100 text-blue-800";
                          
                          switch (event.status) {
                            case "pending":
                              bgColor = "bg-yellow-100 text-yellow-800";
                              break;
                            case "scheduled":
                              bgColor = "bg-blue-100 text-blue-800";
                              break;
                            case "inspected":
                              bgColor = "bg-purple-100 text-purple-800";
                              break;
                            case "approved":
                              bgColor = "bg-green-100 text-green-800";
                              break;
                            case "rejected":
                              bgColor = "bg-red-100 text-red-800";
                              break;
                            case "cancelled":
                              bgColor = "bg-gray-100 text-gray-800";
                              break;
                          }
                          
                          // Format time
                          const time = new Date(event.start).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          });
                          
                          return (
                            <button
                              key={`event-${day}-${eventIndex}`}
                              className={`text-xs ${bgColor} p-1 rounded mb-1 truncate w-full text-left`}
                              onClick={() => handleEventClick(event)}
                            >
                              {time} - {event.title}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* Next month days */}
              {Array.from({ length: 42 - (firstDayOfMonth + daysInMonth) }).map((_, i) => (
                <div key={`next-${i}`} className="min-h-[100px] bg-gray-50 p-2">
                  <span className="text-sm text-gray-400">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            May 2025
          </div>
        </Card>
        
        {/* Event details dialog */}
        <EventDetailsDialog
          event={selectedEvent}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminCalendar;
