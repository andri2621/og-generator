import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <div className="layout">
        <div className="min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-xl md:text-3xl font-bold text-center">
            Opengraph Generator
          </h1>

          <div className="text-sm text-neutral-400">
            For personal use. Created with
            <Link
              href="https://vercel.com/docs/functions/edge-functions/og-image-generation"
              target="_blank"
              className="ml-2 font-bold text-neutral-300 cursor-new-tab hover:text-teal-500"
            >
              @vercel/og
            </Link>
          </div>

          <div className="flex flex-row gap-4">
            <Link
              href="https://github.com/andri2621/og-generator"
              target="_blank"
              className="cursor-new-tab bg-teal-500 hover:bg-teal-600 rounded-md px-2 h-10 flex justify-center items-center text-black font-bold mt-10"
            >
              Repository
            </Link>
            <Link
              href="/generator"
              className="rounded-md px-2 h-10 flex justify-center items-center text-teal-500 font-bold mt-10 border-2 border-teal-500 hover:border-teal-600 hover:text-teal-600"
            >
              Generator
            </Link>
          </div>

          <footer className="absolute text-white bottom-2 font-light text-sm">
            © {new Date().getFullYear()} By{" "}
            <Link
              href="https://awandri.com"
              className="cursor-new-tab font-bold hover:text-teal-500 text-md underline decoration-double"
            >
              Andi Setiawan
            </Link>
          </footer>
        </div>
      </div>
    </main>
  );
}
