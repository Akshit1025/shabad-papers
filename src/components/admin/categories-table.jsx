import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import placeholderImages from '@/lib/placeholder-images.json';

function getImageSource(imageIdentifier) {
  if (!imageIdentifier) return null;
  if (imageIdentifier.startsWith('http')) {
    return { url: imageIdentifier };
  }
  return placeholderImages[imageIdentifier] || null;
}

export function CategoriesTable({ categories, onEdit, onDelete }) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="text-center">Order</TableHead>
            <TableHead className="text-center">Visible</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 ? (
            categories.map(category => {
              const imageSrc = getImageSource(category.image);
              return (
                <TableRow key={category.id}>
                  <TableCell>
                    {imageSrc ? (
                        <Image 
                            src={imageSrc.url}
                            alt={category.name}
                            width={50}
                            height={50}
                            className="rounded-md object-cover"
                        />
                    ) : (
                        <div className="w-[50px] h-[50px] bg-secondary rounded-md" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                  <TableCell className="text-center">{category.order}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={category.visible ? "default" : "secondary"}>
                      {category.visible ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => onEdit(category)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => onDelete(category)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
