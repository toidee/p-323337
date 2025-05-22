
import { useState } from "react";
import InspectorLayout from "@/components/layouts/InspectorLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

// Mock data for inspections
const mockInspections = [
  {
    id: "1",
    establishmentName: "James Shop",
    applicationType: "FSIC-Business",
    date: "2025-05-25T10:00:00",
    status: "Scheduled"
  },
  {
    id: "2",
    establishmentName: "Registered Est.",
    applicationType: "FSIC-Occupancy",
    date: "2025-05-15T14:30:00",
    status: "Approved"
  },
];

const ChecklistDialog = ({ establishmentName, applicationType, onComplete }: { establishmentName: string, applicationType: string, onComplete: () => void }) => {
  const [open, setOpen] = useState(false);
  const [checklistType, setChecklistType] = useState<string | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inspection checklist submitted successfully");
    setOpen(false);
    onComplete();
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-vfire-orange hover:bg-vfire-orange-600 text-xs">
          Conduct Inspection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Inspection Checklist</DialogTitle>
            <DialogDescription>
              Complete the checklist for {establishmentName} - {applicationType}
            </DialogDescription>
          </DialogHeader>
          
          {!checklistType ? (
            <div className="py-6">
              <h4 className="text-sm font-medium mb-4">Select Checklist Type</h4>
              <div className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal"
                    onClick={() => setChecklistType("small")}
                  >
                    <span>Small Business Checklist</span>
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal"
                    onClick={() => setChecklistType("large")}
                  >
                    <span>Large Business Checklist</span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4">
              <h4 className="text-sm font-medium mb-4">
                {checklistType === "small" ? "Small Business Checklist" : "Large Business Checklist"}
              </h4>
              
              <div className="space-y-4">
                <div>
                  <Label>Fire Exits</Label>
                  <RadioGroup defaultValue="compliant" className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="compliant" id="exits-compliant" />
                      <Label htmlFor="exits-compliant">Compliant</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-compliant" id="exits-non-compliant" />
                      <Label htmlFor="exits-non-compliant">Non-compliant</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="na" id="exits-na" />
                      <Label htmlFor="exits-na">N/A</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label>Fire Alarms</Label>
                  <RadioGroup defaultValue="compliant" className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="compliant" id="alarms-compliant" />
                      <Label htmlFor="alarms-compliant">Compliant</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-compliant" id="alarms-non-compliant" />
                      <Label htmlFor="alarms-non-compliant">Non-compliant</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="na" id="alarms-na" />
                      <Label htmlFor="alarms-na">N/A</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label>Sprinklers</Label>
                  <RadioGroup defaultValue="compliant" className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="compliant" id="sprinklers-compliant" />
                      <Label htmlFor="sprinklers-compliant">Compliant</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-compliant" id="sprinklers-non-compliant" />
                      <Label htmlFor="sprinklers-non-compliant">Non-compliant</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="na" id="sprinklers-na" />
                      <Label htmlFor="sprinklers-na">N/A</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {checklistType === "large" && (
                  <>
                    <div>
                      <Label>Emergency Lighting</Label>
                      <RadioGroup defaultValue="compliant" className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="compliant" id="lighting-compliant" />
                          <Label htmlFor="lighting-compliant">Compliant</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="non-compliant" id="lighting-non-compliant" />
                          <Label htmlFor="lighting-non-compliant">Non-compliant</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="na" id="lighting-na" />
                          <Label htmlFor="lighting-na">N/A</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label>Fire Suppression System</Label>
                      <RadioGroup defaultValue="compliant" className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="compliant" id="suppression-compliant" />
                          <Label htmlFor="suppression-compliant">Compliant</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="non-compliant" id="suppression-non-compliant" />
                          <Label htmlFor="suppression-non-compliant">Non-compliant</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="na" id="suppression-na" />
                          <Label htmlFor="suppression-na">N/A</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </>
                )}
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter any additional notes about the inspection"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="photo-upload">Upload Photos</Label>
                  <div className="mt-2">
                    <input type="file" id="photo-upload" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-vfire-orange-100 file:text-vfire-orange hover:file:bg-vfire-orange-200" multiple />
                    <p className="text-xs text-gray-500 mt-1">Upload photos of the establishment (max 20MB)</p>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="report-upload">Upload Inspection Report</Label>
                  <div className="mt-2">
                    <input type="file" id="report-upload" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-vfire-orange-100 file:text-vfire-orange hover:file:bg-vfire-orange-200" />
                    <p className="text-xs text-gray-500 mt-1">Upload PDF report (max 20MB)</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="mt-6">
            {checklistType ? (
              <>
                <Button type="button" variant="outline" onClick={() => setChecklistType(null)}>
                  Back
                </Button>
                <Button type="submit" className="bg-vfire-orange hover:bg-vfire-orange-600">
                  Submit Checklist
                </Button>
              </>
            ) : (
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ChooseChecklistDialog = ({ establishmentName, applicationType }: { establishmentName: string, applicationType: string }) => {
  const [open, setOpen] = useState(false);
  
  const handleSelect = (type: string) => {
    toast.success(`${type} checklist selected for ${establishmentName}`);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          Choose Checklist
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Checklist Type</DialogTitle>
          <DialogDescription>
            Choose the appropriate checklist type for {establishmentName} ({applicationType})
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          <div className="grid gap-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                className="w-full justify-start text-left font-normal"
                onClick={() => handleSelect("Small Business")}
              >
                <span>Small Business Checklist</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                className="w-full justify-start text-left font-normal"
                onClick={() => handleSelect("Large Business")}
              >
                <span>Large Business Checklist</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const EmptyInspections = ({ status }: { status: string }) => (
  <div className="text-center py-10">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">No {status.toLowerCase()} inspections</h3>
    <p className="mt-1 text-sm text-gray-500">
      {status === "Pending" 
        ? "No inspections are currently pending."
        : status === "Scheduled"
        ? "No inspections are currently scheduled."
        : status === "Inspected"
        ? "No inspections have been conducted yet."
        : status === "Approved"
        ? "No inspections have been approved yet."
        : status === "Rejected"
        ? "No inspections have been rejected."
        : "No inspections have been cancelled."}
    </p>
  </div>
);

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Scheduled":
      return "bg-blue-100 text-blue-800";
    case "Inspected":
      return "bg-purple-100 text-purple-800";
    case "Approved":
      return "bg-green-100 text-green-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    case "Cancelled":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const InspectorInspections = () => {
  const handleComplete = () => {
    toast.success("Inspection completed successfully");
  };
  
  const scheduledInspections = mockInspections.filter(insp => insp.status === "Scheduled");
  const inspectedInspections = mockInspections.filter(insp => insp.status === "Inspected");
  const approvedInspections = mockInspections.filter(insp => insp.status === "Approved");
  const rejectedInspections = mockInspections.filter(insp => insp.status === "Rejected");
  const cancelledInspections = mockInspections.filter(insp => insp.status === "Cancelled");

  return (
    <InspectorLayout>
      <div className="p-6">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Assigned Inspections</h1>
          <p className="text-gray-600 mt-2">
            View and manage your assigned inspections.
          </p>
        </div>

        {/* Inspections Tabs */}
        <Tabs defaultValue="scheduled">
          <TabsList className="mb-4">
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="inspected">Inspected</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scheduled">
            <div className="bg-white rounded-md shadow overflow-hidden">
              {scheduledInspections.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Establishment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {scheduledInspections.map((inspection) => (
                        <tr key={inspection.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(inspection.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(inspection.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{inspection.establishmentName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{inspection.applicationType}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(inspection.status)}`}>
                              {inspection.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <ChooseChecklistDialog 
                              establishmentName={inspection.establishmentName}
                              applicationType={inspection.applicationType}
                            />
                            <ChecklistDialog
                              establishmentName={inspection.establishmentName}
                              applicationType={inspection.applicationType}
                              onComplete={handleComplete}
                            />
                            <Button variant="outline" size="sm" className="text-xs">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <EmptyInspections status="Scheduled" />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="inspected">
            <div className="bg-white rounded-md shadow overflow-hidden">
              {inspectedInspections.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    {/* Table content for inspected */}
                  </table>
                </div>
              ) : (
                <EmptyInspections status="Inspected" />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="approved">
            <div className="bg-white rounded-md shadow overflow-hidden">
              {approvedInspections.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Establishment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {approvedInspections.map((inspection) => (
                        <tr key={inspection.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(inspection.date).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{inspection.establishmentName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{inspection.applicationType}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(inspection.status)}`}>
                              {inspection.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="outline" size="sm" className="text-xs">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <EmptyInspections status="Approved" />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="rejected">
            <div className="bg-white rounded-md shadow overflow-hidden">
              {rejectedInspections.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    {/* Table content for rejected */}
                  </table>
                </div>
              ) : (
                <EmptyInspections status="Rejected" />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="cancelled">
            <div className="bg-white rounded-md shadow overflow-hidden">
              {cancelledInspections.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    {/* Table content for cancelled */}
                  </table>
                </div>
              ) : (
                <EmptyInspections status="Cancelled" />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </InspectorLayout>
  );
};

export default InspectorInspections;
