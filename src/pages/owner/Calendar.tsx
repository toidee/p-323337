
import OwnerLayout from "@/components/layouts/OwnerLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";

// Mock data for calendar events
const mockEvents = [
  {
    id: "1",
    title: "Happy Toy Shop",
    subtitle: "FSIC-Business Inspection",
    date: new Date(2025, 4, 25, 10, 0), // May 25, 2025 at 10:00 AM
    status: "scheduled",
    color: "bg-blue-100 border-blue-300 text-blue-700"
  },
  {
    id: "2",
    title: "Main Street Store",
    subtitle: "Annual Inspection",
    date: new Date(2025, 5, 15, 14, 0), // June 15, 2025 at 2:00 PM
    status: "upcoming",
    color: "bg-purple-100 border-purple-300 text-purple-700"
  }
];

// Helper function to generate calendar days
const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

// Helper function to get day of week name
const getDayName = (date: Date) => {
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

const OwnerCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  // Get the first day of the month and pad with days from previous month
  const firstDay = new Date(currentYear, currentMonth, 1);
  const startingDayOfWeek = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)
  
  // Previous month's padding days
  const prevMonthDays = [];
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(currentYear, currentMonth, -i);
    prevMonthDays.push(prevDate);
  }
  
  // Calculate total days needed (previous month days + current month days)
  const calendarDays = [...prevMonthDays, ...daysInMonth];
  
  // Add days from next month to complete the grid
  const remainingDays = 42 - calendarDays.length; // 6 rows of 7 days
  for (let i = 1; i <= remainingDays; i++) {
    const nextDate = new Date(currentYear, currentMonth + 1, i);
    calendarDays.push(nextDate);
  }
  
  // Find events for a specific date
  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => 
      event.date.getFullYear() === date.getFullYear() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getDate() === date.getDate()
    );
  };
  
  // Navigation functions
  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  const today = () => {
    setCurrentDate(new Date());
  };

  return (
    <OwnerLayout>
      <div className="p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-gray-600 mt-2">
              View your scheduled inspections and important dates.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="calendarSync" className="text-sm">Sync with Google</Label>
              <Switch id="calendarSync" />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={today}
            >
              Today
            </Button>
          </div>
        </div>
        
        <Card className="shadow-sm mb-6">
          <div className="p-4 flex items-center justify-between border-b">
            <div className="font-medium text-lg">{monthName}</div>
            <div className="flex items-center gap-2">
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-none border-0 text-xs px-3"
                  onClick={() => setView('month')}
                  disabled={view === 'month'}
                >
                  Month
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-none border-0 border-x text-xs px-3"
                  onClick={() => setView('week')}
                  disabled={view === 'week'}
                >
                  Week
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-none border-0 text-xs px-3"
                  onClick={() => setView('day')}
                  disabled={view === 'day'}
                >
                  Day
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={previousMonth}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={nextMonth}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {view === 'month' && (
            <div className="p-4">
              {/* Days of week header */}
              <div className="grid grid-cols-7 mb-2 text-sm font-medium text-gray-500">
                <div className="text-center py-2">Sun</div>
                <div className="text-center py-2">Mon</div>
                <div className="text-center py-2">Tue</div>
                <div className="text-center py-2">Wed</div>
                <div className="text-center py-2">Thu</div>
                <div className="text-center py-2">Fri</div>
                <div className="text-center py-2">Sat</div>
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  const isToday = day.toDateString() === new Date().toDateString();
                  const isCurrentMonth = day.getMonth() === currentMonth;
                  const events = getEventsForDate(day);
                  
                  return (
                    <div
                      key={index}
                      className={`
                        min-h-28 border rounded-md overflow-hidden
                        ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
                        ${isToday ? 'ring-2 ring-orange-500' : ''}
                      `}
                    >
                      <div className={`p-1 text-right ${isToday ? 'bg-orange-500 text-white' : ''}`}>
                        {day.getDate()}
                      </div>
                      <div className="p-1">
                        {events.map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 mb-1 rounded truncate border ${event.color}`}
                          >
                            <div className="font-medium">{event.title}</div>
                            <div>{event.subtitle}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {view === 'week' && (
            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 p-8">
                <CalendarIcon className="h-6 w-6 text-gray-400" />
                <p className="text-gray-500">Week view will be implemented soon</p>
              </div>
            </div>
          )}
          
          {view === 'day' && (
            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 p-8">
                <CalendarIcon className="h-6 w-6 text-gray-400" />
                <p className="text-gray-500">Day view will be implemented soon</p>
              </div>
            </div>
          )}
        </Card>
        
        <h2 className="text-xl font-semibold mb-4">Upcoming Inspections</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockEvents.map(event => (
            <Card key={event.id} className="overflow-hidden">
              <div className={`py-2 px-4 ${event.status === 'scheduled' ? 'bg-blue-500' : 'bg-purple-500'} text-white font-medium flex items-center justify-between`}>
                <div>{event.title}</div>
                <div className="text-xs">
                  {event.date.toLocaleDateString('en-US', { 
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <div className="p-4">
                <p className="font-medium">{event.subtitle}</p>
                <p className="text-sm text-gray-500">
                  {event.date.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })} at {event.date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </OwnerLayout>
  );
};

export default OwnerCalendar;
