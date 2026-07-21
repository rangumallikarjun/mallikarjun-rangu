import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Full Stack Developer",
  description:
    "Full stack developer portfolio — projects, skills, and experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-foreground selection:bg-primary/30 selection:text-white">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(15, 15, 26, 0.9)",
              color: "#e5e7eb",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
            },
          }}
        />
      </body>
    </html>
  );
}
