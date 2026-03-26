"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { useLanguage } from "@/i18n/context";

export default function PartnerForm() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      location: formData.get("location"),
      interest: formData.get("interest"),
      additionalInfo: formData.get("additionalInfo"),
    };

    try {
      const response = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(t("partnerForm", "successMessage"));
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(t("partnerForm", "failedMessage"));
      }
    } catch (error) {
      toast.error(t("partnerForm", "errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-zinc-300 text-sm font-medium">
            {t("partnerForm", "name")} <span className="text-emerald-400">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
            placeholder={t("partnerForm", "yourFullName")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-zinc-300 text-sm font-medium">
            {t("partnerForm", "email")} <span className="text-emerald-400">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="location" className="text-zinc-300 text-sm font-medium">
            {t("partnerForm", "location")} <span className="text-emerald-400">*</span>
          </Label>
          <Input
            id="location"
            name="location"
            type="text"
            required
            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg"
            placeholder={t("partnerForm", "cityCountry")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interest" className="text-zinc-300 text-sm font-medium">
            {t("partnerForm", "interest")} <span className="text-emerald-400">*</span>
          </Label>
          <select
            id="interest"
            name="interest"
            required
            className="w-full h-10 px-3 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-colors"
          >
            <option value="" className="bg-zinc-800">{t("partnerForm", "selectInterest")}</option>
            <option value="rooftop-installation" className="bg-zinc-800">{t("partnerForm", "rooftopInstallation")}</option>
            <option value="wholesale" className="bg-zinc-800">{t("partnerForm", "wholesale")}</option>
            <option value="land-partnership" className="bg-zinc-800">{t("partnerForm", "landPartnership")}</option>
            <option value="other" className="bg-zinc-800">{t("partnerForm", "other")}</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalInfo" className="text-zinc-300 text-sm font-medium">
          {t("partnerForm", "additionalInfo")}
        </Label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          rows={4}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 resize-none transition-colors"
          placeholder={t("partnerForm", "additionalInfoPlaceholder")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          t("common", "submitting")
        ) : (
          <>
            {t("partnerForm", "submitInquiry")}
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
