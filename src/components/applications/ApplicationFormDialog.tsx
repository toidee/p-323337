import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ApplicationType, ApplicationSubtype, ApplicationFormFields } from "@/types/inspection";

interface ApplicationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  establishmentId: string;
  establishmentName: string;
  applicationType: ApplicationType;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes

// Define form validation schema
const applicationFormSchema = z.object({
  // Basic owner information
  owner_first_name: z.string().min(1, "First name is required"),
  owner_last_name: z.string().min(1, "Last name is required"),
  owner_middle_name: z.string().optional(),
  owner_suffix: z.string().optional(),
  owner_email: z.string().email("Invalid email format"),
  owner_mobile: z.string().min(11, "Mobile number should be 11 digits").max(11),
  owner_landline: z.string().optional(),
  
  // Representative information
  rep_same_as_owner: z.boolean().default(false),
  rep_first_name: z.string().min(1, "First name is required").optional(),
  rep_last_name: z.string().min(1, "Last name is required").optional(),
  rep_middle_name: z.string().optional(),
  rep_suffix: z.string().optional(),
  rep_email: z.string().email("Invalid email format").optional(),
  rep_mobile: z.string().min(11, "Mobile number should be 11 digits").max(11).optional(),
  rep_landline: z.string().optional(),
  
  // FSEC specific fields
  contractor_name: z.string().optional(),
  
  // FSIC-Occupancy specific fields
  fsec_number: z.string().optional(),
  
  // FSIC-Business specific fields
  occupancy_permit_number: z.string().optional(),
  application_subtype: z.enum(["new", "renewal"] as const).optional(),
  
  // Document uploads - using any() for file uploads
  architectural_plans: z.any().optional().nullable(),
  civil_structural_plans: z.any().optional().nullable(),
  mechanical_plans: z.any().optional().nullable(),
  electrical_plans: z.any().optional().nullable(),
  plumbing_plans: z.any().optional().nullable(),
  sanitary_plans: z.any().optional().nullable(),
  fire_protection_plans: z.any().optional().nullable(),
  electronics_documents: z.any().optional().nullable(),
  fire_safety_compliance_report: z.any().optional().nullable(),
  cost_estimates: z.any().optional().nullable(),
  
  // Document uploads for FSIC-Occupancy
  obo_endorsement: z.any().optional().nullable(),
  certificate_of_completion: z.any().optional().nullable(),
  assessment_fee_receipt: z.any().optional().nullable(),
  as_built_plan: z.any().optional().nullable(),
  fsec_certificate: z.any().optional().nullable(),
  
  // Document uploads for FSIC-Business
  certificate_of_occupancy: z.any().optional().nullable(),
  affidavit_of_undertaking: z.any().optional().nullable(),
  bplo_assessment_receipt: z.any().optional().nullable(),
  fire_insurance_policy: z.any().optional().nullable(),
  fire_safety_maintenance_report: z.any().optional().nullable(),
  fire_safety_clearance: z.any().optional().nullable(),
  
  // Certification checkbox
  certification: z.boolean().refine(val => val === true, {
    message: "You must certify that the information is correct",
  }),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

const ApplicationFormDialog: React.FC<ApplicationFormDialogProps> = ({
  open,
  onOpenChange,
  establishmentId,
  establishmentName,
  applicationType,
}) => {
  const [formStep, setFormStep] = useState(0);
  const [applicationSubtype, setApplicationSubtype] = useState<ApplicationSubtype | null>(null);
  
  // Initialize the form
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      owner_first_name: "",
      owner_last_name: "",
      owner_middle_name: "",
      owner_suffix: "",
      owner_email: "",
      owner_mobile: "",
      owner_landline: "",
      rep_same_as_owner: false,
      rep_first_name: "",
      rep_last_name: "",
      rep_middle_name: "",
      rep_suffix: "",
      rep_email: "",
      rep_mobile: "",
      rep_landline: "",
      contractor_name: "",
      fsec_number: "",
      occupancy_permit_number: "",
      application_subtype: "new",
      certification: false,
    },
  });
  
  const { watch, setValue, handleSubmit, formState: { errors } } = form;
  
  // Watch for changes to rep_same_as_owner
  const repSameAsOwner = watch("rep_same_as_owner");
  
  // Update representative fields when rep_same_as_owner changes
  useEffect(() => {
    if (repSameAsOwner) {
      setValue("rep_first_name", watch("owner_first_name"));
      setValue("rep_last_name", watch("owner_last_name"));
      setValue("rep_middle_name", watch("owner_middle_name"));
      setValue("rep_suffix", watch("owner_suffix"));
      setValue("rep_email", watch("owner_email"));
      setValue("rep_mobile", watch("owner_mobile"));
      setValue("rep_landline", watch("owner_landline"));
    }
  }, [repSameAsOwner, setValue, watch]);
  
  // Handle form submission
  const onSubmit = (data: ApplicationFormValues) => {
    console.log("Form data:", data);
    // Here you would submit the data to your backend
    // For now, just close the form
    onOpenChange(false);
  };
  
  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof ApplicationFormValues) => {
    const file = e.target.files?.[0] || null;
    setValue(fieldName, file);
  };
  
  // Helper functions for form navigation
  const nextFormStep = () => {
    setFormStep(prev => prev + 1);
  };
  
  const prevFormStep = () => {
    setFormStep(prev => prev - 1);
  };
  
  // Get the form title based on application type
  const getFormTitle = () => {
    switch (applicationType) {
      case "fsec":
        return "FSEC Application";
      case "fsic_occupancy":
        return "FSIC-Occupancy Application";
      case "fsic_business":
        return applicationSubtype === "renewal" 
          ? "FSIC-Business Renewal Application" 
          : "FSIC-Business New Application";
      default:
        return "Application Form";
    }
  };
  
  // Render Step 1: Basic Information
  const renderBasicInfoStep = () => (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Establishment Details</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p><span className="font-medium">Name:</span> {establishmentName}</p>
          <p><span className="font-medium">Establishment ID:</span> {establishmentId}</p>
          <p><span className="font-medium">Application Type:</span> {getFormTitle()}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Owner Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="owner_first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="First Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="owner_last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Last Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="owner_middle_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Middle Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="owner_suffix"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Suffix</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., Jr., Sr., III" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="owner_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="email@example.com" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="owner_mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="09xxxxxxxxx" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="owner_landline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Landline</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="(02) xxx-xxxx" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Representative Information</h3>
        
        <FormField
          control={form.control}
          name="rep_same_as_owner"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
              <FormControl>
                <Checkbox 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Same as Owner</FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        {!repSameAsOwner && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="rep_first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name*</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="First Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rep_last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name*</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Last Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rep_middle_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Middle Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rep_suffix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suffix</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Jr., Sr., III" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rep_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="email@example.com" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rep_mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number*</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="09xxxxxxxxx" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rep_landline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Landline</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="(02) xxx-xxxx" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Application Information</h3>
        <div className="grid grid-cols-1 gap-4">
          {applicationType === "fsec" && (
            <FormField
              control={form.control}
              name="contractor_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contractor Name*</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Contractor Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          {applicationType === "fsic_occupancy" && (
            <FormField
              control={form.control}
              name="fsec_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FSEC Number*</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="FSEC Certificate Number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          {applicationType === "fsic_business" && (
            <>
              <FormField
                control={form.control}
                name="occupancy_permit_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupancy Permit Number*</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Occupancy Permit Number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="application_subtype"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Permit Status</FormLabel>
                    <Select 
                      onValueChange={(value: ApplicationSubtype) => {
                        field.onChange(value);
                        setApplicationSubtype(value);
                      }}
                      defaultValue={field.value as string}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="renewal">Renewal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
  
  // Render document uploads based on application type
  const renderDocumentUploadsStep = () => {
    // FSEC document uploads
    if (applicationType === "fsec") {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Upload Required Documents</h3>
          <p className="text-sm text-gray-500 mb-4">Please upload the following documents. Maximum file size: 20MB.</p>
          
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="architectural_plans"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Architectural Plans*</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "architectural_plans")}
                    />
                  </FormControl>
                  <FormDescription>Upload architectural plans (PDF or image)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="civil_structural_plans"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Civil/Structural Plans*</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "civil_structural_plans")}
                    />
                  </FormControl>
                  <FormDescription>Upload civil/structural plans (PDF or image)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="mechanical_plans"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mechanical Plans</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "mechanical_plans")}
                    />
                  </FormControl>
                  <FormDescription>Upload mechanical plans (PDF or image, optional)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="electrical_plans"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Electrical Plans*</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "electrical_plans")}
                    />
                  </FormControl>
                  <FormDescription>Upload electrical plans (PDF or image)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="plumbing_plans"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plumbing Plans</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "plumbing_plans")}
                    />
                  </FormControl>
                  <FormDescription>Upload plumbing plans (PDF or image, optional)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="sanitary_plans"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sanitary Plans</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "sanitary_plans")}
                    />
                  </FormControl>
                  <FormDescription>Upload sanitary plans (PDF or image, optional)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="fire_protection_plans"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fire Protection Plans*</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "fire_protection_plans")}
                    />
                  </FormControl>
                  <FormDescription>Upload fire protection plans (PDF or image)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="electronics_documents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Electronics Documents</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "electronics_documents")}
                    />
                  </FormControl>
                  <FormDescription>Upload electronics documents (PDF or image, optional)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="fire_safety_compliance_report"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fire Safety Compliance Report*</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, "fire_safety_compliance_report")}
                    />
                  </FormControl>
                  <FormDescription>Upload fire safety compliance report (PDF)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cost_estimates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost Estimates*</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, "cost_estimates")}
                    />
                  </FormControl>
                  <FormDescription>Upload cost estimates (PDF, notarized)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      );
    }
    
    // FSIC-Occupancy document uploads
    if (applicationType === "fsic_occupancy") {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Upload Required Documents</h3>
          <p className="text-sm text-gray-500 mb-4">Please upload the following documents. Maximum file size: 20MB.</p>
          
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="obo_endorsement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OBO Endorsement*</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, "obo_endorsement")}
                    />
                  </FormControl>
                  <FormDescription>Upload OBO endorsement (PDF)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="certificate_of_completion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate of Completion*</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, "certificate_of_completion")}
                    />
                  </FormControl>
                  <FormDescription>Upload certificate of completion (PDF)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="assessment_fee_receipt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assessment Fee Receipt*</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "assessment_fee_receipt")}
                    />
                  </FormControl>
                  <FormDescription>Upload assessment fee receipt (PDF or image)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="as_built_plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>As-Built Plan*</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, "as_built_plan")}
                    />
                  </FormControl>
                  <FormDescription>Upload as-built plan (PDF)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="fire_safety_compliance_report"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fire Safety Compliance Report*</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, "fire_safety_compliance_report")}
                    />
                  </FormControl>
                  <FormDescription>Upload fire safety compliance report (PDF)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="fsec_certificate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FSEC Certificate*</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, "fsec_certificate")}
                    />
                  </FormControl>
                  <FormDescription>Upload FSEC certificate (PDF)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      );
    }
    
    // FSIC-Business document uploads (both new and renewal)
    if (applicationType === "fsic_business") {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Upload Required Documents</h3>
          <p className="text-sm text-gray-500 mb-4">Please upload the following documents. Maximum file size: 20MB.</p>
          
          <div className="grid grid-cols-1 gap-4">
            {applicationSubtype === "new" ? (
              <>
                <FormField
                  control={form.control}
                  name="certificate_of_occupancy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate of Occupancy*</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, "certificate_of_occupancy")}
                        />
                      </FormControl>
                      <FormDescription>Upload certificate of occupancy (PDF)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="affidavit_of_undertaking"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Affidavit of Undertaking*</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, "affidavit_of_undertaking")}
                        />
                      </FormControl>
                      <FormDescription>Upload affidavit of undertaking (PDF)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bplo_assessment_receipt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BPLO Assessment Receipt*</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, "bplo_assessment_receipt")}
                        />
                      </FormControl>
                      <FormDescription>Upload BPLO assessment receipt (PDF or image)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fire_insurance_policy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fire Insurance Policy</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, "fire_insurance_policy")}
                        />
                      </FormControl>
                      <FormDescription>Upload fire insurance policy (PDF, optional)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="bplo_assessment_receipt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BPLO Assessment Receipt*</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, "bplo_assessment_receipt")}
                        />
                      </FormControl>
                      <FormDescription>Upload BPLO assessment receipt (PDF or image)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fire_safety_maintenance_report"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fire Safety Maintenance Report*</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, "fire_safety_maintenance_report")}
                        />
                      </FormControl>
                      <FormDescription>Upload fire safety maintenance report (PDF)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fire_insurance_policy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fire Insurance Policy</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, "fire_insurance_policy")}
                        />
                      </FormControl>
                      <FormDescription>Upload fire insurance policy (PDF, optional)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fire_safety_clearance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fire Safety Clearance for Welding/Cutting</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, "fire_safety_clearance")}
                        />
                      </FormControl>
                      <FormDescription>Upload fire safety clearance (PDF, optional)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
        </div>
      );
    }
    
    // Default empty state
    return <div>No documents required for this application type.</div>;
  };
  
  // Render Step 3: Review & Submit
  const renderReviewSubmitStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Review & Submit</h3>
      <p className="text-sm text-gray-500 mb-4">Please review your application before submission.</p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-4">
        <h4 className="font-medium mb-2">Application Details</h4>
        <p><span className="font-medium">Establishment:</span> {establishmentName}</p>
        <p><span className="font-medium">Application Type:</span> {getFormTitle()}</p>
      </div>
      
      <FormField
        control={form.control}
        name="certification"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
            <FormControl>
              <Checkbox 
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>I certify that the information provided is correct and complete</FormLabel>
              <FormDescription>
                By checking this box, you confirm that all information and documents provided are true and correct.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      
      {errors.certification && (
        <p className="text-red-500 text-sm">{errors.certification.message}</p>
      )}
    </div>
  );
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getFormTitle()}</DialogTitle>
          <DialogDescription>
            Complete the form below to submit your application
          </DialogDescription>
        </DialogHeader>
        
        {/* Progress bar */}
        <div className="relative pt-1 mb-4">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-vfire-orange text-white">
                Step {formStep + 1} of 3
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-vfire-orange">
                {Math.round(((formStep + 1) / 3) * 100)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${((formStep + 1) / 3) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-vfire-orange"
            ></div>
          </div>
        </div>
        
        {/* Wrap the entire form content in Form component which is FormProvider */}
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {formStep === 0 && renderBasicInfoStep()}
            {formStep === 1 && renderDocumentUploadsStep()}
            {formStep === 2 && renderReviewSubmitStep()}
            
            <DialogFooter className="flex justify-between pt-4">
              {formStep > 0 ? (
                <Button type="button" variant="outline" onClick={prevFormStep}>
                  Back
                </Button>
              ) : (
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
              )}
              
              {formStep < 2 ? (
                <Button type="button" className="bg-vfire-orange hover:bg-vfire-orange-600" onClick={nextFormStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" className="bg-vfire-orange hover:bg-vfire-orange-600">
                  Submit Application
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationFormDialog;
