
import OwnerLayout from "@/components/layouts/OwnerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const OwnerInspections = () => {
  return (
    <OwnerLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Inspections</h1>
          <p className="text-gray-600 mt-2">
            View and track inspections for your establishments.
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input
              placeholder="Search inspections by establishment, date, or status..."
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="requested">Requested</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Establishment</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Date & Time</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-6 py-4 font-medium">Happy Toy Shop</td>
                        <td className="px-6 py-4">FSIC-Business</td>
                        <td className="px-6 py-4">May 25, 2025 10:00 AM</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-blue-500">Scheduled</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-4 font-medium">Main Street Store</td>
                        <td className="px-6 py-4">FSIC-Business</td>
                        <td className="px-6 py-4">April 22, 2025 02:30 PM</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-500">Approved</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-4 font-medium">Main Street Store</td>
                        <td className="px-6 py-4">FSEC</td>
                        <td className="px-6 py-4">April 15, 2025 09:15 AM</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-500">Approved</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">New Branch Location</td>
                        <td className="px-6 py-4">FSEC</td>
                        <td className="px-6 py-4">Pending</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-yellow-500">Requested</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scheduled">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Establishment</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Date & Time</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-6 py-4 font-medium">Happy Toy Shop</td>
                        <td className="px-6 py-4">FSIC-Business</td>
                        <td className="px-6 py-4">May 25, 2025 10:00 AM</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-blue-500">Scheduled</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Establishment</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Date & Time</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-6 py-4 font-medium">Main Street Store</td>
                        <td className="px-6 py-4">FSIC-Business</td>
                        <td className="px-6 py-4">April 22, 2025 02:30 PM</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-500">Approved</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Main Street Store</td>
                        <td className="px-6 py-4">FSEC</td>
                        <td className="px-6 py-4">April 15, 2025 09:15 AM</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-500">Approved</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="requested">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Establishment</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Date & Time</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-6 py-4 font-medium">New Branch Location</td>
                        <td className="px-6 py-4">FSEC</td>
                        <td className="px-6 py-4">Pending</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-yellow-500">Requested</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </OwnerLayout>
  );
};

export default OwnerInspections;
