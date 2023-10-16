import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Awandri | OG Generator",
  description: "Opengraph Generator From Text to Image Using Vercel OG.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer className=" text-white font-light text-sm flex justify-center items-center mt-[-2rem]">
          © {new Date().getFullYear()} By
          <Link
            href="https://awandri.com"
            className="cursor-new-tab font-bold hover:text-teal-500 text-md underline decoration-double ml-2"
          >
            Awandri
          </Link>
        </footer>
      </body>
    </html>
  );
}
