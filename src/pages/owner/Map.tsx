
import { useState, useEffect } from "react";
import OwnerLayout from "@/components/layouts/OwnerLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Mock data for the map
const mockEstablishments = [
  {
    id: "1",
    name: "Happy Toy Shop",
    dti: "111111111",
    type: "Commercial",
    address: "123 Main St, Maysan, Valenzuela City",
    lat: 14.7011, 
    lng: 120.9830,
    status: "Active",
    fsecStatus: "Approved",
    fsicStatus: "Valid"
  },
  {
    id: "2",
    name: "Main Street Store",
    dti: "123213",
    type: "Commercial",
    address: "456 Industrial Ave, Arkong Bato, Valenzuela City",
    lat: 14.6957,
    lng: 120.9898,
    status: "Active",
    fsecStatus: "Approved",
    fsicStatus: "Valid"
  },
  {
    id: "3",
    name: "New Branch Location",
    dti: "Pending",
    type: "Commercial",
    address: "789 Retail Lane, Gen. T. De Leon, Valenzuela City",
    lat: 14.7052,
    lng: 120.9760,
    status: "Pending",
    fsecStatus: "Pending",
    fsicStatus: "Pending"
  },
];

const OwnerMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    toast.info("Map Component", {
      description: "Leaflet/OpenStreetMap would be integrated here to display your establishments."
    });
  }, []);

  return (
    <OwnerLayout>
      <div className="p-6">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Map</h1>
          <p className="text-gray-600 mt-2">
            View your establishments on the map.
          </p>
        </div>

        {/* Map filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Establishments</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="fsecApproved">FSEC Approved</SelectItem>
              <SelectItem value="fsicValid">FSIC Valid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Map Container */}
        <Card>
          <div className="h-[calc(100vh-240px)] min-h-[500px] bg-gray-100 relative">
            {/* This would be the Leaflet map container */}
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-600 mb-4">
                  Map integration with Leaflet/OpenStreetMap would display your establishments with color-coded markers:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm justify-center max-w-2xl mx-auto">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Active & Compliant</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span>Pending</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span>Non-compliant</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map controls (would be part of Leaflet implementation) */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <Button size="sm" variant="secondary" className="bg-white shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </Button>
              <Button size="sm" variant="secondary" className="bg-white shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </Button>
            </div>
          </div>
        </Card>

        {/* Establishment List */}
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-4">Your Establishments</h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockEstablishments.map((establishment) => (
              <Card key={establishment.id} className="overflow-hidden">
                <div className="p-4">
                  <h3 className="font-medium mb-1">{establishment.name}</h3>
                  <div className="text-sm text-gray-500 mb-2">{establishment.address}</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">DTI Number:</span>
                      <span className="font-medium">{establishment.dti}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">FSEC Status:</span>
                      <span 
                        className={`px-2 py-0.5 rounded ${establishment.fsecStatus === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                      >
                        {establishment.fsecStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">FSIC Status:</span>
                      <span 
                        className={`px-2 py-0.5 rounded ${establishment.fsicStatus === 'Valid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                      >
                        {establishment.fsicStatus}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-t px-4 py-2 bg-gray-50 flex justify-end">
                  <Button size="sm" className="text-xs bg-vfire-orange hover:bg-vfire-orange-600">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
};

export default OwnerMap;
