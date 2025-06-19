/* eslint-disable @next/next/no-img-element */
import { ImgHTMLAttributes } from "react";
import { media as wixMedia } from "@wix/sdk";

type WixImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height" | "alt"
> & {
  mediaIdentifier: string | undefined;
  placeholder?: string;
  alt?: string | null | undefined;
} & (
    | {
        scaleToFill?: true;
        width: number;
        height: number;
      }
    | {
        scaleToFill: false;
      }
  );

export default function WixImage({
  mediaIdentifier,
  placeholder = "/placeholder.png",
  alt,
  ...props
}: WixImageProps) {
  let imageUrl: string | undefined;

  if (mediaIdentifier) {
    imageUrl =
      props.scaleToFill || props.scaleToFill === undefined
        ? wixMedia.getScaledToFillImageUrl(
            mediaIdentifier,
            props.width,
            props.height,
            {}
          )
        : wixMedia.getImageUrl(mediaIdentifier).url;
  } else if (placeholder) {
    imageUrl = placeholder;
  }

  // ✅ Final guard — don't render if imageUrl is still empty
  if (!imageUrl) return null;

  return <img src={imageUrl} alt={alt || "Media preview"} {...props} />;
}
