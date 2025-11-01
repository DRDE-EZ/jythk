import { getWixServerClient } from "@/lib/wix-client-server";
import { getLoggedInMember } from "@/wix-api/members";
import { Metadata } from "next";
import NotFound from "../not-found";
import MemberInfoForm from "./MemberInfoForm";
import Orders from "./Orders";

export const metadata: Metadata = {
  title: "Profile - MycroPc",
  description: "Manage your personal profile and view order history",
};

export default async function Page() {
  const member = await getLoggedInMember(await getWixServerClient());

  if (!member) NotFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div style={{ background: 'linear-gradient(to bottom right, #f3f4f6, #e5e7eb, #ffffff)' }} className="py-16 sm:py-20 md:py-24 border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(to bottom right, #1a4ba8, #1565c0)' }}>
              <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 sm:w-14 sm:h-14"
                  style={{ color: '#1a4ba8' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>

            {/* Welcome Text */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black">
                Your Profile
              </h1>
              <div className="w-24 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(to right, #1a4ba8, #1565c0)' }}></div>
              <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
                Manage your account details and view your order history
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Profile Information Card */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, #1a4ba8, #1565c0)' }}></div>
              <h2 className="text-2xl md:text-3xl font-bold text-black">
                Account Information
              </h2>
            </div>

            <div className="bg-white border-2 border-black rounded-xl p-6 md:p-8 shadow-sm">
              <MemberInfoForm loggedInMember={member!} />
            </div>
          </div>

          {/* Orders Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, #1565c0, #1a4ba8)' }}></div>
              <h2 className="text-2xl md:text-3xl font-bold text-black">
                Order History
              </h2>
            </div>

            <div className="bg-white border-2 border-black rounded-xl p-6 md:p-8 shadow-sm">
              <Orders />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
