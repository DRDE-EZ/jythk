import WixImage from "@/components/WixImage";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { PlayIcon } from "lucide-react";
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
    <div className="flex flex-col items-center w-full">
      <div className="w-full">
        {selectedImage?.url ? (
          <Zoom>
            <WixImage
              mediaIdentifier={selectedImage.url}
              alt={selectedImage.altText}
              width={2000}
              height={2000}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </Zoom>
        ) : selectedVideo?.url ? (
          <div className="flex w-full items-center bg-black rounded-lg overflow-hidden">
            <video controls className="w-full h-auto">
              <source
                src={selectedVideo.url}
                type={`video/${selectedVideo.format}`}
              />
            </video>
          </div>
        ) : null}
      </div>

      {media.length > 1 && (
        <div className="mt-6 flex flex-wrap justify-center gap-4 w-full">
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
