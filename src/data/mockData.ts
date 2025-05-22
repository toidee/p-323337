
import { User } from "@/types/auth";
import { Inspection, Event, InspectionStatus } from "@/types/inspection";

// Empty mock data arrays
export const inspectors: User[] = [];
export const owners: User[] = [];
export const admins: User[] = [];
export const users: User[] = [];
export const inspections: Inspection[] = [];
export const events: Event[] = [];

// Empty dashboard stats
export const adminDashboardStats = {
  users: {
    total: 0,
    owners: 0,
    inspectors: 0,
    admins: 0
  },
  establishments: {
    total: 0,
    byType: {
      industrial: 0,
      commercial: 0,
      residential: 0
    },
    byStatus: {
      unregistered: 0,
      preRegistered: 0,
      registered: 0
    }
  },
  applications: {
    total: 0,
    byType: {
      fsec: 0,
      fsic_occupancy: 0,
      fsic_business: 0
    },
    statuses: {
      fsec: {
        pending: 0,
        approved: 0,
        rejected: 0
      },
      fsic_occupancy: {
        pending: 0,
        approved: 0,
        rejected: 0
      },
      fsic_business: {
        pending: 0,
        approved: 0,
        rejected: 0
      }
    }
  },
  inspections: {
    total: 0,
    byType: {
      fsic_occupancy: 0,
      fsic_business: 0
    },
    byStatus: {
      pending: 0,
      scheduled: 0,
      inspected: 0,
      approved: 0,
      rejected: 0,
      cancelled: 0,
    }
  }
};

export const inspectorDashboardStats = {
  assigned: {
    pending: 0,
    scheduled: 0,
    inspected: 0,
    approved: 0,
    rejected: 0,
    cancelled: 0,
    total: 0
  },
  today: [],
  weekly: {
    scheduled: 0,
    completed: 0
  }
};

export const ownerDashboardStats = {
  establishments: {
    total: 0,
    registered: 0,
    pending: 0,
  },
  applications: {
    total: 0,
    approved: 0,
    pending: 0,
  },
  inspections: {
    total: 0,
    scheduled: 0,
    completed: 0,
  },
  compliance: 0
};

export const fsecapplicationStatusData = {
  pending: 0,
  approved: 0,
  rejected: 0,
};

export const fsicoccupancyapplicationStatusData = {
  pending: 0,
  approved: 0,
  rejected: 0,
};

export const fsicbusinessapplicationStatusData = {
  pending: 0,
  approved: 0,
  rejected: 0,
};
