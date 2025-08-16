"use client";

import { members } from "@wix/members";
import { products } from "@wix/stores";
import { useState } from "react";
import { Button } from "../ui/button";
import CreateProductReviewDialog from "./CreateProductReviewDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useSearchParams } from "next/navigation";

interface CreateProductReviewButtonProps {
  product: products.Product;
  loggedInMember: members.Member | null;
  hasExistingReview: boolean;
}

export default function CreateProductReviewButton({
  product,
  loggedInMember,
  hasExistingReview,
}: CreateProductReviewButtonProps) {
  const searchParams = useSearchParams();
  const [showReviewDialog, setShowReviewDialog] = useState(
    searchParams.has("createReview")
  );
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start">
      <Button
        disabled={!loggedInMember}
        onClick={() => setShowReviewDialog(true)}
        className="group relative overflow-hidden bg-primary hover:bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 min-w-[160px]"
      >
        <span className="relative z-10 flex items-center gap-2">
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
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          {loggedInMember ? "Write a Review" : "Log in to Review"}
        </span>
        <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
      </Button>

      {!loggedInMember && (
        <p className="text-sm text-muted-foreground mt-2 sm:mt-3">
          Please log in to share your experience with this product
        </p>
      )}

      <CreateProductReviewDialog
        product={product}
        open={showReviewDialog && !hasExistingReview && !!loggedInMember}
        onOpenChange={setShowReviewDialog}
        onSubmitted={() => {
          setShowReviewDialog(false);
          setShowConfirmationDialog(true);
        }}
      />

      <ReviewSubmittedDialog
        open={showConfirmationDialog}
        onOpenChange={setShowConfirmationDialog}
      />

      <ReviewAlreadyExistsDialog
        open={showReviewDialog && hasExistingReview}
        onOpenChange={setShowReviewDialog}
      />
    </div>
  );
}

interface ReviewSubmittedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ReviewSubmittedDialog({
  open,
  onOpenChange,
}: ReviewSubmittedDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl border-border">
        <DialogHeader className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <DialogTitle className="text-center text-2xl">
            Thank you for your review!
          </DialogTitle>
          <DialogDescription className="text-center leading-relaxed">
            Your review has been submitted successfully and is now under review.
            It will be visible to other customers once our team approves it.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <Button
            onClick={() => onOpenChange(false)}
            className="rounded-lg px-8"
          >
            Perfect!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface ReviewAlreadyExistsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ReviewAlreadyExistsDialog({
  open,
  onOpenChange,
}: ReviewAlreadyExistsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl border-border">
        <DialogHeader className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-950/30 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <DialogTitle className="text-center text-2xl">
            Review Already Exists
          </DialogTitle>
          <DialogDescription className="text-center leading-relaxed">
            You have already written a review for this product. Each customer
            can only submit one review per product to maintain authenticity.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="rounded-lg px-8"
          >
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
