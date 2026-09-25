import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://robotecs.tech"),
  title: { default: "RobotECS | FRC Team 12394", template: "%s — RobotECS" },
  description: "RobotECS is FIRST Robotics Competition (FRC) Team 12394 at Evergreen Christian School in Loudoun County, Virginia. Meet our student-led robotics team.",
  openGraph: {
    type: "website",
    siteName: "RobotECS",
    title: "RobotECS | FRC Team 12394",
    description: "Meet RobotECS, FIRST Robotics Competition Team 12394 at Evergreen Christian School in Loudoun County, Virginia.",
    url: "https://robotecs.tech/",
  },
  icons: { icon: "/assets/robotecs-eagle.png", shortcut: "/assets/robotecs-eagle.png", apple: "/assets/robotecs-eagle.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
