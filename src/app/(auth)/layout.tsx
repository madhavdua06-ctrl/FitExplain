export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[calc(100vh-73px)] items-center justify-center overflow-hidden px-4 py-12">
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/15"
        aria-hidden
      />
      <div className="glow-cyan glass relative w-full max-w-sm rounded-2xl p-8">{children}</div>
    </div>
  );
}
