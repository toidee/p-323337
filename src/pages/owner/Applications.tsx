
import { useState } from "react";
import OwnerLayout from "@/components/layouts/OwnerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormLabel } from "@/components/ui/form";
import { ApplicationType } from "@/types/inspection";
import ApplicationFormDialog from "@/components/applications/ApplicationFormDialog";

const OwnerApplications = () => {
  // State for managing dialogs
  const [isSelectionDialogOpen, setIsSelectionDialogOpen] = useState(false);
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
  const [selectedEstablishment, setSelectedEstablishment] = useState("");
  const [selectedEstablishmentName, setSelectedEstablishmentName] = useState("");
  const [applicationType, setApplicationType] = useState<ApplicationType | null>(null);
  
  // Placeholder data for establishments
  const registeredEstablishments = [
    { id: "1", name: "Happy Toy Shop" },
    { id: "2", name: "Main Street Store" }
  ];
  
  // Function to determine application type based on establishment
  const checkApplicationEligibility = (establishmentId: string) => {
    // This would be a database check in a real application
    // For now we'll simulate different scenarios
    if (establishmentId === "1") {
      return "fsic_business"; // FSIC Business
    } else if (establishmentId === "2") {
      return "fsec"; // FSEC
    }
    return null;
  };
  
  const handleEstablishmentSelect = (value: string) => {
    setSelectedEstablishment(value);
    const establishment = registeredEstablishments.find(est => est.id === value);
    if (establishment) {
      setSelectedEstablishmentName(establishment.name);
    }
    const appType = checkApplicationEligibility(value) as ApplicationType;
    setApplicationType(appType);
  };
  
  const handleStartApplication = () => {
    setIsSelectionDialogOpen(false);
    if (selectedEstablishment && applicationType) {
      setIsApplicationFormOpen(true);
    }
  };
  
  // Application selection dialog
  const renderSelectionDialog = () => {
    return (
      <Dialog open={isSelectionDialogOpen} onOpenChange={setIsSelectionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Apply for Certification</DialogTitle>
            <DialogDescription>
              Select an establishment to begin a new application.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <FormLabel htmlFor="establishment">Establishment</FormLabel>
              <Select value={selectedEstablishment} onValueChange={handleEstablishmentSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an establishment" />
                </SelectTrigger>
                <SelectContent>
                  {registeredEstablishments.map(est => (
                    <SelectItem key={est.id} value={est.id}>{est.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedEstablishment && (
              <div className="space-y-2">
                <FormLabel>Eligible Application</FormLabel>
                <div className="text-sm border p-3 bg-orange-50 rounded-md">
                  {applicationType === "fsec" && "FSEC Application"}
                  {applicationType === "fsic_occupancy" && "FSIC Occupancy Application"}
                  {applicationType === "fsic_business" && "FSIC Business Application"}
                  {!applicationType && "No eligible applications at this time."}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSelectionDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleStartApplication} 
              disabled={!selectedEstablishment || !applicationType}
              className="bg-vfire-orange hover:bg-vfire-orange-600"
            >
              Proceed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <OwnerLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
            <p className="text-gray-600 mt-2">Manage your FSEC and FSIC applications.</p>
          </div>
          <div className="flex gap-2">
            <Button 
              className="bg-vfire-orange hover:bg-vfire-orange-600"
              onClick={() => setIsSelectionDialogOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Apply for Certification
            </Button>
          </div>
        </div>

        {/* Application Selection Dialog */}
        {renderSelectionDialog()}
        
        {/* Application Form Dialog */}
        {selectedEstablishment && applicationType && (
          <ApplicationFormDialog
            open={isApplicationFormOpen}
            onOpenChange={setIsApplicationFormOpen}
            establishmentId={selectedEstablishment}
            establishmentName={selectedEstablishmentName}
            applicationType={applicationType}
          />
        )}

        <div className="mb-6">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input
              placeholder="Search applications by establishment, type, or status..."
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          
          <TabsContent value="all">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    {
                      establishment: "Happy Toy Shop",
                      type: "FSEC",
                      date: "May 10, 2025",
                      status: "Approved",
                      statusColor: "bg-green-100 text-green-800"
                    },
                    {
                      establishment: "Happy Toy Shop",
                      type: "FSIC-Business",
                      date: "May 12, 2025",
                      status: "Approved",
                      statusColor: "bg-green-100 text-green-800"
                    },
                    {
                      establishment: "Main Street Store",
                      type: "FSEC",
                      date: "April 15, 2025",
                      status: "Approved",
                      statusColor: "bg-green-100 text-green-800"
                    },
                    {
                      establishment: "Main Street Store",
                      type: "FSIC-Business",
                      date: "April 20, 2025",
                      status: "Approved",
                      statusColor: "bg-green-100 text-green-800"
                    },
                    {
                      establishment: "New Branch Location",
                      type: "FSEC",
                      date: "May 20, 2025",
                      status: "Pending",
                      statusColor: "bg-yellow-100 text-yellow-800"
                    }
                  ].map((app, index) => (
                    <div key={index} className="flex items-center py-4 px-6">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{app.establishment}</p>
                        <p className="text-sm text-gray-500">{app.type}</p>
                      </div>
                      <div className="text-sm text-gray-500 mx-4 hidden sm:block">
                        Submitted: {app.date}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${app.statusColor}`}>
                        {app.status}
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          
          <TabsContent value="pending">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    {
                      establishment: "New Branch Location",
                      type: "FSEC",
                      date: "May 20, 2025",
                      status: "Pending",
                      statusColor: "bg-yellow-100 text-yellow-800"
                    },
                    {
                      establishment: "Downtown Cafe",
                      type: "FSEC",
                      date: "May 18, 2025",
                      status: "Pending",
                      statusColor: "bg-yellow-100 text-yellow-800"
                    }
                  ].map((app, index) => (
                    <div key={index} className="flex items-center py-4 px-6">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{app.establishment}</p>
                        <p className="text-sm text-gray-500">{app.type}</p>
                      </div>
                      <div className="text-sm text-gray-500 mx-4 hidden sm:block">
                        Submitted: {app.date}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${app.statusColor}`}>
                        {app.status}
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="approved">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    {
                      establishment: "Happy Toy Shop",
                      type: "FSEC",
                      date: "May 10, 2025",
                      status: "Approved",
                      statusColor: "bg-green-100 text-green-800"
                    },
                    {
                      establishment: "Happy Toy Shop",
                      type: "FSIC-Business",
                      date: "May 12, 2025",
                      status: "Approved",
                      statusColor: "bg-green-100 text-green-800"
                    },
                    {
                      establishment: "Main Street Store",
                      type: "FSEC",
                      date: "April 15, 2025",
                      status: "Approved",
                      statusColor: "bg-green-100 text-green-800"
                    },
                    {
                      establishment: "Main Street Store",
                      type: "FSIC-Business",
                      date: "April 20, 2025",
                      status: "Approved",
                      statusColor: "bg-green-100 text-green-800"
                    }
                  ].map((app, index) => (
                    <div key={index} className="flex items-center py-4 px-6">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{app.establishment}</p>
                        <p className="text-sm text-gray-500">{app.type}</p>
                      </div>
                      <div className="text-sm text-gray-500 mx-4 hidden sm:block">
                        Submitted: {app.date}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${app.statusColor}`}>
                        {app.status}
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rejected">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    {
                      establishment: "Corner Market",
                      type: "FSEC",
                      date: "May 5, 2025",
                      status: "Rejected",
                      statusColor: "bg-red-100 text-red-800"
                    }
                  ].map((app, index) => (
                    <div key={index} className="flex items-center py-4 px-6">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{app.establishment}</p>
                        <p className="text-sm text-gray-500">{app.type}</p>
                      </div>
                      <div className="text-sm text-gray-500 mx-4 hidden sm:block">
                        Submitted: {app.date}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${app.statusColor}`}>
                        {app.status}
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </OwnerLayout>
  );
};

export default OwnerApplications;
