import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

// Mock data for inspections
const mockInspections = [
  {
    id: "1",
    establishmentName: "James Shop",
    applicationType: "FSIC-Business",
    inspector: "Sandara Dizon",
    scheduledDate: "2025-05-25T10:00:00",
    status: "Scheduled"
  },
  {
    id: "2",
    establishmentName: "James Shop",
    applicationType: "FSIC-Occupancy",
    inspector: "Sandara Dizon",
    scheduledDate: "2025-05-15T14:30:00",
    status: "Approved"
  },
];

// Mock data for inspectors
const mockInspectors = [
  { id: "1", name: "Sandara Dizon", position: "FO1" },
];

const AssignInspectorDialog = ({ open, onOpenChange, onAssign }: { open: boolean; onOpenChange: (open: boolean) => void; onAssign: () => void }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Assign Inspector</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <Label htmlFor="inspector">Select Inspector</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select an inspector" />
          </SelectTrigger>
          <SelectContent>
            {mockInspectors.map((inspector) => (
              <SelectItem key={inspector.id} value={inspector.id}>
                {inspector.name} - {inspector.position}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button 
          className="bg-vfire-orange hover:bg-vfire-orange-600"
          onClick={() => {
            onAssign();
            onOpenChange(false);
          }}
        >
          Assign
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

const ScheduleInspectionDialog = ({ open, onOpenChange, onSchedule }: { open: boolean; onOpenChange: (open: boolean) => void; onSchedule: () => void }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Schedule Inspection</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button 
          className="bg-vfire-orange hover:bg-vfire-orange-600"
          onClick={() => {
            onSchedule();
            onOpenChange(false);
          }}
        >
          Schedule
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

const AdminInspections = () => {
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  
  const handleAssignInspector = () => {
    toast.success("Inspector assigned successfully");
  };
  
  const handleSchedule = () => {
    toast.success("Inspection scheduled successfully");
  };
  
  const handleApprove = (id: string) => {
    toast.success("Inspection approved successfully");
  };
  
  const handleReject = (id: string) => {
    toast.success("Inspection rejected successfully");
  };
  
  const handleCancel = (id: string) => {
    toast.success("Inspection cancelled successfully");
  };
  
  const pendingInspections = mockInspections.filter(insp => insp.status === "Pending");
  const scheduledInspections = mockInspections.filter(insp => insp.status === "Scheduled");
  const inspectedInspections = mockInspections.filter(insp => insp.status === "Inspected");
  const approvedInspections = mockInspections.filter(insp => insp.status === "Approved");
  const rejectedInspections = mockInspections.filter(insp => insp.status === "Rejected");
  const cancelledInspections = mockInspections.filter(insp => insp.status === "Cancelled");

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Inspections</h1>
          <p className="text-gray-600 mt-2">
            Manage and monitor all inspection activities.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Inspected">Inspected</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="FSIC-Occupancy">FSIC-Occupancy</SelectItem>
              <SelectItem value="FSIC-Business">FSIC-Business</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Months" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              <SelectItem value="1">January</SelectItem>
              <SelectItem value="2">February</SelectItem>
              <SelectItem value="3">March</SelectItem>
              <SelectItem value="4">April</SelectItem>
              <SelectItem value="5">May</SelectItem>
              <SelectItem value="6">June</SelectItem>
              <SelectItem value="7">July</SelectItem>
              <SelectItem value="8">August</SelectItem>
              <SelectItem value="9">September</SelectItem>
              <SelectItem value="10">October</SelectItem>
              <SelectItem value="11">November</SelectItem>
              <SelectItem value="12">December</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Inspections Tabs */}
        <Tabs defaultValue="scheduled">
          <TabsList className="mb-4">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="inspected">Inspected</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          {/* Pending Tab */}
          <TabsContent value="pending">
            <div className="bg-white rounded-md shadow overflow-hidden">
              {pendingInspections.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Establishment
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Application Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pendingInspections.map((inspection) => (
                        <tr key={inspection.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{inspection.establishmentName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{inspection.applicationType}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              {inspection.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
                              <DialogTrigger asChild>
                                <Button size="sm" className="text-xs bg-vfire-orange hover:bg-vfire-orange-600">
                                  Assign Inspector
                                </Button>
                              </DialogTrigger>
                              <AssignInspectorDialog 
                                open={assignDialogOpen} 
                                onOpenChange={setAssignDialogOpen} 
                                onAssign={handleAssignInspector}
                              />
                            </Dialog>
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
                <div className="text-center py-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No pending inspections</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No inspection requests are pending.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Scheduled Tab */}
          <TabsContent value="scheduled">
            <div className="bg-white rounded-md shadow overflow-hidden">
              {scheduledInspections.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Establishment
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Application Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Inspector
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Scheduled Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {scheduledInspections.map((inspection) => (
                        <tr key={inspection.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{inspection.establishmentName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{inspection.applicationType}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{inspection.inspector}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(inspection.scheduledDate).toLocaleDateString()} at {new Date(inspection.scheduledDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {inspection.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
                              <DialogTrigger asChild>
                                <Button size="sm" className="text-xs bg-vfire-orange hover:bg-vfire-orange-600">
                                  Reschedule
                                </Button>
                              </DialogTrigger>
                              <ScheduleInspectionDialog 
                                open={scheduleDialogOpen} 
                                onOpenChange={setScheduleDialogOpen} 
                                onSchedule={handleSchedule}
                              />
                            </Dialog>
                            <Button size="sm" className="text-xs bg-red-500 hover:bg-red-600 text-white" onClick={() => handleCancel(inspection.id)}>
                              Cancel
                            </Button>
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
                <div className="text-center py-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No scheduled inspections</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No inspections have been scheduled.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Approved Tab */}
          <TabsContent value="approved">
            <div className="bg-white rounded-md shadow overflow-hidden">
              {approvedInspections.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Establishment
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Application Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Inspector
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Scheduled Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {approvedInspections.map((inspection) => (
                        <tr key={inspection.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{inspection.establishmentName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{inspection.applicationType}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{inspection.inspector}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(inspection.scheduledDate).toLocaleDateString()} at {new Date(inspection.scheduledDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
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
                <div className="text-center py-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No approved inspections</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No inspections have been approved yet.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Other tabs will have similar structure */}
          <TabsContent value="inspected">
            <div className="bg-white rounded-md shadow overflow-hidden">
              <div className="text-center py-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No inspected establishments</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No inspections are currently in the inspected state awaiting review.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="rejected">
            <div className="bg-white rounded-md shadow overflow-hidden">
              <div className="text-center py-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No rejected inspections</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No inspections have been rejected.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cancelled">
            <div className="bg-white rounded-md shadow overflow-hidden">
              <div className="text-center py-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No cancelled inspections</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No inspections have been cancelled.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminInspections;
