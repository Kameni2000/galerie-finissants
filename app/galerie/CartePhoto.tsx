'use client';
import { useState } from 'react';
import { FORMATS } from '@/app/lib/formats';
import { usePanier } from '../PanierProvider';

export default function CartePhoto({ photo, etudiant }: { photo: { id: string; miniature: string }; etudiant: string }) {
  const { ajouter } = usePanier();
  const [format, setFormat] = useState(FORMATS[0].id);
  const [ajoute, setAjoute] = useState(false);

  return (
    <div className="overflow-hidden rounded border">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.miniature} alt={`Photo ${photo.id}`} loading="lazy" className="aspect-[4/5] w-full object-cover" />
        <span className="pointer-events-none absolute inset-0 flex select-none items-center justify-center -rotate-30 text-3xl font-bold text-white/60">
          APERÇU
        </span>
      </div>
      <div className="flex gap-2 p-3">
        <select value={format} onChange={(e) => setFormat(e.target.value)} className="flex-1 rounded border p-1">
          {FORMATS.map((f) => (
            <option key={f.id} value={f.id}>{f.nom} — {f.prix} $</option>
          ))}
        </select>
        <button
          onClick={() => { ajouter({ photoId: photo.id, formatId: format, etudiant }); setAjoute(true); }}
          className="rounded bg-black px-3 text-white"
        >
          {ajoute ? 'Ajoutée ✓' : 'Ajouter'}
        </button>
      </div>
    </div>
  );
}
