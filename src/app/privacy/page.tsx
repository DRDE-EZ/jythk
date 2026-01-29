import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Jingyuntong Hong Kong (JYT HK).",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-[70vh] bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Privacy Policy
        </h1>
        <p className="text-xl text-zinc-400 mb-12 max-w-2xl">
          Your privacy matters to us. This policy explains how Jingyuntong Hong Kong collects, uses, and protects your information.
        </p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Information We Collect</h2>
            <p className="text-zinc-400">
              We collect information you provide directly, such as your name, email address, shipping address, and order details when you make a purchase or submit an inquiry.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">How We Use Your Information</h2>
            <p className="text-zinc-400">
              Your information is used to process orders, communicate about your account, provide customer support, and improve our services. We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Data Protection</h2>
            <p className="text-zinc-400">
              We implement industry-standard security measures to protect your personal information. All transactions are processed through secure, encrypted connections.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Contact Us</h2>
            <p className="text-zinc-400">
              If you have questions about this privacy policy, please contact us at{" "}
              <a href="mailto:info@jythk.com" className="text-emerald-400 hover:text-emerald-300">
                info@jythk.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
