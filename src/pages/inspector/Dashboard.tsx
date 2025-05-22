
import InspectorLayout from "@/components/layouts/InspectorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DutyStatusToggle } from "@/components/inspector/DutyStatusToggle";
import { useAuth } from "@/hooks/useAuth";
import { inspectorDashboardStats, inspections } from "@/data/mockData";

const InspectorDashboard = () => {
  const { user } = useAuth();

  return (
    <InspectorLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back{user?.name || user?.full_name ? `, ${user.name || user.full_name}` : ""}!
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-4 md:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Pending Inspections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inspectorDashboardStats.assigned.scheduled}</div>
                  <p className="text-xs text-gray-500 mt-1">Awaiting your inspection</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Inspected (For Review)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inspectorDashboardStats.assigned.inspected}</div>
                  <p className="text-xs text-gray-500 mt-1">Inspections pending approval</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Total Assigned
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inspectorDashboardStats.assigned.total}</div>
                  <p className="text-xs text-gray-500 mt-1">All time assigned inspections</p>
                </CardContent>
              </Card>
            </div>

            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>Weekly Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-gray-500">Bar Chart</div>
                    <div className="text-sm text-gray-400">
                      Scheduled: {inspectorDashboardStats.weekly.scheduled} | Completed: {inspectorDashboardStats.weekly.completed}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  {inspectorDashboardStats.today.length > 0 ? (
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-gray-50">
                        <tr>
                          <th className="px-6 py-3">Establishment</th>
                          <th className="px-6 py-3">Type</th>
                          <th className="px-6 py-3">Time</th>
                          <th className="px-6 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inspectorDashboardStats.today.map((inspection, index) => {
                          const dateTime = new Date(inspection.scheduled_date_time || "");
                          const time = dateTime.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          });
                          
                          return (
                            <tr className="border-b" key={index}>
                              <td className="px-6 py-4 font-medium">{inspection.establishment_name}</td>
                              <td className="px-6 py-4 capitalize">{inspection.application_type.replace('_', ' ')}</td>
                              <td className="px-6 py-4">{time}</td>
                              <td className="px-6 py-4 capitalize">{inspection.status}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="py-8 text-center text-gray-500">
                      No inspections scheduled for today
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <DutyStatusToggle />
              
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Inspection Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <div className="text-center space-y-1">
                    <div className="text-gray-500">Pie Chart</div>
                    <div className="text-xs text-gray-400 space-x-2">
                      <span>Scheduled: {inspectorDashboardStats.assigned.scheduled}</span>
                      <span>Inspected: {inspectorDashboardStats.assigned.inspected}</span>
                      <span>Approved: {inspectorDashboardStats.assigned.approved}</span>
                      <span>Rejected: {inspectorDashboardStats.assigned.rejected}</span>
                      <span>Cancelled: {inspectorDashboardStats.assigned.cancelled}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </InspectorLayout>
  );
};

export default InspectorDashboard;
