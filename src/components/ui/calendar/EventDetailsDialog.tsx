
import { Event, InspectionStatus } from "@/types/inspection";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface EventDetailsDialogProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailsDialog({
  event,
  isOpen,
  onClose,
}: EventDetailsDialogProps) {
  if (!event) return null;

  const getStatusColor = (status: InspectionStatus): string => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "scheduled":
        return "bg-blue-500";
      case "inspected":
        return "bg-purple-500";
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "cancelled":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="grid gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Status</h4>
              <Badge className={getStatusColor(event.status as InspectionStatus)}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Date & Time</h4>
              <p className="text-sm">
                {format(event.start, "PPP")}
                <br />
                {format(event.start, "p")} -{" "}
                {format(event.end, "p")}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Application Type</h4>
              <p className="text-sm capitalize">
                {event.application_type.replace("_", " ")}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
