
import { Fragment } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InspectionStatus } from "@/types/inspection";

interface StatusFilterProps {
  selectedStatus: InspectionStatus | "all";
  onStatusChange: (status: InspectionStatus | "all") => void;
}

export function StatusFilter({ selectedStatus, onStatusChange }: StatusFilterProps) {
  const statuses: Array<{
    value: InspectionStatus | "all";
    label: string;
  }> = [
    {
      value: "all",
      label: "All Statuses",
    },
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "scheduled",
      label: "Scheduled",
    },
    {
      value: "inspected",
      label: "Inspected",
    },
    {
      value: "approved",
      label: "Approved",
    },
    {
      value: "rejected",
      label: "Rejected",
    },
    {
      value: "cancelled",
      label: "Cancelled",
    },
  ];

  return (
    <Select
      value={selectedStatus}
      onValueChange={(value) => onStatusChange(value as InspectionStatus | "all")}
    >
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="All Statuses" />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
