"use client";

import LoadingButton from "@/components/LoadingButton";
import Order from "@/components/Order";
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
          limit: 2,
          cursor: pageParam,
        });
      },
      enabled: hasClient,
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.metadata?.cursors?.next,
    });

  const orders = data?.pages.flatMap((page) => page.orders) || [];

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold ps-5 pt-2">Your orders</h2>
      {status === "pending" && <OrdersLoadingSkeleton />}
      {status === "error" && (
        <p className="text-destructive">Error fetching orders</p>
      )}
      {status === "success" && !orders.length && !hasNextPage && (
        <p>No orders yet</p>
      )}
      {orders.map((order) => (
        <Order key={order?._id} order={order!} />
      ))}
      {hasNextPage && (
        <LoadingButton
          loading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="rounded-none"
        >
          Load more orders
        </LoadingButton>
      )}
    </div>
  );
}

function OrdersLoadingSkeleton() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 2 }).map((_, i) => (
        <Skeleton key={i} className="h-64" />
      ))}
    </div>
  );
}
