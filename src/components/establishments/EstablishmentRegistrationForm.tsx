
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useForm, useWatch, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUpload } from "@/components/ui/file-upload";
import { MultiStepProgress } from "@/components/ui/multi-step-progress";
import { BARANGAY_OPTIONS, BUILDING_TYPES, OCCUPANCY_TYPES, NAME_SUFFIX_OPTIONS, ACTIVE_STATUS_OPTIONS } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';

// Step 1: Establishment Information
const step1Schema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  dtiCertificateNo: z.string().min(6, "DTI Certificate Number must be at least 6 digits")
    .max(9, "DTI Certificate Number must not exceed 9 digits"),
  businessType: z.string().min(1, "Please select a business type"),
  occupancyType: z.string().min(1, "Please select an occupancy type"),
  numStoreys: z.coerce.number().int().positive("Must be at least 1"),
  totalFloorArea: z.coerce.number().nonnegative("Must be a positive number"),
  numOccupants: z.coerce.number().nonnegative("Must be a positive number"),
  activeStatus: z.string().default("Active"),
  dtiCertificateFile: z.any()
    .refine(file => file instanceof File || file === null, "Please upload a valid file")
    .refine(file => file === null || file.size <= 20 * 1024 * 1024, "File size must be less than 20MB")
});

// Step 2: Address Information
const step2Schema = z.object({
  street: z.string().min(3, "Street name must be at least 3 characters"),
  barangay: z.string().min(1, "Please select a barangay"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  region: z.string().min(1, "Region is required"),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional()
});

// Step 3: Owner/Representative Information
const step3Schema = z.object({
  ownerFirstName: z.string().min(2, "First name must be at least 2 characters"),
  ownerLastName: z.string().min(2, "Last name must be at least 2 characters"),
  ownerMiddleName: z.string().optional(),
  ownerSuffix: z.string().optional(),
  ownerEmail: z.string().email("Please enter a valid email address"),
  ownerMobile: z.string()
    .regex(/^09\d{9}$/, "Mobile number must be in format 09xxxxxxxxx"),
  ownerLandline: z.string().optional(),
  sameAsOwner: z.boolean().default(false),
  repFirstName: z.string().min(2, "First name must be at least 2 characters").optional()
    .or(z.literal('')),
  repLastName: z.string().min(2, "Last name must be at least 2 characters").optional()
    .or(z.literal('')),
  repMiddleName: z.string().optional(),
  repSuffix: z.string().optional(),
  repEmail: z.string().email("Please enter a valid email address").optional()
    .or(z.literal('')),
  repMobile: z.string()
    .regex(/^09\d{9}$/, "Mobile number must be in format 09xxxxxxxxx").optional()
    .or(z.literal('')),
  repLandline: z.string().optional()
}).refine(data => {
  // If sameAsOwner is false, validate rep fields
  if (!data.sameAsOwner) {
    return !!data.repFirstName && 
      !!data.repLastName && 
      !!data.repEmail && 
      !!data.repMobile;
  }
  return true;
}, {
  message: "Representative information is required when not same as owner",
  path: ["repFirstName"]
});

// Step 4: Certification
const step4Schema = z.object({
  certify: z.boolean().refine(val => val === true, {
    message: "You must certify that the information is correct"
  })
});

// Combined schema for all steps
const formSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema);

// Main component types
type FormValues = z.infer<typeof formSchema>;

interface EstablishmentRegistrationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    businessName?: string;
    dtiCertificateNo?: string;
  };
  onSuccess?: (establishmentId: string) => void;
}

