import Input from "@/components/forms/Input";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <h1 className="my-10">Openraph Generator From Text To Image.</h1>
      <div className="layout">
        <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-8">
          <div className="flex flex-col gap-4">
            <Input label="Title" type="text" id="title" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-full h-full max-w-[600px] aspect-video bg-orange-400">
              hehe
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
