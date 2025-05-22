
import { useState, useEffect } from "react";
import OwnerLayout from "@/components/layouts/OwnerLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EstablishmentRegistrationForm from "@/components/establishments/EstablishmentRegistrationForm";

const OwnerEstablishments = () => {
  const [isRegistrationFormOpen, setIsRegistrationFormOpen] = useState(false);
  const [selectedEstablishment, setSelectedEstablishment] = useState<{
    businessName: string;
    dtiNumber: string;
  } | null>(null);

  // Function to handle registration form for unregistered establishments
  const handleRegisterUnregistered = (businessName: string, dtiNumber: string) => {
    setSelectedEstablishment({
      businessName,
      dtiNumber,
    });
    setIsRegistrationFormOpen(true);
  };

  return (
    <OwnerLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Establishments</h1>
            <p className="text-gray-600 mt-2">Manage your registered and unregistered establishments.</p>
          </div>
          <Button 
            className="bg-vfire-orange hover:bg-vfire-orange-600"
            onClick={() => {
              setSelectedEstablishment(null);
              setIsRegistrationFormOpen(true);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Register New
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input
              placeholder="Search establishments by name, address, or status..."
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="registered">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="registered">Registered</TabsTrigger>
            <TabsTrigger value="pre-registered">Pre-Registered</TabsTrigger>
            <TabsTrigger value="unregistered">Unregistered</TabsTrigger>
          </TabsList>
          
          <TabsContent value="registered">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">Happy Toy Shop</h3>
                  <p className="text-sm text-gray-500 mb-2">123 Main St, Maysan, Valenzuela City</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">FSIC-Business: Valid</div>
                    <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">FSEC: Approved</div>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    <span className="font-medium">DTI Number:</span> 123456789
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" className="mr-2">
                      View
                    </Button>
                    <Button size="sm" className="bg-vfire-orange hover:bg-vfire-orange-600">
                      Manage
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">Main Street Store</h3>
                  <p className="text-sm text-gray-500 mb-2">456 Industrial Ave, Arkong Bato, Valenzuela City</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">FSIC-Business: Valid</div>
                    <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">FSEC: Approved</div>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    <span className="font-medium">DTI Number:</span> 987654321
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" className="mr-2">
                      View
                    </Button>
                    <Button size="sm" className="bg-vfire-orange hover:bg-vfire-orange-600">
                      Manage
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="pre-registered">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">New Branch Location</h3>
                  <p className="text-sm text-gray-500 mb-2">789 Retail Lane, Gen. T. De Leon, Valenzuela City</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Registration: Pending</div>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    <span className="font-medium">Submitted:</span> May 20, 2025
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" className="mr-2">
                      View
                    </Button>
                    <Button size="sm" className="bg-vfire-orange hover:bg-vfire-orange-600">
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">Downtown Cafe</h3>
                  <p className="text-sm text-gray-500 mb-2">321 Coffee Road, Balangkas, Valenzuela City</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Registration: Pending</div>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    <span className="font-medium">Submitted:</span> May 15, 2025
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" className="mr-2">
                      View
                    </Button>
                    <Button size="sm" className="bg-vfire-orange hover:bg-vfire-orange-600">
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="unregistered">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden border-dashed">
                <div className="p-4">
                  <h3 className="font-bold text-lg">Corner Market</h3>
                  <p className="text-sm text-gray-500 mb-2">Unknown location</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">Status: Unregistered</div>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    <span className="font-medium">Temporary ID:</span> TMP-123
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      size="sm" 
                      className="bg-vfire-orange hover:bg-vfire-orange-600"
                      onClick={() => handleRegisterUnregistered("Corner Market", "TMP-123")}
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Card className="overflow-hidden border-dashed">
                <div className="p-4">
                  <h3 className="font-bold text-lg">Sample Establishment 1</h3>
                  <p className="text-sm text-gray-500 mb-2">Unknown location</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">Status: Unregistered</div>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    <span className="font-medium">DTI Certificate No:</span> 123456789
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      size="sm" 
                      className="bg-vfire-orange hover:bg-vfire-orange-600"
                      onClick={() => handleRegisterUnregistered("Sample Establishment 1", "123456789")}
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </Card>
              
              <div className="text-center py-12 col-span-full md:col-span-2 lg:col-span-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="mt-4 text-lg font-medium">Register a new establishment</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                  Click the button below to start registering a new establishment.
                </p>
                <Button 
                  className="mt-6 bg-vfire-orange hover:bg-vfire-orange-600"
                  onClick={() => {
                    setSelectedEstablishment(null);
                    setIsRegistrationFormOpen(true);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Register New Establishment
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Registration Form */}
        <EstablishmentRegistrationForm
          open={isRegistrationFormOpen}
          onOpenChange={setIsRegistrationFormOpen}
          initialData={selectedEstablishment ? {
            businessName: selectedEstablishment.businessName,
            dtiCertificateNo: selectedEstablishment.dtiNumber
          } : undefined}
        />
      </div>
    </OwnerLayout>
  );
};

export default OwnerEstablishments;
