import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, CheckCheck, User2Icon } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [passwordChanged, setPasswordChanged] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchPasswordStatus = async () => {
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('password_changed')
          .eq('id', user.id)
          .single();

        if (userError) {
          console.error("Error fetching user data:", userError);
        } else if (userData) {
          setPasswordChanged(userData.password_changed);
        }
      };

      fetchPasswordStatus();
    }
  }, [user]);

  useEffect(() => {
    if (user && !passwordChanged) {
      navigate("/change-password");
    }
  }, [user, passwordChanged, navigate]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Shell>
      <Helmet>
        <title>Dashboard - V-FIRE Inspect</title>
      </Helmet>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Welcome back, {user.full_name || user.name}!</CardTitle>
            <CardDescription>
              Here's a quick overview of your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} />
              <AvatarFallback><User2Icon className="h-4 w-4" /></AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{user.email}</p>
              <p className="text-sm text-muted-foreground">
                {user.role}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Inspection</CardTitle>
            <CardDescription>Your upcoming inspection details.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-1">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm">Date:</span>
            </div>
            <div className="flex items-center">
              <CheckCheck className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm">Status:</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
            <CardDescription>Your account verification status.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-1">
            <div className="flex items-center">
              <CheckCheck className="mr-2 h-4 w-4 text-green-500" />
              <span className="text-sm">Email Verified</span>
            </div>
            <div className="flex items-center">
              <CheckCheck className="mr-2 h-4 w-4 text-green-500" />
              <span className="text-sm">Profile Complete</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
};

export default Dashboard;
