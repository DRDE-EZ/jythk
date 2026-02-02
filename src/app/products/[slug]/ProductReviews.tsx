"use client";

import LoadingButton from "@/components/LoadingButton";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { getProductReviews } from "@/wix-api/reviews";
import { useInfiniteQuery } from "@tanstack/react-query";
import { reviews } from "@wix/reviews";
import { products } from "@wix/stores";
import { CornerDownRight, StarIcon, MessageSquare, ChevronDown } from "lucide-react";
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
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-400"
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
            <h4 className="font-medium text-white">Error loading reviews</h4>
            <p className="text-sm text-zinc-400">
              Unable to load product reviews. Please try again later.
            </p>
          </div>
        </div>
      )}

      {status === "success" && !reviewItems.length && !hasNextPage && (
        <div className="text-center py-16 space-y-4">
          <div className="w-20 h-20 mx-auto bg-zinc-800 rounded-full flex items-center justify-center">
            <MessageSquare className="w-10 h-10 text-zinc-600" />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-medium text-white">No reviews yet</h4>
            <p className="text-zinc-400 max-w-sm mx-auto">
              Be the first to share your experience with this product.
            </p>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {reviewItems.length > 0 && (
        <div className="space-y-4">
          {reviewItems.map((item) => (
            <Review key={item._id} review={item} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasNextPage && (
        <div className="flex justify-center pt-4">
          <LoadingButton
            loading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="px-6 py-3 rounded-lg font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700"
            disabled={isFetchingNextPage}
          >
            <span className="flex items-center gap-2">
              <ChevronDown className="w-4 h-4" />
              {isFetchingNextPage ? "Loading..." : "Load More Reviews"}
            </span>
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
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4 hover:border-zinc-700 transition-colors duration-200">
      {/* Review Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Star Rating */}
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "w-5 h-5",
                  i < (content?.rating || 0)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-zinc-700"
                )}
              />
            ))}
          </div>

          {/* Review Title */}
          {content?.title && (
            <h4 className="font-semibold text-white text-lg">
              {content.title}
            </h4>
          )}
        </div>

        {/* Author & Date */}
        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-emerald-400"
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
          <span className="font-medium text-white">
            {author?.authorName || "Anonymous"}
          </span>
          {reviewDate && (
            <>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-500">
                {new Date(reviewDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Review Content */}
      {content?.body && (
        <div className="text-zinc-300 leading-relaxed whitespace-pre-line">
          {content.body}
        </div>
      )}

      {/* Media Attachments */}
      {!!content?.media?.length && (
        <div className="flex flex-wrap gap-3 pt-2">
          {content.media.map((media) => (
            <MediaAttachment key={media.image || media.video} media={media} />
          ))}
        </div>
      )}

      {/* Company Reply */}
      {reply?.message && (
        <div className="mt-4 ml-4 pl-4 border-l-2 border-emerald-500/30 bg-zinc-800/50 rounded-r-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <CornerDownRight className="w-4 h-4 text-zinc-500" />
            <span className="font-semibold text-sm text-emerald-400">
              JYT HK Team
            </span>
          </div>
          <div className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">
            {reply.message}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProductReviewsLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Skeleton key={starIndex} className="w-5 h-5 bg-zinc-800" />
              ))}
            </div>
            <Skeleton className="h-6 w-32 bg-zinc-800" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full bg-zinc-800" />
            <Skeleton className="h-4 w-24 bg-zinc-800" />
            <Skeleton className="h-4 w-20 bg-zinc-800" />
          </div>
          <Skeleton className="h-16 w-full bg-zinc-800" />
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
          className="max-h-24 max-w-24 object-cover rounded-lg border border-zinc-700 hover:border-emerald-500/50 transition-colors cursor-pointer"
        />
      </Zoom>
    );
  }

  if (media.video) {
    return (
      <video
        controls
        className="max-h-24 max-w-24 rounded-lg border border-zinc-700"
      >
        <source src={wixMedia.getVideoUrl(media.video).url} type="video/mp4" />
      </video>
    );
  }

  return (
    <div className="max-h-24 max-w-24 bg-zinc-800 rounded-lg border border-zinc-700 flex items-center justify-center p-4">
      <span className="text-xs text-zinc-500 text-center">
        Unsupported media
      </span>
    </div>
  );
}
