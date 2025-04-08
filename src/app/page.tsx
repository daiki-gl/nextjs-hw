"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {

  const router = useRouter();

  const handleSearchType = (type: string) => {
    sessionStorage.setItem("searchType", type);
    router.push("/search");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex gap-[32px] row-start-2 items-center sm:items-start">
        <Link href="/search" onClick={() =>handleSearchType("list")} className="px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer">ボタンA</Link>
        <Link href="/search" onClick={() =>handleSearchType("details")} className="px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer">ボタンB</Link>
      </main>
    </div>
  );
}
