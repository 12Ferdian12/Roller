import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "toastify-js/src/toastify.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Class Roller",
  description: "Informasi rolling meja Kelas XI-4!!!",
  icons: {
    icon: "/img/XI-4.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-Cream`}
      >
        {children}
      </body>
    </html>
  );
}
