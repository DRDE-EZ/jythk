import { WixClient } from "@/lib/wix-client.base";
import { members } from "@wix/members";
import { cache } from "react";

export const getLoggedInMember = cache(
  async (wixClient: WixClient): Promise<members.Member | null> => {
    try {
      // Check if auth.loggedIn method exists (OAuth) or skip check (API Key)
      if (wixClient.auth.loggedIn && !wixClient.auth.loggedIn()) return null;

      const memberData = await wixClient.members.getCurrentMember({
        fieldsets: [members.Set.FULL],
      });

      return memberData.member || null;
    } catch (error) {
      // If API key auth doesn't support member authentication, return null
      console.log("Member authentication not available with API key");
      return null;
    }
  }
);

export interface updateMemberInfoValues {
  firstName: string;
  lastName: string;
}

export async function updateMemberInfo(
  wixClient: WixClient,
  { firstName, lastName }: updateMemberInfoValues
) {
  const loggedInMember = await getLoggedInMember(wixClient);

  if (!loggedInMember?._id) {
    throw new Error("No member id found");
  }

  return wixClient.members.updateMember(loggedInMember._id, {
    contact: {
      firstName,
      lastName,
    },
  });
}
