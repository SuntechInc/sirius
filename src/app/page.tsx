import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Bem vindo ao Quality Flow</h1>
      <nav>
        <ul>
          <li>
            <Link href="/admin">Admin</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}