
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Edit, ImageOff, Trash2, MoreVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const isVideoUrl = (url) => {
  if (typeof url !== 'string') return false;
  return url.match(/\.(mp4|webm|ogg)(\?.*)?$/i);
};

export function MediaGrid({ media, onEdit, onDelete }) {
  if (media.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed h-64 text-center">
        <h3 className="text-lg font-semibold">No media found.</h3>
        <p className="text-sm text-muted-foreground">Get started by adding a new image or video.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {media.map((mediaItem) => {
        const isVideo = isVideoUrl(mediaItem.url);
        return (
          <Card key={mediaItem.id} className="group relative overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square w-full bg-secondary flex items-center justify-center">
                {mediaItem.url ? (
                  isVideo ? (
                    <video
                      src={mediaItem.url}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={mediaItem.url}
                      alt={mediaItem.name}
                      fill
                      className="object-cover"
                    />
                  )
                ) : (
                  <ImageOff className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
            </CardContent>
            <div className="absolute top-1 right-1">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/30 hover:bg-black/50 text-white hover:text-white">
                             <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(mediaItem)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                        </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => onDelete(mediaItem)} className="text-destructive focus:text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                             <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <CardFooter className="p-2 bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 w-full">
              <p className="text-xs font-semibold text-white truncate" title={mediaItem.name}>
                {mediaItem.name}
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
