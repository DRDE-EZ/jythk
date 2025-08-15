import { wixBrowserClient } from "@/lib/wix-client.browser";
import { updateMemberInfo, updateMemberInfoValues } from "@/wix-api/members";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useUpdateMember() {
  const router = useRouter();

  return useMutation({
    mutationFn: (variables: updateMemberInfoValues) => {
      if (!wixBrowserClient) {
        return Promise.reject(new Error("Wix client not initialized"));
      }
      return updateMemberInfo(wixBrowserClient, variables);
    },
    onSuccess() {
      toast.success("Profile updated!");
      setTimeout(() => {
        router.refresh();
      }, 2000);
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to update profile, please try again.");
    },
  });
}
