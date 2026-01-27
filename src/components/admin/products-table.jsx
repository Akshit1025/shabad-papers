import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, ImageOff, Trash2 } from "lucide-react";
import Image from "next/image";

export function ProductsTable({ products, categories, onEdit, onDelete }) {
  
  const getCategoryName = (slug) => {
    const category = categories.find(c => c.slug === slug);
    return category ? category.name : 'N/A';
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-center">Order</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map(product => {
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.image ? (
                        <Image 
                            src={product.image}
                            alt={product.name}
                            width={50}
                            height={50}
                            className="rounded-md object-cover w-[50px] h-[50px]"
                        />
                    ) : (
                        <div className="w-[50px] h-[50px] bg-secondary rounded-md flex items-center justify-center">
                            <ImageOff className="h-5 w-5 text-muted-foreground" />
                        </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{getCategoryName(product.categorySlug)}</Badge>
                  </TableCell>
                  <TableCell className="text-center">{product.order}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => onEdit(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => onDelete(product)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
