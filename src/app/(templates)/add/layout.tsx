import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="w-3/4 mx-auto">
          <Link href="/"><h1 className="text-2xl font-bold">確認画面ヘッダー</h1></Link>
        </div>
      </header>
      {children}
    </div>
  );
}