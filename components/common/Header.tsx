import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-green-600 text-white p-4">
      <h1 className="text-4xl font-bold">
        <Link href="/search">GitHub Repository Viewer</Link>
      </h1>
    </header>
  );
}
