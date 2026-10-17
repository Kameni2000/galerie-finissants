import Link from 'next/link';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { trouverEtudiant } from '@/app/lib/data';
import { deconnexion } from '../actions';
import CartePhoto from './CartePhoto';

export default function Galerie() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <Suspense fallback={<p className="text-gray-600">Chargement de vos photos…</p>}>
        <ContenuGalerie />
      </Suspense>
    </main>
  );
}

async function ContenuGalerie() {
  const code = (await cookies()).get('code_acces')?.value;
  const etudiant = code ? trouverEtudiant(code) : undefined;
  if (!etudiant) redirect('/');

  return (
    <>
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bonjour {etudiant.nom}</h1>
          <p className="text-gray-600">{etudiant.ecole} · {etudiant.photos.length} photos</p>
        </div>
        <div className="flex gap-4">
          <Link href="/panier" className="underline">Panier</Link>
          <form action={deconnexion}><button className="underline">Quitter</button></form>
        </div>
      </header>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {etudiant.photos.map((p) => (
          // on envoie seulement la miniature au navigateur, jamais la haute résolution
          <CartePhoto key={p.id} photo={{ id: p.id, miniature: p.miniature }} etudiant={etudiant.nom} />
        ))}
      </div>
    </>
  );
}
