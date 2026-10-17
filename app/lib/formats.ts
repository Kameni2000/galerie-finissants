export const FORMATS = [
  { id: 'numerique', nom: 'Fichier numérique', prix: 15 },
  { id: '5x7', nom: 'Tirage 5×7', prix: 12 },
  { id: '8x10', nom: 'Tirage 8×10', prix: 20 },
];

export function prixFormat(id: string) {
  return FORMATS.find((f) => f.id === id)?.prix ?? 0;
}
