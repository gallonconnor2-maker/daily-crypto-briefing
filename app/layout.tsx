import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

// ---------------------------------------------------------------------------
// IMPORTANT: replace APP_URL with your real deployed URL before publishing,
// and re-validate this embed against the official Embed Tool in Farcaster's
// Developer Tools — the Mini App embed schema evolves, so treat this object
// as a starting point, not gospel. https://miniapps.farcaster.xyz/docs/specification
// ---------------------------------------------------------------------------
const APP_URL = "https://your-app.vercel.app";

const miniAppEmbed = {
  version: "1",
  imageUrl: `${APP_URL}/og-image.png`,
  button: {
    title: "Answer today's question",
    action: {
      type: "launch_miniapp",
      name: "Daily Crypto Briefing",
      url: APP_URL,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: "#0E1420",
    },
  },
};

export const metadata: Metadata = {
  title: "Daily Crypto Briefing",
  description: "One crypto question a day. Answer, discuss, tip.",
  other: {
    "fc:miniapp": JSON.stringify(miniAppEmbed),
    // Kept for backward compatibility with older Farcaster clients.
    "fc:frame": JSON.stringify(miniAppEmbed),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
