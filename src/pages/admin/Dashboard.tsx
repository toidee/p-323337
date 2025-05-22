
import { Link } from "react-router-dom";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { adminDashboardStats } from "@/data/mockData";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Overview of system activity and metrics.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminDashboardStats.users.total}</div>
              <div className="text-xs text-gray-500 mt-1 space-y-1">
                <div>Owners: {adminDashboardStats.users.owners}</div>
                <div>Inspectors: {adminDashboardStats.users.inspectors}</div>
                <div>Admins: {adminDashboardStats.users.admins}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Establishments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminDashboardStats.establishments.total}</div>
              <div className="text-xs text-gray-500 mt-1 space-y-1">
                <div className="flex justify-between">
                  <span>By Type:</span>
                  <span>Industrial: {adminDashboardStats.establishments.byType.industrial}</span>
                </div>
                <div className="flex justify-between">
                  <span></span>
                  <span>Commercial: {adminDashboardStats.establishments.byType.commercial}</span>
                </div>
                <div className="flex justify-between">
                  <span></span>
                  <span>Residential: {adminDashboardStats.establishments.byType.residential}</span>
                </div>
                <div className="border-t pt-1 mt-1">
                  <div className="flex justify-between">
                    <span>Unregistered: {adminDashboardStats.establishments.byStatus.unregistered}</span>
                    <span>Pre-registered: {adminDashboardStats.establishments.byStatus.preRegistered}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Registered: {adminDashboardStats.establishments.byStatus.registered}</span>
                    <span></span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminDashboardStats.applications.total}</div>
              <div className="text-xs text-gray-500 mt-1 space-y-1">
                <div className="flex justify-between">
                  <span>FSEC:</span>
                  <span>{adminDashboardStats.applications.byType.fsec}</span>
                </div>
                <div className="flex justify-between">
                  <span>FSIC-Occupancy:</span>
                  <span>{adminDashboardStats.applications.byType.fsic_occupancy}</span>
                </div>
                <div className="flex justify-between">
                  <span>FSIC-Business:</span>
                  <span>{adminDashboardStats.applications.byType.fsic_business}</span>
                </div>
                <div className="border-t pt-1 mt-1">
                  <div className="flex justify-between">
                    <span>Pending:</span>
                    <span>{adminDashboardStats.applications.statuses.fsec.pending + 
                      adminDashboardStats.applications.statuses.fsic_occupancy.pending + 
                      adminDashboardStats.applications.statuses.fsic_business.pending}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Approved:</span>
                    <span>{adminDashboardStats.applications.statuses.fsec.approved + 
                      adminDashboardStats.applications.statuses.fsic_occupancy.approved + 
                      adminDashboardStats.applications.statuses.fsic_business.approved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rejected:</span>
                    <span>{adminDashboardStats.applications.statuses.fsec.rejected + 
                      adminDashboardStats.applications.statuses.fsic_occupancy.rejected + 
                      adminDashboardStats.applications.statuses.fsic_business.rejected}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Inspections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminDashboardStats.inspections.total}</div>
              <div className="text-xs text-gray-500 mt-1 space-y-1">
                <div className="flex justify-between">
                  <span>By Type:</span>
                  <span>FSIC-Occupancy: {adminDashboardStats.inspections.byType.fsic_occupancy}</span>
                </div>
                <div className="flex justify-between">
                  <span></span>
                  <span>FSIC-Business: {adminDashboardStats.inspections.byType.fsic_business}</span>
                </div>
                <div className="border-t pt-1 mt-1">
                  <div className="flex justify-between">
                    <span>By Status:</span>
                    <span>Pending: {adminDashboardStats.inspections.byStatus.pending}</span>
                  </div>
                  <div className="flex justify-between">
                    <span></span>
                    <span>Scheduled: {adminDashboardStats.inspections.byStatus.scheduled}</span>
                  </div>
                  <div className="flex justify-between">
                    <span></span>
                    <span>Inspected: {adminDashboardStats.inspections.byStatus.inspected}</span>
                  </div>
                  <div className="flex justify-between">
                    <span></span>
                    <span>Approved: {adminDashboardStats.inspections.byStatus.approved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span></span>
                    <span>Rejected: {adminDashboardStats.inspections.byStatus.rejected}</span>
                  </div>
                  <div className="flex justify-between">
                    <span></span>
                    <span>Cancelled: {adminDashboardStats.inspections.byStatus.cancelled}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/admin/users">
            <Button variant="outline" className="w-full justify-start h-auto py-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <div className="text-left">
                <div className="font-medium">Manage Users</div>
                <div className="text-xs text-gray-500">Add, edit or deactivate users</div>
              </div>
            </Button>
          </Link>
          
          <Link to="/admin/establishments">
            <Button variant="outline" className="w-full justify-start h-auto py-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <div className="text-left">
                <div className="font-medium">Establishments</div>
                <div className="text-xs text-gray-500">Review and approve establishments</div>
              </div>
            </Button>
          </Link>
          
          <Link to="/admin/applications">
            <Button variant="outline" className="w-full justify-start h-auto py-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="text-left">
                <div className="font-medium">Applications</div>
                <div className="text-xs text-gray-500">Review FSEC and FSIC applications</div>
              </div>
            </Button>
          </Link>
          
          <Link to="/admin/inspections">
            <Button variant="outline" className="w-full justify-start h-auto py-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <div className="text-left">
                <div className="font-medium">Inspections</div>
                <div className="text-xs text-gray-500">Manage and assign inspections</div>
              </div>
            </Button>
          </Link>
        </div>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {[
                {
                  title: "New Establishment Registered",
                  desc: "New Branch Location by Maria Cruz",
                  time: "10 minutes ago",
                  icon: (
                    <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  )
                },
                {
                  title: "Inspection Assigned",
                  desc: "FO1 Sandara Dizon assigned to Happy Toy Shop",
                  time: "1 hour ago",
                  icon: (
                    <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                  )
                },
                {
                  title: "Application Approved",
                  desc: "FSIC-Business for Main Street Store",
                  time: "3 hours ago",
                  icon: (
                    <div className="rounded-full bg-green-100 p-2 text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )
                },
                {
                  title: "New User Registration",
                  desc: "Inspector Juan Dela Cruz",
                  time: "1 day ago",
                  icon: (
                    <div className="rounded-full bg-orange-100 p-2 text-orange-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                  )
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center p-4">
                  {item.icon}
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <div className="text-xs text-gray-400">{item.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
