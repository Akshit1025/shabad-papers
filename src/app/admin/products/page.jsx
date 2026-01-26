/**
 * @fileOverview Placeholder page for managing products.
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Products</h1>
       <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            This is where you will be able to create, read, update, and delete individual products.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
