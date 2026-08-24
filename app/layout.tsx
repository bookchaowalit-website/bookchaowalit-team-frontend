import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Team | Bookchaowalit",
  description: "People directory for a studio site.",
  keywords: ["team", "portfolio"],
  authors: [{ name: "Bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "Bookchaowalit",
  metadataBase: new URL("https://bookchaowalit.com"),
  openGraph: {
    type: "website",
    title: "Team | Bookchaowalit",
    description: "People directory for a studio site.",
    siteName: "Bookchaowalit",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
