
import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdminUsers = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-gray-600 mt-2">Manage user accounts across the system.</p>
          </div>
          <Button className="bg-vfire-orange hover:bg-vfire-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Add User
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input
              placeholder="Search users by name, email, role..."
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
            <TabsTrigger value="inspectors">Inspectors</TabsTrigger>
            <TabsTrigger value="owners">Owners</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-6 py-4 font-medium">VFIRE Admin</td>
                        <td className="px-6 py-4">admin@vfire.gov.ph</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-red-500">Admin</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="border-green-500 text-green-600">Active</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-4 font-medium">Sandara Dizon</td>
                        <td className="px-6 py-4">sdizon@vfire.gov.ph</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-blue-500">Inspector (FO1)</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="border-green-500 text-green-600">Active</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-4 font-medium">Juan Dela Cruz</td>
                        <td className="px-6 py-4">jdelacruz@vfire.gov.ph</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-blue-500">Inspector (FO2)</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="border-green-500 text-green-600">Active</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-4 font-medium">Maria Cruz</td>
                        <td className="px-6 py-4">mcruz@example.com</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-500">Owner</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="border-green-500 text-green-600">Active</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Roberto Tan</td>
                        <td className="px-6 py-4">rtan@example.com</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-500">Owner</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="border-green-500 text-green-600">Active</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admins">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-6 py-4 font-medium">VFIRE Admin</td>
                        <td className="px-6 py-4">admin@vfire.gov.ph</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-red-500">Admin</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="border-green-500 text-green-600">Active</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inspectors">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Rank</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-6 py-4 font-medium">Sandara Dizon</td>
                        <td className="px-6 py-4">sdizon@vfire.gov.ph</td>
                        <td className="px-6 py-4">FO1</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="border-green-500 text-green-600">Active</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Juan Dela Cruz</td>
                        <td className="px-6 py-4">jdelacruz@vfire.gov.ph</td>
                        <td className="px-6 py-4">FO2</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="border-green-500 text-green-600">Active</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="owners">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Establishments</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-6 py-4 font-medium">Maria Cruz</td>
                        <td className="px-6 py-4">mcruz@example.com</td>
                        <td className="px-6 py-4">3</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="border-green-500 text-green-600">Active</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Roberto Tan</td>
                        <td className="px-6 py-4">rtan@example.com</td>
                        <td className="px-6 py-4">1</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="border-green-500 text-green-600">Active</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
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
    </AdminLayout>
  );
};

export default AdminUsers;
