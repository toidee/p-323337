import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

// Form schema
const formSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  dtiCertificateNo: z.string().min(6, "DTI Certificate Number must be at least 6 characters"),
  businessAddress: z.string().min(10, "Business address must be at least 10 characters"),
  businessType: z.string().min(2, "Please select a business type"),
  operatingHours: z.string().min(2, "Please enter operating hours"),
  contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
});

type FormValues = z.infer<typeof formSchema>;

interface EstablishmentRegistrationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    businessName?: string;
    dtiCertificateNo?: string;
  };
}

const EstablishmentRegistrationForm = ({
  open,
  onOpenChange,
  initialData = {}
}: EstablishmentRegistrationFormProps) => {
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: initialData.businessName || "",
      dtiCertificateNo: initialData.dtiCertificateNo || "",
      businessAddress: "",
      businessType: "",
      operatingHours: "",
      contactNumber: "",
    },
    mode: "onChange"
  });
  
  const isDirty = form.formState.isDirty;
  
  // Handle dialog close with unsaved changes
  const handleOpenChange = (open: boolean) => {
    if (!open && isDirty) {
      // Show confirmation dialog if form is dirty
      setShowExitConfirmation(true);
    } else {
      // Otherwise just close normally
      onOpenChange(open);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would make an API call
      console.log("Form values:", values);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Close the form
      onOpenChange(false);
      
      // Reset the form
      form.reset();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-3xl w-[90%] h-[90vh] max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Register New Establishment</DialogTitle>
            <DialogDescription>
              Please provide the details of your establishment for registration.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter business name" {...field} />
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
                      <FormLabel>DTI Certificate No.</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter DTI Certificate Number" {...field} />
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
                      <FormLabel>Business Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a business type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="service">Service</SelectItem>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="operatingHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Operating Hours</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 9:00 AM - 6:00 PM, Monday to Friday" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 09123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="col-span-1 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="businessAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter complete business address" 
                            className="resize-none min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-amber-700 text-sm">
                  <strong>Note:</strong> After registering your establishment, you'll need to complete the application 
                  process for fire safety inspections. This will include submitting additional documents and 
                  scheduling an inspection date.
                </p>
              </div>
              
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600"
                  disabled={isSubmitting || !form.formState.isValid}
                >
                  {isSubmitting ? "Registering..." : "Register Establishment"}
                </Button>
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
              You have unsaved changes in your establishment registration form. Are you sure you want to discard these changes?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Editing</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                setShowExitConfirmation(false);
                form.reset();
                onOpenChange(false);
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
