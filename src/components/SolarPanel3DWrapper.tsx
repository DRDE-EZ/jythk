"use client";

import dynamic from "next/dynamic";

const SolarPanel3D = dynamic(() => import("@/components/SolarPanel3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  ),
});

interface SolarPanel3DWrapperProps {
  className?: string;
  modelPath?: string;
}

export default function SolarPanel3DWrapper({
  className,
  modelPath,
}: SolarPanel3DWrapperProps) {
  return <SolarPanel3D className={className} modelPath={modelPath} />;
}
