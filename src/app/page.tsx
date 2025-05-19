import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Bem vindo ao Quality Flow</h1>
      <h2>Selecione uma opção:</h2>
      <nav>
        <ul>
          <li>
            {/* use o componente Link e passe o texto como filho */}
            <Link style={{color: "blue"}} href="/admin">Admin</Link>
          </li>
          <li>
            <Link style={{color: "blue"}} href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
