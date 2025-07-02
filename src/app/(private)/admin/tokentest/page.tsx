"use client"

import { useEffect, useState } from "react"

interface TestResult {
  endpoint: string;
  success: boolean;
  message: string;
  error?: string;
  data?: any;
}

export default function TokenTest() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setCarregando(true);
      const testResults: TestResult[] = [];

      // Teste 1: Endpoint original
      try {
        const res1 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin-only`, {
          credentials: "include",
        });
        
        if (!res1.ok) {
          testResults.push({
            endpoint: '/auth/admin-only',
            success: false,
            message: `Erro ${res1.status}: ${res1.statusText}`,
            error: res1.status === 401 ? "Usuário não autenticado" : "Acesso negado"
          });
        } else {
          const data1 = await res1.json();
          testResults.push({
            endpoint: '/auth/admin-only',
            success: true,
            message: '✅ Acesso permitido',
            data: data1
          });
        }
      } catch (e: any) {
        testResults.push({
          endpoint: '/auth/admin-only',
          success: false,
          message: '❌ Erro de conexão',
          error: e.message
        });
      }

      // Teste 2: Novo endpoint
      try {
        const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/global-admin/system-config`, {
          method: 'GET',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!res2.ok) {
          let errorMsg = `Erro ${res2.status}: ${res2.statusText}`;
          if (res2.status === 401) {
            errorMsg = "Usuário não autenticado - Token inválido ou expirado";
          } else if (res2.status === 403) {
            errorMsg = "Acesso negado - Usuário não tem permissão de admin global";
          }
          
          testResults.push({
            endpoint: '/auth/global-admin/system-config',
            success: false,
            message: `❌ ${errorMsg}`,
            error: errorMsg
          });
        } else {
          const data2 = await res2.json();
          testResults.push({
            endpoint: '/auth/global-admin/system-config',
            success: true,
            message: '✅ Autenticação bem-sucedida!',
            data: data2
          });
        }
      } catch (e: any) {
        testResults.push({
          endpoint: '/auth/global-admin/system-config',
          success: false,
          message: '❌ Erro de conexão',
          error: e.message
        });
      }

      setResults(testResults);
      setCarregando(false);
    };
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Teste de Autenticação - Múltiplos Endpoints</h1>
      
      {carregando ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-blue-600">🔄 Testando endpoints...</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl space-y-4">
          {results.map((result, index) => (
            <div 
              key={index}
              className={`p-6 rounded-lg shadow-md ${
                result.success 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <h3 className="font-semibold text-lg mb-2">
                {result.success ? '✅' : '❌'} {result.endpoint}
              </h3>
              <p className={`font-medium mb-3 ${
                result.success ? 'text-green-700' : 'text-red-700'
              }`}>
                {result.message}
              </p>
              
              {result.error && (
                <div className="bg-white p-3 rounded border mb-3">
                  <p className="text-red-600 text-sm">{result.error}</p>
                </div>
              )}
              
              {result.data && (
                <div className="bg-white p-3 rounded border">
                  <p className="text-gray-700 text-sm font-medium mb-2">Dados recebidos:</p>
                  <pre className="text-xs text-gray-800 whitespace-pre-wrap overflow-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8 text-gray-500 text-sm text-center max-w-2xl">
        <p>Esta página testa se o usuário está autenticado em ambos os endpoints.</p>
        <p className="mt-2">
          <strong>Verde</strong> = Acesso permitido | <strong>Vermelho</strong> = Acesso negado
        </p>
      </div>
    </div>
  );
} 