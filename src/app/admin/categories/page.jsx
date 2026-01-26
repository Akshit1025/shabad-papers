/**
 * @fileOverview Placeholder page for managing product categories.
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Categories</h1>
       <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            This is where you will be able to create, read, update, and delete product categories.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
