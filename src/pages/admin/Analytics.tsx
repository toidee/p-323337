
import AdminLayout from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminAnalytics = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-gray-600 mt-2">
            Visualize inspection and application metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Inspections</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-lg font-medium">Monthly Inspections Chart</div>
                  <div className="text-sm text-gray-500">Visualization will be implemented here</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-lg font-medium">Application Status Chart</div>
                  <div className="text-sm text-gray-500">Visualization will be implemented here</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Inspector Performance</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-lg font-medium">Inspector Performance Chart</div>
                  <div className="text-sm text-gray-500">Visualization will be implemented here</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Establishment Compliance</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-lg font-medium">Establishment Compliance Chart</div>
                  <div className="text-sm text-gray-500">Visualization will be implemented here</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
