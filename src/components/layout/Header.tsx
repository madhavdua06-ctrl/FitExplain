import Link from "next/link";
import { Activity } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { ThemeToggle } from "./ThemeToggle";
import { LogoutButton } from "./LogoutButton";
import { MobileMenu } from "./MobileMenu";

export function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="no-print glass sticky top-0 z-20 border-b border-slate-200/80 dark:border-white/10">
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="logo-link flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <span className="logo-badge glow-cyan flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-white">
            <Activity className="h-[18px] w-[18px]" aria-hidden />
          </span>
          FitExplain
        </Link>

        <MobileMenu isLoggedIn={isLoggedIn} />

        <nav className="hidden items-center gap-6 sm:flex">
          <Link
            href="/topics"
            className="link-underline text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Topics
          </Link>
          <Link
            href="/tools"
            className="link-underline hidden text-sm font-medium text-slate-600 transition hover:text-slate-900 sm:inline dark:text-slate-300 dark:hover:text-white"
          >
            Tools
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                href="/journey"
                className="link-underline hidden text-sm font-medium text-slate-600 transition hover:text-slate-900 sm:inline dark:text-slate-300 dark:hover:text-white"
              >
                Journey
              </Link>
              <Link
                href="/stats"
                className="link-underline hidden text-sm font-medium text-slate-600 transition hover:text-slate-900 sm:inline dark:text-slate-300 dark:hover:text-white"
              >
                Stats
              </Link>
              <Link
                href="/dashboard"
                className="link-underline text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                Dashboard
              </Link>
            </>
          ) : null}

          <div className="flex items-center gap-2">
            <ModeToggle />
            <ThemeToggle />
          </div>

          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="btn-pop glow-cyan rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:from-cyan-400 hover:to-violet-500"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
