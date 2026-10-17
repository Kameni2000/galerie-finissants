export type Photo = { id: string; miniature: string; hauteResolution: string };
export type Etudiant = { code: string; nom: string; ecole: string; photos: Photo[] };

const photo = (n: number): Photo => ({
  id: String(n),
  miniature: `https://picsum.photos/id/${n}/400/500`,         // petite image pour la galerie
  hauteResolution: `https://picsum.photos/id/${n}/1600/2000`, // seulement après paiement
});

const ETUDIANTS: Etudiant[] = [
  { code: 'FIN-2026-A1', nom: 'Marie T.', ecole: 'Université (démo)', photos: [10, 11, 12, 13, 14, 15].map(photo) },
  { code: 'FIN-2026-B2', nom: 'Samuel G.', ecole: 'Cégep (démo)', photos: [20, 21, 22, 23, 24, 25].map(photo) },
];

export function trouverEtudiant(code: string) {
  return ETUDIANTS.find((e) => e.code === code.trim().toUpperCase());
}
