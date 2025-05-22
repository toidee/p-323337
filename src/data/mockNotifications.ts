
import { UserRole } from "@/types/auth";

export interface Notification {
  id: string;
  user_id?: string;
  title: string;
  message: string;
  type: "application" | "inspection" | "system";
  status: "unread" | "read";
  created_at: string;
  role: UserRole;
}

export const mockNotifications: Notification[] = [
  {
    id: "1",
    user_id: "4", // Jei Ram (owner)
    title: "Application Approved",
    message: "Your FSEC application for Happy Toy Shop has been approved.",
    type: "application",
    status: "unread",
    created_at: "2025-05-20T15:30:00",
    role: "owner"
  },
  {
    id: "2",
    user_id: "4", // Jei Ram (owner)
    title: "Inspection Scheduled",
    message: "An inspection for Happy Toy Shop has been scheduled for May 25, 2025 at 10:00 AM.",
    type: "inspection",
    status: "unread",
    created_at: "2025-05-20T14:45:00",
    role: "owner"
  },
  {
    id: "3",
    user_id: "4", // Jei Ram (owner)
    title: "Application Submitted",
    message: "Your FSIC-Business application for Main Street Store has been submitted successfully.",
    type: "application",
    status: "read",
    created_at: "2025-05-19T09:15:00",
    role: "owner"
  },
  {
    id: "4",
    user_id: "5", // Lisa Reyes (owner)
    title: "Certificate Issued",
    message: "Your FSIC-Occupancy certificate for Grocery Express has been issued.",
    type: "application",
    status: "unread",
    created_at: "2025-05-18T11:20:00",
    role: "owner"
  },
  {
    id: "5",
    user_id: "5", // Lisa Reyes (owner)
    title: "Registration Approved",
    message: "Your establishment registration for New Branch Location has been approved.",
    type: "system",
    status: "read",
    created_at: "2025-05-17T16:30:00",
    role: "owner"
  },
  {
    id: "6",
    user_id: "6", // Vfire Admin (admin)
    title: "New User Registered",
    message: "A new user, Roberto Tan, has registered as an establishment owner.",
    type: "system",
    status: "unread",
    created_at: "2025-05-17T10:10:00",
    role: "admin"
  },
  {
    id: "7",
    user_id: "1", // Sandara Dizon (inspector)
    title: "Inspection Assigned",
    message: "You have been assigned to inspect Happy Toy Shop on May 25, 2025 at 10:00 AM.",
    type: "inspection",
    status: "unread",
    created_at: "2025-05-16T14:20:00",
    role: "inspector"
  },
  {
    id: "8",
    user_id: "2", // Juan Cruz (inspector)
    title: "Inspection Review Required",
    message: "Your inspection report for Main Street Store requires administrative review.",
    type: "inspection",
    status: "unread",
    created_at: "2025-05-15T09:45:00",
    role: "inspector"
  },
  {
    id: "9",
    user_id: "3", // Maria Santos (inspector)
    title: "Duty Status Reminder",
    message: "Your availability period ends tomorrow. Please update your duty status if needed.",
    type: "system",
    status: "read",
    created_at: "2025-05-14T16:00:00",
    role: "inspector"
  },
  {
    id: "10",
    user_id: "6", // Vfire Admin (admin)
    title: "System Maintenance",
    message: "The system will undergo maintenance on May 30, 2025 from 10:00 PM to 12:00 AM.",
    type: "system",
    status: "read",
    created_at: "2025-05-13T11:30:00",
    role: "admin"
  }
];
