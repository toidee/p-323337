
import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminApplications = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
            <p className="text-gray-600 mt-2">Review FSEC and FSIC applications.</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="fsec">FSEC</SelectItem>
                <SelectItem value="fsicBusiness">FSIC-Business</SelectItem>
                <SelectItem value="fsicOccupancy">FSIC-Occupancy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

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
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Establishment</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Owner</th>
                        <th className="px-6 py-3">Submitted</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-6 py-4 font-medium">Happy Toy Shop</td>
                        <td className="px-6 py-4">FSEC</td>
                        <td className="px-6 py-4">Maria Cruz</td>
                        <td className="px-6 py-4">May 10, 2025</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-500">Approved</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-4 font-medium">Happy Toy Shop</td>
                        <td className="px-6 py-4">FSIC-Business</td>
                        <td className="px-6 py-4">Maria Cruz</td>
                        <td className="px-6 py-4">May 12, 2025</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-500">Approved</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-4 font-medium">Main Street Store</td>
                        <td className="px-6 py-4">FSEC</td>
                        <td className="px-6 py-4">Maria Cruz</td>
                        <td className="px-6 py-4">April 15, 2025</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-500">Approved</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-4 font-medium">Main Street Store</td>
                        <td className="px-6 py-4">FSIC-Business</td>
                        <td className="px-6 py-4">Maria Cruz</td>
                        <td className="px-6 py-4">April 20, 2025</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-500">Approved</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">New Branch Location</td>
                        <td className="px-6 py-4">FSEC</td>
                        <td className="px-6 py-4">Maria Cruz</td>
                        <td className="px-6 py-4">May 20, 2025</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-yellow-500">Pending</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="default" size="sm" className="bg-vfire-orange hover:bg-vfire-orange-600">Review</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Establishment</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Owner</th>
                        <th className="px-6 py-3">Submitted</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-6 py-4 font-medium">New Branch Location</td>
                        <td className="px-6 py-4">FSEC</td>
                        <td className="px-6 py-4">Maria Cruz</td>
                        <td className="px-6 py-4">May 20, 2025</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-yellow-500">Pending</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="default" size="sm" className="bg-vfire-orange hover:bg-vfire-orange-600">Review</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="approved">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Establishment</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Owner</th>
                        <th className="px-6 py-3">Submitted</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-6 py-4 font-medium">Happy Toy Shop</td>
                        <td className="px-6 py-4">FSEC</td>
                        <td className="px-6 py-4">Maria Cruz</td>
                        <td className="px-6 py-4">May 10, 2025</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-500">Approved</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-4 font-medium">Happy Toy Shop</td>
                        <td className="px-6 py-4">FSIC-Business</td>
                        <td className="px-6 py-4">Maria Cruz</td>
                        <td className="px-6 py-4">May 12, 2025</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-500">Approved</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-4 font-medium">Main Street Store</td>
                        <td className="px-6 py-4">FSEC</td>
                        <td className="px-6 py-4">Maria Cruz</td>
                        <td className="px-6 py-4">April 15, 2025</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-500">Approved</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Main Street Store</td>
                        <td className="px-6 py-4">FSIC-Business</td>
                        <td className="px-6 py-4">Maria Cruz</td>
                        <td className="px-6 py-4">April 20, 2025</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-500">Approved</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rejected">
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium">No Rejected Applications</h3>
              <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                There are currently no rejected applications.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminApplications;
