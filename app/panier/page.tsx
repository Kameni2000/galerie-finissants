'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FORMATS, prixFormat } from '@/app/lib/formats';
import { usePanier } from '../PanierProvider';

export default function PagePanier() {
  const { articles, retirer, vider } = usePanier();
  const router = useRouter();
  const total = articles.reduce((somme, a) => somme + prixFormat(a.formatId), 0);

  function commander() {
    const commande = {
      no: Date.now().toString(36).toUpperCase(),
      date: new Date().toISOString(),
      etudiant: articles[0]?.etudiant ?? '',
      articles,
      total,
      statut: 'Reçue',
    };
    const toutes = JSON.parse(localStorage.getItem('commandes') ?? '[]');
    localStorage.setItem('commandes', JSON.stringify([commande, ...toutes]));
    vider();
    router.push(`/confirmation?no=${commande.no}`);
  }

  if (articles.length === 0)
    return (
      <main className="mx-auto max-w-xl p-6">
        <p>Votre panier est vide.</p>
        <Link href="/galerie" className="underline">Retour à la galerie</Link>
      </main>
    );

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Panier</h1>
      <ul className="divide-y rounded border">
        {articles.map((a, i) => (
          <li key={i} className="flex items-center justify-between p-3">
            <span>Photo {a.photoId} — {FORMATS.find((f) => f.id === a.formatId)?.nom}</span>
            <span className="flex items-center gap-3">
              {prixFormat(a.formatId)} $
              <button onClick={() => retirer(i)} className="text-sm text-red-600">Retirer</button>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-right text-lg font-bold">Total : {total} $</p>
      <button onClick={commander} className="mt-4 w-full rounded bg-black p-3 text-white">
        Commander (paiement simulé)
      </button>
      <Link href="/galerie" className="mt-3 block text-center underline">Continuer mes achats</Link>
    </main>
  );
}