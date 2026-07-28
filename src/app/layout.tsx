import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies, headers } from "next/headers";
import { auth } from "@/lib/auth";
import { ModeProvider, type Mode } from "@/lib/mode/ModeContext";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitExplain",
  description: "Fitness explained your way — simple or scientific.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });
  const cookieStore = await cookies();

  const sessionMode = (session?.user as { mode?: string } | undefined)?.mode;
  const initialMode: Mode =
    sessionMode === "scientific" || sessionMode === "simple"
      ? sessionMode
      : cookieStore.get("fitmode")?.value === "scientific"
        ? "scientific"
        : "simple";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <ModeProvider initialMode={initialMode}>
          <Header isLoggedIn={Boolean(session)} />
          <main className="flex-1">{children}</main>
        </ModeProvider>
      </body>
    </html>
  );
}