const EstablishmentRegistrationForm = ({
  open,
  onOpenChange,
  initialData = {},
  onSuccess
}: EstablishmentRegistrationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Initialize form with all fields from all steps
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Step 1
      businessName: initialData.businessName || "",
      dtiCertificateNo: initialData.dtiCertificateNo || "",
      businessType: "",
      occupancyType: "",
      numStoreys: 1,
      totalFloorArea: 0,
      numOccupants: 0,
      activeStatus: "Active",
      dtiCertificateFile: null,
      
      // Step 2
      street: "",
      barangay: "",
      city: "Valenzuela",
      province: "Metro Manila",
      region: "NCR",
      latitude: undefined,
      longitude: undefined,
      
      // Step 3
      ownerFirstName: "",
      ownerLastName: "",
      ownerMiddleName: "",
      ownerSuffix: "",
      ownerEmail: "",
      ownerMobile: "",
      ownerLandline: "",
      sameAsOwner: false,
      repFirstName: "",
      repLastName: "",
      repMiddleName: "",
      repSuffix: "",
      repEmail: "",
      repMobile: "",
      repLandline: "",
      
      // Step 4
      certify: false
    },
    mode: "onChange"
  });
  
  const isDirty = form.formState.isDirty;
  
  // Watch for sameAsOwner changes to update representative fields
  const sameAsOwner = useWatch({
    control: form.control,
    name: "sameAsOwner",
  });
  
  // Update representative fields when sameAsOwner changes
  useEffect(() => {
    if (sameAsOwner) {
      // Copy owner info to representative fields
      const ownerFirstName = form.getValues("ownerFirstName");
      const ownerLastName = form.getValues("ownerLastName");
      const ownerMiddleName = form.getValues("ownerMiddleName");
      const ownerSuffix = form.getValues("ownerSuffix");
      const ownerEmail = form.getValues("ownerEmail");
      const ownerMobile = form.getValues("ownerMobile");
      const ownerLandline = form.getValues("ownerLandline");
      
      form.setValue("repFirstName", ownerFirstName);
      form.setValue("repLastName", ownerLastName);
      form.setValue("repMiddleName", ownerMiddleName);
      form.setValue("repSuffix", ownerSuffix);
      form.setValue("repEmail", ownerEmail);
      form.setValue("repMobile", ownerMobile);
      form.setValue("repLandline", ownerLandline);
    }
  }, [sameAsOwner, form]);
  
  // Handle dialog close with unsaved changes
  const handleOpenChange = (open: boolean) => {
    if (!open && isDirty && currentStep !== 4) {
      // Show confirmation dialog if form is dirty
      setShowExitConfirmation(true);
    } else {
      // Otherwise just close normally
      onOpenChange(open);
      // Reset step to 1 when closing
      setCurrentStep(1);
    }
  };

  // Validate current step and move to next if valid
  const handleNext = async () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        isValid = await form.trigger([
          "businessName", 
          "dtiCertificateNo", 
          "businessType",
          "occupancyType",
          "numStoreys",
          "totalFloorArea",
          "numOccupants",
          "activeStatus",
          "dtiCertificateFile"
        ]);
        
        if (isValid) {
          // Check if business name is unique
          const { data: nameCheck } = await supabase
            .from('establishments')
            .select('id')
            .eq('name', form.getValues("businessName"))
            .maybeSingle();
            
          // Check if DTI number is unique
          const { data: dtiCheck } = await supabase
            .from('establishments')
            .select('id')
            .eq('dti_number', form.getValues("dtiCertificateNo"))
            .maybeSingle();
            
          if (nameCheck && (!initialData.businessName || 
              (initialData.businessName && initialData.businessName !== form.getValues("businessName")))) {
            form.setError("businessName", { 
              type: "manual", 
              message: "This business name is already registered" 
            });
            return;
          }
            
          if (dtiCheck && (!initialData.dtiCertificateNo || 
              (initialData.dtiCertificateNo && initialData.dtiCertificateNo !== form.getValues("dtiCertificateNo")))) {
            form.setError("dtiCertificateNo", { 
              type: "manual", 
              message: "This DTI Certificate Number is already registered" 
            });
            return;
          }
        }
        break;
        
      case 2:
        isValid = await form.trigger([
          "street", 
          "barangay", 
          "city",
          "province",
          "region"
        ]);
        break;
        
      case 3:
        isValid = await form.trigger([
          "ownerFirstName", 
          "ownerLastName", 
          "ownerEmail",
          "ownerMobile"
        ]);
        
        if (!sameAsOwner) {
          isValid = isValid && await form.trigger([
            "repFirstName", 
            "repLastName", 
            "repEmail",
            "repMobile"
          ]);
        }
        break;
        
      default:
        isValid = true;
    }
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };
  
  // Go back to previous step
  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    if (!user) {
      toast({
        title: "Authentication error",
        description: "You must be logged in to register an establishment",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare address
      const formattedAddress = `${values.street}, ${values.barangay}, ${values.city}, ${values.province}`;
      
      // Create form_data JSON object with all detailed information
      const formData = {
        establishment: {
          name: values.businessName,
          type: values.businessType,
          dti_number: values.dtiCertificateNo,
          occupancy_type: values.occupancyType,
          num_storeys: values.numStoreys,
          total_floor_area: values.totalFloorArea,
          num_occupants: values.numOccupants,
          active_status: values.activeStatus,
          registration_date: new Date().toISOString(),
        },
        address: {
          street: values.street,
          barangay: values.barangay,
          city: values.city,
          province: values.province,
          region: values.region,
          latitude: values.latitude,
          longitude: values.longitude,
        },
        owner: {
          first_name: values.ownerFirstName,
          last_name: values.ownerLastName,
          middle_name: values.ownerMiddleName,
          suffix: values.ownerSuffix,
          email: values.ownerEmail,
          mobile: values.ownerMobile,
          landline: values.ownerLandline,
        },
        representative: {
          same_as_owner: values.sameAsOwner,
          first_name: values.repFirstName,
          last_name: values.repLastName,
          middle_name: values.repMiddleName,
          suffix: values.repSuffix,
          email: values.repEmail,
          mobile: values.repMobile,
          landline: values.repLandline,
        }
      };
      
      const establishmentId = uuidv4(); // Generate a UUID for the establishment
      
      // Insert establishment record
      const { error: establishmentError } = await supabase
        .from('establishments')
        .insert({
          id: establishmentId,
          name: values.businessName,
          dti_number: values.dtiCertificateNo,
          type: values.businessType,
          occupancy_type: values.occupancyType,
          num_storeys: values.numStoreys,
          total_floor_area: values.totalFloorArea,
          num_occupants: values.numOccupants,
          active_status: values.activeStatus,
          address: formattedAddress,
          owner_id: user.id,
          status: 'pending',
          form_data: formData,
          date_registered: new Date().toISOString()
        });
        
      if (establishmentError) throw establishmentError;
      
      // Upload DTI certificate if provided
      if (values.dtiCertificateFile) {
        // Get file extension
        const fileExt = values.dtiCertificateFile.name.split('.').pop();
        const fileName = `${user.id}/${establishmentId}/${Date.now()}_dti_certificate.${fileExt}`;
        
        const { error: uploadError } = await supabase
          .storage
          .from('establishment_documents')
          .upload(fileName, values.dtiCertificateFile);
          
        if (uploadError) {
          console.error("Error uploading file:", uploadError);
          // Don't throw error, as establishment is already created
        }
      }
      
      // Show success message
      toast({
        title: "Registration successful",
        description: "Your establishment has been registered and is pending approval",
        variant: "default"
      });
      
      // Close the form
      onOpenChange(false);
      
      // Reset the form state and step
      form.reset();
      setCurrentStep(1);
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(establishmentId);
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "There was an error processing your request",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render form fields based on current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };
  
  // Render Step 1: Establishment Information
  const renderStep1 = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Building Name <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter building name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="dtiCertificateNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>DTI Certificate No. <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter DTI Certificate Number" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Building Type <span className="text-red-500">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a building type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BUILDING_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="occupancyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupancy Type <span className="text-red-500">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an occupancy type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {OCCUPANCY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="numStoreys"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Storeys <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="totalFloorArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Floor Area (m²) <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="numOccupants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Occupants <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="activeStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status <span className="text-red-500">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ACTIVE_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="mt-6">
        <Controller
          control={form.control}
          name="dtiCertificateFile"
          render={({ field, fieldState }) => (
            <FileUpload
              id="dti-certificate"
              name="dtiCertificateFile"
              label="DTI Certificate"
              accept=".pdf,.jpg,.jpeg,.png"
              maxSize={20}
              onFileChange={(file) => field.onChange(file)}
              error={fieldState.error?.message}
              required={true}
              helperText="Upload your DTI Certificate (PDF or image format, max 20MB)"
            />
          )}
        />
      </div>
    </>
  );
  
  // Render Step 2: Address Information
  const renderStep2 = () => (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="street"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Street Name <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="Enter street name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="barangay"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Barangay <span className="text-red-500">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a barangay" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[200px]">
                {BARANGAY_OPTIONS.map((barangay) => (
                  <SelectItem key={barangay} value={barangay}>{barangay}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="any" 
                  placeholder="Set on map"
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="any" 
                  placeholder="Set on map"
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="bg-gray-100 p-4 rounded-md mt-4">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> Map selection for precise location coordinates will be available in a future update.
        </p>
      </div>
    </div>
  );
  
  // Render Step 3: Owner/Representative Information
  const renderStep3 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Owner Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="ownerFirstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="ownerLastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="ownerMiddleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter middle name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="ownerSuffix"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Suffix</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select suffix" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {NAME_SUFFIX_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="ownerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="ownerMobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="09xxxxxxxxx" {...field} />
                </FormControl>
                <FormDescription>
                  Format: 09xxxxxxxxx
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="ownerLandline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Landline</FormLabel>
                <FormControl>
                  <Input placeholder="(02) xxx-xxxx" {...field} />
                </FormControl>
                <FormDescription>
                  Format: (02) xxx-xxxx
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Representative Information</h3>
          <FormField
            control={form.control}
            name="sameAsOwner"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
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
        </div>
        
        {!sameAsOwner && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="repFirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="repLastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Enter last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="repMiddleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter middle name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="repSuffix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suffix</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select suffix" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {NAME_SUFFIX_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="repEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="repMobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="09xxxxxxxxx" {...field} />
                  </FormControl>
                  <FormDescription>
                    Format: 09xxxxxxxxx
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="repLandline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Landline</FormLabel>
                  <FormControl>
                    <Input placeholder="(02) xxx-xxxx" {...field} />
                  </FormControl>
                  <FormDescription>
                    Format: (02) xxx-xxxx
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
  
  // Render Step 4: Summary & Certification
  const renderStep4 = () => {
    const values = form.getValues();
    
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Establishment Information</h3>
          <div className="bg-gray-50 p-4 rounded-md space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Building Name</p>
                <p className="font-poppins text-sm">{values.businessName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">DTI Certificate No.</p>
                <p className="font-poppins text-sm">{values.dtiCertificateNo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Building Type</p>
                <p className="font-poppins text-sm">{values.businessType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Occupancy Type</p>
                <p className="font-poppins text-sm">{values.occupancyType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Number of Storeys</p>
                <p className="font-poppins text-sm">{values.numStoreys}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Floor Area</p>
                <p className="font-poppins text-sm">{values.totalFloorArea} m²</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Number of Occupants</p>
                <p className="font-poppins text-sm">{values.numOccupants}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="font-poppins text-sm">{values.activeStatus}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">DTI Certificate</p>
                <p className="font-poppins text-sm">
                  {values.dtiCertificateFile ? values.dtiCertificateFile.name : "Not uploaded"}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Address Information</h3>
          <div className="bg-gray-50 p-4 rounded-md space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Complete Address</p>
                <p className="font-poppins text-sm">
                  {values.street}, {values.barangay}, {values.city}, {values.province}, {values.region}
                </p>
              </div>
              {(values.latitude && values.longitude) && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Map Coordinates</p>
                  <p className="font-poppins text-sm">
                    Latitude: {values.latitude}, Longitude: {values.longitude}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Owner Information</h3>
          <div className="bg-gray-50 p-4 rounded-md space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="font-poppins text-sm">
                  {values.ownerFirstName} {values.ownerMiddleName && `${values.ownerMiddleName} `}
                  {values.ownerLastName} {values.ownerSuffix && values.ownerSuffix}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="font-poppins text-sm">{values.ownerEmail}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Mobile</p>
                <p className="font-poppins text-sm">{values.ownerMobile}</p>
              </div>
              {values.ownerLandline && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Landline</p>
                  <p className="font-poppins text-sm">{values.ownerLandline}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Representative Information</h3>
          <div className="bg-gray-50 p-4 rounded-md space-y-3">
            {values.sameAsOwner ? (
              <p className="font-poppins text-sm italic">Same as Owner</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="font-poppins text-sm">
                    {values.repFirstName} {values.repMiddleName && `${values.repMiddleName} `}
                    {values.repLastName} {values.repSuffix && values.repSuffix}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="font-poppins text-sm">{values.repEmail}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Mobile</p>
                  <p className="font-poppins text-sm">{values.repMobile}</p>
                </div>
                {values.repLandline && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Landline</p>
                    <p className="font-poppins text-sm">{values.repLandline}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t pt-6">
          <FormField
            control={form.control}
            name="certify"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-medium text-sm">
                    I certify that all information provided is complete and accurate to the best of my knowledge.
                    <span className="text-red-500"> *</span>
                  </FormLabel>
                  <FormDescription>
                    By checking this box, you acknowledge that providing false information may result in penalties and rejection of your application.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    );
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-3xl w-[90%] h-[90vh] max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Establishment Registration</DialogTitle>
            <DialogDescription>
              Please complete all required information to register your establishment.
            </DialogDescription>
          </DialogHeader>
          
          <MultiStepProgress 
            currentStep={currentStep} 
            totalSteps={4} 
            className="my-4" 
          />
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
              {renderStep()}
              
              <DialogFooter>
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="mr-auto"
                  >
                    Back
                  </Button>
                )}
                
                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600"
                    disabled={isSubmitting || !form.getValues().certify}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Registration"}
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitConfirmation} onOpenChange={setShowExitConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes in your registration form. Are you sure you want to discard these changes?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Editing</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                setShowExitConfirmation(false);
                onOpenChange(false);
                setCurrentStep(1);
                form.reset();
              }}
            >
              Discard Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EstablishmentRegistrationForm;
