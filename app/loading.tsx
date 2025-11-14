export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
        <p className="text-sm text-white/60">Loading...</p>
      </div>
    </div>
  );
}
