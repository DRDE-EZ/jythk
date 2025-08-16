"use client";

import LoadingButton from "@/components/LoadingButton";
import OrderPreview from "@/components/OrderPreview"; // Using the new compact component
import { Skeleton } from "@/components/ui/skeleton";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { getUserOrders } from "@/wix-api/orders";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function Orders() {
  const hasClient = !!wixBrowserClient;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["orders"],
      queryFn: async ({ pageParam }) => {
        if (!wixBrowserClient) throw new Error("Wix client not initialized");
        return getUserOrders(wixBrowserClient, {
          limit: 5, // Increased limit since previews are smaller
          cursor: pageParam,
        });
      },
      enabled: hasClient,
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.metadata?.cursors?.next,
    });

  const orders = data?.pages.flatMap((page) => page.orders) || [];

  return (
    <div className="space-y-6">
      {/* Orders Header */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
          <svg
            className="w-5 h-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          Your Orders
        </h3>
        <p className="text-sm text-muted-foreground">
          Click on any order to view full details
        </p>
      </div>

      {/* Orders Content */}
      <div className="space-y-3">
        {status === "pending" && <OrdersLoadingSkeleton />}

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
                Error loading orders
              </h4>
              <p className="text-sm text-muted-foreground">
                There was a problem fetching your orders. Please try again.
              </p>
            </div>
          </div>
        )}

        {status === "success" && !orders.length && !hasNextPage && (
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-medium text-foreground">
                No orders yet
              </h4>
              <p className="text-muted-foreground max-w-sm mx-auto">
                You haven&apos;t placed any orders yet. Start shopping to see
                your order history here.
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/shop")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Start Shopping
            </button>
          </div>
        )}

        {/* Orders List - Using Compact Previews */}
        {orders.length > 0 && (
          <div className="space-y-3">
            {orders.map((order, index) => (
              <div
                key={order?._id}
                className="transform transition-all duration-300"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <OrderPreview order={order!} />
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
                  Loading...
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
                  Load More Orders
                </span>
              )}
            </LoadingButton>
          </div>
        )}
      </div>
    </div>
  );
}

function OrdersLoadingSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 border border-border rounded-lg"
        >
          <Skeleton className="w-15 h-15 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="text-right space-y-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
