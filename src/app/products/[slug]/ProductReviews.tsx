"use client";

import LoadingButton from "@/components/LoadingButton";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { getProductReviews } from "@/wix-api/reviews";
import { useInfiniteQuery } from "@tanstack/react-query";
import { reviews } from "@wix/reviews";
import { products } from "@wix/stores";
import { CornerDownRight, StarIcon } from "lucide-react";
import logo from "@/assets/mycro-logo-mini.png";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import WixImage from "@/components/WixImage";
import { media as wixMedia } from "@wix/sdk";

interface ProductReviewsProps {
  product: products.Product;
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["product-reviews", product._id],
      queryFn: async ({ pageParam }) => {
        if (!product._id) throw Error("Product ID missing");
        if (!wixBrowserClient) throw new Error("Wix client not initialized");

        const pageSize = 3;

        return getProductReviews(wixBrowserClient, {
          productId: product._id,
          limit: pageSize,
          cursor: pageParam,
        });
      },
      select: (data) => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          items: page.items.filter(
            (item) =>
              item.moderation?.moderationStatus ===
              reviews.ModerationModerationStatus.APPROVED
          ),
        })),
      }),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.cursors.next,
    });

  const reviewItems = data?.pages.flatMap((page) => page.items) || [];

  return (
    <div className="space-y-6">
      {status === "pending" && <ProductReviewsLoadingSkeleton />}

      {status === "error" && (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-950/20 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-foreground">
              Error loading reviews
            </h4>
            <p className="text-sm text-muted-foreground">
              Unable to load product reviews. Please try again later.
            </p>
          </div>
        </div>
      )}

      {status === "success" && !reviewItems.length && !hasNextPage && (
        <div className="text-center py-12 space-y-4">
          <div className="w-20 h-20 mx-auto bg-muted/30 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-medium text-foreground">
              No reviews yet
            </h4>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Be the first to share your experience with this product.
            </p>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {reviewItems.length > 0 && (
        <div className="space-y-6">
          {reviewItems.map((item, index) => (
            <div
              key={item._id}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <Review review={item} />
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasNextPage && (
        <div className="flex justify-center pt-4">
          <LoadingButton
            loading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="rounded-lg font-medium bg-muted hover:bg-muted/80 text-muted-foreground border border-border"
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading reviews...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                Load More Reviews
              </span>
            )}
          </LoadingButton>
        </div>
      )}
    </div>
  );
}

interface ReviewProps {
  review: reviews.Review;
}

function Review({
  review: { author, reviewDate, content, reply },
}: ReviewProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow duration-300">
      {/* Review Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {/* Star Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "w-5 h-5",
                  i < (content?.rating || 0)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                )}
              />
            ))}
          </div>

          {/* Review Title */}
          {content?.title && (
            <h4 className="font-semibold text-foreground text-lg">
              {content.title}
            </h4>
          )}
        </div>

        {/* Author & Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <span className="font-medium">
            {author?.authorName || "Anonymous"}
          </span>
          {reviewDate && (
            <>
              <span>•</span>
              <span>{new Date(reviewDate).toLocaleDateString()}</span>
            </>
          )}
        </div>
      </div>

      {/* Review Content */}
      {content?.body && (
        <div className="text-foreground leading-relaxed whitespace-pre-line">
          {content.body}
        </div>
      )}

      {/* Media Attachments */}
      {!!content?.media?.length && (
        <div className="flex flex-wrap gap-3">
          {content.media.map((media) => (
            <MediaAttachment key={media.image || media.video} media={media} />
          ))}
        </div>
      )}

      {/* Company Reply */}
      {reply?.message && (
        <div className="mt-4 ml-4 pl-4 border-l-2 border-primary/20 bg-muted/30 rounded-r-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <CornerDownRight className="w-4 h-4 text-muted-foreground" />
            <Image
              src={logo}
              alt="MycroPC logo"
              width={20}
              height={20}
              className="rounded"
            />
            <span className="font-semibold text-sm text-primary">
              MycroPC Team
            </span>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {reply.message}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProductReviewsLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-card border border-border rounded-lg p-6 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Skeleton key={starIndex} className="w-5 h-5" />
              ))}
            </div>
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-16 w-full" />
        </div>
      ))}
    </div>
  );
}

interface MediaAttachmentProps {
  media: reviews.Media;
}

function MediaAttachment({ media }: MediaAttachmentProps) {
  if (media.image) {
    return (
      <Zoom>
        <WixImage
          scaleToFill={false}
          mediaIdentifier={media.image}
          alt="Review media"
          className="max-h-32 max-w-32 object-cover rounded-lg border border-border hover:shadow-md transition-shadow duration-300 cursor-pointer"
        />
      </Zoom>
    );
  }

  if (media.video) {
    return (
      <video
        controls
        className="max-h-32 max-w-32 rounded-lg border border-border"
      >
        <source src={wixMedia.getVideoUrl(media.video).url} type="video/mp4" />
      </video>
    );
  }

  return (
    <div className="max-h-32 max-w-32 bg-muted rounded-lg border border-border flex items-center justify-center p-4">
      <span className="text-xs text-muted-foreground text-center">
        Unsupported media type
      </span>
    </div>
  );
}
