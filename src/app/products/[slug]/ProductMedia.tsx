"use client";

import WixImage from "@/components/WixImage";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { PlayIcon, ZoomIn } from "lucide-react";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";

interface ProductMediaProps {
  media: products.MediaItem[] | undefined;
}

export default function ProductMedia({ media }: ProductMediaProps) {
  const [selectedMedia, setSelectedMedia] = useState(media?.[0]);

  useEffect(() => {
    setSelectedMedia(media?.[0]);
  }, [media]);

  if (!media?.length) return null;

  const selectedImage = selectedMedia?.image;
  const selectedVideo = selectedMedia?.video?.files?.[0];

  return (
    <div className="flex flex-col w-full space-y-4">
      {/* Main Image Display */}
      <div className="relative w-full aspect-square bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group">
        {selectedImage?.url ? (
          <Zoom>
            <div className="w-full h-full flex items-center justify-center p-4">
              <div
                key={selectedImage.url}
                className="w-full h-full animate-in fade-in duration-300"
              >
                <WixImage
                  mediaIdentifier={selectedImage.url}
                  alt={selectedImage.altText}
                  width={800}
                  height={800}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </Zoom>
        ) : selectedVideo?.url ? (
          <div
            key={selectedVideo.url}
            className="w-full h-full flex items-center justify-center bg-black animate-in fade-in duration-300"
          >
            <video controls className="max-w-full max-h-full">
              <source src={selectedVideo.url} type={`video/${selectedVideo.format}`} />
            </video>
          </div>
        ) : null}

        {/* Zoom hint */}
        {selectedImage?.url && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-zinc-800/80 backdrop-blur-sm rounded-full text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3.5 h-3.5" />
            Click to zoom
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {media && media.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
          {media.map((item, index) => (
            <MediaPreview
              key={item._id || index}
              mediaItem={item}
              isSelected={selectedMedia?._id === item._id}
              onSelect={() => setSelectedMedia(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface MediaPreviewProps {
  mediaItem: products.MediaItem;
  isSelected: boolean;
  onSelect: () => void;
}

function MediaPreview({ mediaItem, isSelected, onSelect }: MediaPreviewProps) {
  const imageUrl = mediaItem.image?.url;
  const stillFrameMediaId = mediaItem.video?.stillFrameMediaId;
  const thumbnailUrl = mediaItem.thumbnail?.url;
  const finalThumbnailUrl =
    stillFrameMediaId && stillFrameMediaId
      ? thumbnailUrl?.split(stillFrameMediaId)[0] + stillFrameMediaId
      : undefined;

  if (!imageUrl && !finalThumbnailUrl) return null;

  return (
    <button
      onClick={onSelect}
      className={cn(
        "relative flex-shrink-0 w-20 h-20 bg-zinc-900 rounded-lg overflow-hidden transition-all duration-200",
        "border-2 hover:border-emerald-500/50",
        isSelected
          ? "border-emerald-500 ring-2 ring-emerald-500/20"
          : "border-zinc-800"
      )}
    >
      <WixImage
        mediaIdentifier={imageUrl || finalThumbnailUrl}
        alt={mediaItem?.image?.altText || mediaItem.video?.files?.[0].altText}
        width={120}
        height={120}
        className="w-full h-full object-cover"
      />

      {/* Video indicator */}
      {finalThumbnailUrl && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/40">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <PlayIcon className="w-4 h-4 text-white fill-white" />
          </span>
        </span>
      )}

      {/* Selected indicator */}
      {isSelected && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-emerald-500 rounded-full" />
      )}
    </button>
  );
}
