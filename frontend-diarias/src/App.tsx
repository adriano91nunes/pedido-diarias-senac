import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  // Estado local na memória RAM do navegador para guardar as diárias
  const [diarias, setDiarias] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  // O useEffect roda assim que a SPA é carregada no navegador (Client-Side Rendering)
  useEffect(() => {
    axios.get('http://localhost:3000/diarias?page=1&limit=10')
      .then((resposta) => {
        // Armazena o array que veio da nossa API/Cache no estado do React
        setDiarias(resposta.data.dados); 
        setCarregando(false);
      })
      .catch((erro) => {
        console.error("Erro ao buscar diárias do NestJS:", erro);
        setCarregando(false);
      });
  }, []);

  if (carregando) return <h2>Carregando Diárias da API Pública...</h2>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🏛️ Sistema de Gestão de Diárias (SGDOP)</h1>
      <p>Interface SPA renderizada no cliente consumindo API NestJS.</p>
      
      <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>ID</th>
            <th>Destino</th>
            <th>Pernoite?</th>
            <th>Valor Total</th>
            <th>Servidor Solicitante</th>
          </tr>
        </thead>
        <tbody>
          {diarias.map((diaria) => (
            <tr key={diaria.id}>
              <td>{diaria.id}</td>
              <td>{diaria.destino}</td>
              <td>{diaria.temPernoite ? '✅ Sim' : '❌ Não'}</td>
              <td>R$ {diaria.valorTotal.toFixed(2)}</td>
              <td>{diaria.servidor?.nome || 'Não vinculado'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}