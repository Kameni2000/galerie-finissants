import Link from 'next/link';
import { Suspense } from 'react';

type Props = { searchParams: Promise<{ no?: string }> };

async function NumeroCommande({ searchParams }: Props) {
  const { no } = await searchParams;
  return <strong>{no}</strong>;
}

export default function Confirmation({ searchParams }: Props) {
  return (
    <main className="mx-auto mt-16 max-w-md p-6 text-center">
      <h1 className="mb-2 text-2xl font-bold">Merci !</h1>
      <p>
        Votre commande{' '}
        <Suspense>
          <NumeroCommande searchParams={searchParams} />
        </Suspense>{' '}
        est confirmée. Vous recevrez un courriel quand vos photos seront prêtes.
      </p>
      <Link href="/galerie" className="mt-6 block underline">Retour à la galerie</Link>
    </main>
  );
}
