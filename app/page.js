import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/login">login</Link>
      <Link href="/user-stories">Story</Link>
    </main>
  );
}
