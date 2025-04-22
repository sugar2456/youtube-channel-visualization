import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-red-500 text-white p-4 shadow-md">
      <h1 className="text-4xl font-bold text-center">
        <Link href="/">Youtube Channel Search</Link>
      </h1>
    </header>
  );
}
