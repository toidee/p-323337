
export type ApplicationType = "fsec" | "fsic_occupancy" | "fsic_business";
export type ApplicationSubtype = "new" | "renewal";

// Update InspectionStatus to be a proper union type of all possible status values
export type InspectionStatus = "pending" | "scheduled" | "completed" | "failed" | "cancelled" | "inspected" | "approved" | "rejected";

// Updated DateRange interface to include both property naming patterns
export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
  start?: Date | undefined; // Added for compatibility with existing code
  end?: Date | undefined; // Added for compatibility with existing code
}

export interface Event {
  id: string;
  title: string;
  status: InspectionStatus; // Fix this to use the proper type
  start: Date;
  end: Date;
  establishment_id: string;
  inspector_id?: string;
  application_type: string;
  allDay: boolean;
}

export interface Inspection {
  id: string;
  establishment_id: string;
  establishment_name: string;
  application_type: string;
  inspector_id?: string;
  inspector_name?: string;
  scheduled_date_time?: string;
  status: string;
  checklist_type?: string;
  created_at: string;
  updated_at: string;
}

export interface ApplicationFormFields {
  // Basic owner information
  owner_first_name: string;
  owner_last_name: string;
  owner_middle_name: string;
  owner_suffix: string;
  owner_email: string;
  owner_mobile: string;
  owner_landline: string;
  
  // Representative information
  rep_same_as_owner: boolean;
  rep_first_name: string;
  rep_last_name: string;
  rep_middle_name: string;
  rep_suffix: string;
  rep_email: string;
  rep_mobile: string;
  rep_landline: string;
  
  // FSEC specific fields
  contractor_name: string;
  
  // FSIC-Occupancy specific fields
  fsec_number: string;
  
  // FSIC-Business specific fields
  occupancy_permit_number: string;
  application_subtype: ApplicationSubtype;
  
  // Document uploads for FSEC
  architectural_plans: File | null;
  civil_structural_plans: File | null;
  mechanical_plans: File | null;
  electrical_plans: File | null;
  plumbing_plans: File | null;
  sanitary_plans: File | null;
  fire_protection_plans: File | null;
  electronics_documents: File | null;
  fire_safety_compliance_report: File | null;
  cost_estimates: File | null;
  
  // Document uploads for FSIC-Occupancy
  obo_endorsement: File | null;
  certificate_of_completion: File | null;
  assessment_fee_receipt: File | null;
  as_built_plan: File | null;
  fsec_certificate: File | null;
  
  // Document uploads for FSIC-Business
  certificate_of_occupancy: File | null;
  affidavit_of_undertaking: File | null;
  bplo_assessment_receipt: File | null;
  fire_insurance_policy: File | null;
  fire_safety_maintenance_report: File | null;
  fire_safety_clearance: File | null;
  
  // Certification checkbox
  certification: boolean;
}
