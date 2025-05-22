
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { toast } from "sonner";
import { DateRange } from "@/types/inspection";
import { User } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";

interface DutyStatusToggleProps {
  className?: string;
}

export function DutyStatusToggle({ className }: DutyStatusToggleProps) {
  const { user, updateUser } = useAuth();
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [availabilityPeriod, setAvailabilityPeriod] = useState<DateRange>({
    from: undefined,
    to: undefined,
    start: undefined,
    end: undefined
  });
  const [isEditing, setIsEditing] = useState(false);

  // Initialize from user data
  useEffect(() => {
    if (user) {
      setIsOnDuty(user.duty_status || false);
      
      if (user.availability_period) {
        setAvailabilityPeriod({
          from: user.availability_period.start ? new Date(user.availability_period.start) : undefined,
          to: user.availability_period.end ? new Date(user.availability_period.end) : undefined,
          start: user.availability_period.start ? new Date(user.availability_period.start) : undefined,
          end: user.availability_period.end ? new Date(user.availability_period.end) : undefined
        });
      }
    }
  }, [user]);

  const handleDutyToggle = async (checked: boolean) => {
    if (checked && (!availabilityPeriod.from || !availabilityPeriod.to)) {
      toast.error("Please set an availability period first");
      return;
    }

    try {
      setIsOnDuty(checked);
      
      // Update user duty status
      if (updateUser && user) {
        await updateUser({
          ...user,
          duty_status: checked
        });
        
        // Send notification to admin when toggling On Duty
        if (checked) {
          // In a real app, this would be a backend function call
          console.log("Sending notification to admin about inspector duty status change");
          
          // Show success notification
          toast.success("Duty status updated", {
            description: `You are now ${checked ? "On Duty" : "Off Duty"}`,
          });
          
          // Show admin notification toast
          toast.info("Admin Notification Sent", {
            description: `Admin has been notified that you are now On Duty from ${formatDate(availabilityPeriod.from)} to ${formatDate(availabilityPeriod.to)}`
          });
        } else {
          // Show success notification for Off Duty
          toast.success("Duty status updated", {
            description: "You are now Off Duty"
          });
        }
      }
    } catch (error) {
      console.error("Error updating duty status:", error);
      toast.error("Failed to update duty status");
      setIsOnDuty(!checked); // Revert the toggle if failed
    }
  };

  const handleSaveAvailability = async () => {
    if (!availabilityPeriod.from || !availabilityPeriod.to) {
      toast.error("Please select both start and end dates");
      return;
    }

    try {
      if (updateUser && user) {
        await updateUser({
          ...user,
          availability_period: {
            start: availabilityPeriod.from.toISOString(),
            end: availabilityPeriod.to.toISOString(),
          },
        });
        toast.success("Availability period updated");
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating availability period:", error);
      toast.error("Failed to update availability period");
    }
  };

  // Helper function to format dates
  const formatDate = (date: Date | undefined): string => {
    if (!date) return "Not set";
    return date.toLocaleDateString("en-US", { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          Duty Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">
                {isOnDuty ? "On Duty" : "Off Duty"}
              </h3>
              <p className="text-xs text-gray-500">
                {isOnDuty
                  ? "You are currently available for inspections"
                  : "You are currently not available for inspections"}
              </p>
            </div>
            <Switch 
              checked={isOnDuty} 
              onCheckedChange={handleDutyToggle} 
            />
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Availability Period</h4>
              {!isEditing && availabilityPeriod.start && availabilityPeriod.end && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  disabled={isOnDuty} // Disable editing when On Duty
                >
                  Edit
                </Button>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-4">
                <DateRangePicker
                  value={availabilityPeriod}
                  onChange={setAvailabilityPeriod}
                  label="Select availability period"
                />
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-vfire-orange hover:bg-vfire-orange-600"
                    onClick={handleSaveAvailability}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <DateRangePicker
                  value={availabilityPeriod}
                  onChange={setAvailabilityPeriod}
                  disabled={isOnDuty} // Disable when On Duty
                  label="Current availability period"
                />
                
                {!availabilityPeriod.start && !availabilityPeriod.end && !isOnDuty && (
                  <div className="pt-2">
                    <Button 
                      size="sm" 
                      className="w-full bg-vfire-orange hover:bg-vfire-orange-600"
                      onClick={() => setIsEditing(true)}
                    >
                      Set Availability Period
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
