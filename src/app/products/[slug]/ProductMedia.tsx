import WixImage from "@/components/WixImage";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";

interface ProductMediaProps {
  media: products.MediaItem[] | undefined;
  showThumbnails?: boolean;
  isGallery?: boolean;
}

export default function ProductMedia({ media, showThumbnails = true, isGallery = false }: ProductMediaProps) {
  const [selectedMedia, setSelectedMedia] = useState(media?.[0]);

  useEffect(() => {
    setSelectedMedia(media?.[0]);
  }, [media]);

  if (!media?.length) return null;

  const selectedImage = selectedMedia?.image;
  const selectedVideo = selectedMedia?.video?.files?.[0];

  // Gallery view - show all images in a grid
  if (isGallery && media && media.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((item) => {
          const image = item.image;
          const video = item.video?.files?.[0];
          
          return (
            <div key={item._id} className="w-full bg-white rounded-lg overflow-hidden">
              {image?.url ? (
                <Zoom>
                  <WixImage
                    mediaIdentifier={image.url}
                    alt={image.altText}
                    width={800}
                    height={800}
                    className="w-full h-auto object-contain rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  />
                </Zoom>
              ) : video?.url ? (
                <div className="flex w-full items-center bg-black rounded-lg overflow-hidden">
                  <video controls className="w-full h-auto">
                    <source
                      src={video.url}
                      type={`video/${video.format}`}
                    />
                  </video>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }

  // Standard product view with main image
  return (
    <div className="flex flex-col items-center lg:items-start w-full">
      <div className="w-full bg-white rounded-lg overflow-hidden flex items-center justify-center p-4">
        {selectedImage?.url ? (
          <Zoom>
            <WixImage
              mediaIdentifier={selectedImage.url}
              alt={selectedImage.altText}
              width={800}
              height={800}
              className="w-full h-auto object-contain max-h-[600px]"
            />
          </Zoom>
        ) : selectedVideo?.url ? (
          <div className="flex w-full h-full items-center justify-center bg-black">
            <video controls className="max-w-full max-h-full">
              <source
                src={selectedVideo.url}
                type={`video/${selectedVideo.format}`}
              />
            </video>
          </div>
        ) : null}
      </div>

      {showThumbnails && media && media.length > 1 && (
        <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-4">
          {media.map((item) => (
            <MediaPreview
              key={item._id}
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
    <div
      className={cn(
        "relative cursor-pointer bg-secondary rounded-md overflow-hidden transition-all hover:ring-2 hover:ring-primary",
        isSelected && "ring-2 ring-primary"
      )}
    >
      <WixImage
        mediaIdentifier={imageUrl || finalThumbnailUrl}
        alt={mediaItem?.image?.altText || mediaItem.video?.files?.[0].altText}
        width={120}
        height={120}
        onClick={onSelect}
        className="object-cover"
      />
      {finalThumbnailUrl && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 rounded-full size-9 flex items-center justify-center">
          <PlayIcon size={5} className="text-white/50" />
        </span>
      )}
    </div>
  );
}
