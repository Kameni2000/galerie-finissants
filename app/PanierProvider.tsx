'use client';
import { createContext, useContext, useMemo, useSyncExternalStore } from 'react';

export type Article = { photoId: string; formatId: string; etudiant: string };
type Panier = {
  articles: Article[];
  ajouter: (a: Article) => void;
  retirer: (index: number) => void;
  vider: () => void;
};

const PanierContext = createContext<Panier | null>(null);

// Le panier vit dans localStorage ; useSyncExternalStore le lit sans setState dans un effet.
const CLE = 'panier';
const abonnes = new Set<() => void>();

function sAbonner(cb: () => void) {
  abonnes.add(cb);
  window.addEventListener('storage', cb);
  return () => {
    abonnes.delete(cb);
    window.removeEventListener('storage', cb);
  };
}

function lireBrut() {
  try {
    return localStorage.getItem(CLE) ?? '[]';
  } catch {
    return '[]';
  }
}

function analyser(brut: string): Article[] {
  try {
    const v = JSON.parse(brut);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function ecrire(modifier: (liste: Article[]) => Article[]) {
  try {
    localStorage.setItem(CLE, JSON.stringify(modifier(analyser(lireBrut()))));
  } catch {}
  abonnes.forEach((cb) => cb());
}

export function PanierProvider({ children }: { children: React.ReactNode }) {
  const brut = useSyncExternalStore(sAbonner, lireBrut, () => '[]');
  const articles = useMemo(() => analyser(brut), [brut]);

  return (
    <PanierContext.Provider
      value={{
        articles,
        ajouter: (a) => ecrire((liste) => [...liste, a]),
        retirer: (i) => ecrire((liste) => liste.filter((_, k) => k !== i)),
        vider: () => ecrire(() => []),
      }}
    >
      {children}
    </PanierContext.Provider>
  );
}

export function usePanier() {
  const ctx = useContext(PanierContext);
  if (!ctx) throw new Error('usePanier doit être utilisé dans PanierProvider');
  return ctx;
}
