'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { trouverEtudiant } from '@/app/lib/data';

export async function connexion(formData: FormData) {
  const etudiant = trouverEtudiant(String(formData.get('code') ?? ''));
  if (!etudiant) redirect('/?erreur=1');

  const c = await cookies();
  c.set('code_acces', etudiant.code, {
    httpOnly: true,                       // inaccessible au JavaScript du navigateur
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,                 // 24 h
  });
  redirect('/galerie');
}

export async function deconnexion() {
  (await cookies()).delete('code_acces');
  redirect('/');
}