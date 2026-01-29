import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, ImageOff, Trash2 } from "lucide-react";
import Image from "next/image";

export function MediaTable({ media, onEdit, onDelete }) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Preview</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>URL</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {media.length > 0 ? (
            media.map(mediaItem => {
              return (
                <TableRow key={mediaItem.id}>
                  <TableCell>
                    {mediaItem.url ? (
                        <Image 
                            src={mediaItem.url}
                            alt={mediaItem.name}
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
                  <TableCell className="font-medium">{mediaItem.name}</TableCell>
                  <TableCell className="text-muted-foreground truncate max-w-xs">{mediaItem.url}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => onEdit(mediaItem)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => onDelete(mediaItem)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No media found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
