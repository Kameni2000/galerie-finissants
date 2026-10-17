'use client';
import { useMemo, useSyncExternalStore } from 'react';

type Commande = { no: string; date: string; etudiant: string; articles: unknown[]; total: number; statut: string };

function sAbonner(cb: () => void) {
  window.addEventListener('storage', cb);
  return () => window.removeEventListener('storage', cb);
}

function lireBrut() {
  try {
    return localStorage.getItem('commandes') ?? '[]';
  } catch {
    return '[]';
  }
}

export default function Studio() {
  const brut = useSyncExternalStore(sAbonner, lireBrut, () => '[]');
  const commandes = useMemo<Commande[]>(() => {
    try {
      return JSON.parse(brut);
    } catch {
      return [];
    }
  }, [brut]);

  const revenus = commandes.reduce((s, c) => s + c.total, 0);

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-1 text-2xl font-bold">Studio — commandes</h1>
      <p className="mb-4 text-gray-600">{commandes.length} commande(s) · {revenus} $</p>
      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr><th className="p-2">No</th><th className="p-2">Date</th><th className="p-2">Étudiant</th><th className="p-2">Articles</th><th className="p-2">Total</th><th className="p-2">Statut</th></tr>
        </thead>
        <tbody>
          {commandes.map((c) => (
            <tr key={c.no} className="border-t">
              <td className="p-2">{c.no}</td>
              <td className="p-2">{new Date(c.date).toLocaleString('fr-CA')}</td>
              <td className="p-2">{c.etudiant}</td>
              <td className="p-2">{c.articles.length}</td>
              <td className="p-2">{c.total} $</td>
              <td className="p-2">{c.statut}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-xs text-gray-400">Démo : commandes lues dans ce navigateur. En production : base de données et accès réservé au personnel.</p>
    </main>
  );
}