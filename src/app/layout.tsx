import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies, headers } from "next/headers";
import { auth } from "@/lib/auth";
import { ModeProvider, type Mode } from "@/lib/mode/ModeContext";
import { ThemeProvider, type Theme } from "@/lib/theme/ThemeContext";
import { ToastProvider } from "@/lib/toast/ToastContext";
import { Header } from "@/components/layout/Header";
import { TutorialOverlay } from "@/components/tutorial/TutorialOverlay";
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

  const initialTheme: Theme = cookieStore.get("fittheme")?.value === "light" ? "light" : "dark";

  const showTutorial =
    Boolean(session) &&
    (session?.user as { hasSeenTutorial?: boolean } | undefined)?.hasSeenTutorial !== true;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${initialTheme === "dark" ? "dark" : ""} h-full antialiased`}
    >
      <body className="bg-grid min-h-full flex flex-col">
        <ThemeProvider initialTheme={initialTheme}>
          <ModeProvider initialMode={initialMode}>
            <ToastProvider>
              <Header isLoggedIn={Boolean(session)} />
              <TutorialOverlay show={showTutorial} />
              <main className="flex-1">{children}</main>
            </ToastProvider>
          </ModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
