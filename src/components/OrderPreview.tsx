import { cn } from "@/lib/utils";
import { orders } from "@wix/ecom";
import { formatDate } from "date-fns";
import Link from "next/link";
import WixImage from "./WixImage";

interface OrderPreviewProps {
  order: orders.Order;
}

export default function OrderPreview({ order }: OrderPreviewProps) {
  const getPaymentStatusColor = (status: orders.PaymentStatus | undefined) => {
    switch (status) {
      case orders.PaymentStatus.PAID:
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800";
      case orders.PaymentStatus.NOT_PAID:
      case orders.PaymentStatus.DECLINED:
      case orders.PaymentStatus.CANCELED:
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800";
      case orders.PaymentStatus.PENDING:
      case orders.PaymentStatus.PENDING_MERCHANT:
        return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-300 dark:border-yellow-800";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getPaymentStatusText = (status: orders.PaymentStatus | undefined) => {
    switch (status) {
      case orders.PaymentStatus.PAID:
        return "Paid";
      case orders.PaymentStatus.NOT_PAID:
        return "Not paid";
      case orders.PaymentStatus.PENDING:
        return "Pending";
      case orders.PaymentStatus.DECLINED:
        return "Declined";
      case orders.PaymentStatus.CANCELED:
        return "Canceled";
      default:
        return "Unknown";
    }
  };

  const firstItem = order.lineItems?.[0];
  const itemCount = order.lineItems?.length || 0;

  return (
    <Link href={`/orders/${order._id}`} className="block group">
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md hover:border-primary/50 transition-all duration-300 group-hover:scale-[1.01]">
        <div className="flex items-center gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            {firstItem?.image ? (
              <WixImage
                mediaIdentifier={firstItem.image}
                width={60}
                height={60}
                alt={firstItem.productName?.translated || "Product image"}
                className="rounded-lg bg-background border border-border object-cover"
              />
            ) : (
              <div className="w-15 h-15 bg-muted rounded-lg border border-border flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-muted-foreground"
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
              </div>
            )}
          </div>

          {/* Order Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h4 className="font-semibold text-foreground text-sm md:text-base truncate">
                  Order #{order.number}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {order._createdDate &&
                    formatDate(order._createdDate, "MMM d, yyyy")}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-sm md:text-base text-foreground">
                  {order.priceSummary?.subtotal?.formattedAmount}
                </p>
                <span
                  className={cn(
                    "inline-block px-2 py-1 rounded text-xs font-medium border",
                    getPaymentStatusColor(
                      Object.values(orders.PaymentStatus).includes(
                        order.paymentStatus as orders.PaymentStatus
                      )
                        ? (order.paymentStatus as orders.PaymentStatus)
                        : undefined
                    )
                  )}
                >
                  {getPaymentStatusText(
                    Object.values(orders.PaymentStatus).includes(
                      order.paymentStatus as orders.PaymentStatus
                    )
                      ? (order.paymentStatus as orders.PaymentStatus)
                      : undefined
                  )}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex items-center justify-between">
              <p className="text-xs md:text-sm text-muted-foreground truncate">
                {firstItem?.productName?.translated}
                {itemCount > 1 && (
                  <span className="ml-1">
                    +{itemCount - 1} more item{itemCount - 1 !== 1 ? "s" : ""}
                  </span>
                )}
              </p>

              {/* View Details Arrow */}
              <svg
                className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
