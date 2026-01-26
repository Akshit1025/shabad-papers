/**
 * @fileOverview The main dashboard page for the admin panel.
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">Welcome to the Shabad Papers admin panel.</p>
       <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            This is your admin dashboard. Use the sidebar navigation to manage categories, products, and forms.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
