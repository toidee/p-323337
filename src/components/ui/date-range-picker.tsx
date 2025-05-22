
import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "@/types/inspection";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

export interface DateRangePickerProps {
  value: DateRange;
  onChange: (date: DateRange) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function DateRangePicker({ 
  value, 
  onChange, 
  disabled = false, 
  label = "Select date range",
  className 
}: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      {label && <div className="text-sm font-medium">{label}</div>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value.from && "text-muted-foreground",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value.from ? (
              value.to ? (
                <>
                  {format(value.from, "LLL dd, yyyy")} -{" "}
                  {format(value.to, "LLL dd, yyyy")}
                </>
              ) : (
                format(value.from, "LLL dd, yyyy")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        {!disabled && (
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={value.from || undefined}
              selected={{
                from: value.from || undefined,
                to: value.to || undefined,
              }}
              onSelect={(range) => {
                onChange({
                  from: range?.from || undefined,
                  to: range?.to || undefined,
                  start: range?.from || undefined,
                  end: range?.to || undefined
                });
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
