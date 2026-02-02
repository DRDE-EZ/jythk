export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 rounded-full border-4 border-zinc-800" />
          {/* Spinning arc */}
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-emerald-500 animate-spin" />
          {/* Inner glow */}
          <div className="absolute inset-2 w-12 h-12 rounded-full bg-emerald-500/10 animate-pulse" />
        </div>
        {/* Loading text */}
        <p className="text-sm font-medium text-zinc-400 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
