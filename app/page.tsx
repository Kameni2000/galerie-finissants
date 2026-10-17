import { Suspense } from 'react';
import { connexion } from './actions';

type Props = { searchParams: Promise<{ erreur?: string }> };

async function MessageErreur({ searchParams }: Props) {
  const { erreur } = await searchParams;
  return erreur ? <p className="text-sm text-red-600">Code invalide. Vérifiez votre courriel.</p> : null;
}

export default function Accueil({ searchParams }: Props) {
  return (
    <main className="mx-auto mt-16 max-w-md p-6">
      <h1 className="mb-2 text-2xl font-bold">Vos photos de finissant</h1>
      <p className="mb-6 text-gray-600">Entrez le code reçu par courriel.</p>
      <form action={connexion} className="space-y-3">
        <input name="code" required placeholder="Ex. FIN-2026-A1" className="w-full rounded border p-3" />
        <Suspense>
          <MessageErreur searchParams={searchParams} />
        </Suspense>
        <button className="w-full rounded bg-black p-3 text-white">Voir mes photos</button>
      </form>
      <p className="mt-8 text-xs text-gray-400">Démo — codes : FIN-2026-A1 ou FIN-2026-B2</p>
    </main>
  );
}
