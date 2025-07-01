"use client"

import { useEffect, useState } from "react"

export default function TokenTest() {
  const [mensagem, setMensagem] = useState<string>("");
  const [erro, setErro] = useState<string>("");
  const [carregando, setCarregando] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setCarregando(true);
      setErro("");
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin-only`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Acesso negado ou token inválido");
        const data = await res.json();
        setMensagem(data.message || JSON.stringify(data));
      } catch (e: any) {
        setErro(e.message || "Erro desconhecido");
      } finally {
        setCarregando(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Teste de Token (Guard)</h1>
      {carregando ? (
        <p className="text-gray-500">Carregando...</p>
      ) : erro ? (
        <p className="text-red-600">Erro: {erro}</p>
      ) : (
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-green-700 font-mono">{mensagem}</p>
        </div>
      )}
      <p className="mt-6 text-gray-400 text-xs">Esta página serve apenas para testar se o guard da API está funcionando corretamente.</p>
    </div>
  );
} 