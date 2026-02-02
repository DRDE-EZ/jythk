import { UnifiedWixClient } from "@/lib/wix-client.base";
import { getLoggedInMember } from "./members";

export interface CreateProductReviewValues {
  productId: string;
  title: string;
  body: string;
  rating: number;
  media: { url: string; type: "image" | "video" }[];
}

export async function createProductReview(
  wixClient: UnifiedWixClient,
  { productId, title, body, rating, media }: CreateProductReviewValues
) {
  const member = await getLoggedInMember(wixClient);

  if (!member) {
    throw new Error("Must be logged in to create a review!");
  }

  const authorName =
    member.contact?.firstName && member.contact.lastName
      ? `${member.contact.firstName} ${member.contact.lastName}`
      : member.contact?.firstName ||
        member.contact?.lastName ||
        member.profile?.nickname ||
        "Anonymous";

  return wixClient.reviews.createReview({
    author: {
      authorName,
      contactId: member.contactId,
    },
    entityId: productId,
    namespace: "stores",
    content: {
      title,
      body,
      rating,
      media: media.map(({ url, type }) =>
        type === "image" ? { image: url } : { video: url }
      ),
    },
  });
}

interface GetProductReviewsFilters {
  productId: string;
  contactId?: string;
  limit?: number;
  cursor?: string | null;
}

export async function getProductReviews(
  wixClient: UnifiedWixClient,
  { productId, contactId, limit, cursor }: GetProductReviewsFilters
) {
  try {
    let query = wixClient.reviews.queryReviews().eq("entityId", productId);

    if (contactId) {
      query = query.eq("author.contactId", contactId);
    }

    if (limit) {
      query = query.limit(limit);
    }

    // Only use skipTo if cursor is a valid non-empty string
    if (cursor && typeof cursor === 'string' && cursor.length > 0) {
      query = query.skipTo(cursor);
    }

    return await query.find();
  } catch (error: any) {
    // If the Reviews app is not installed or there's a GUID error, return empty results
    if (
      error?.details?.applicationError?.code === "APP_NOT_INSTALLED" ||
      error?.message?.includes("not a valid GUID")
    ) {
      return {
        items: [],
        cursors: { next: undefined, prev: undefined },
      };
    }
    throw error;
  }
}
