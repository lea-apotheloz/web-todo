import { afficherCategories } from './categorie.ts'
import type { CAT } from './main.ts'

export async function deleteCategories(
  categorie: CAT[],
  indexCat: number,
  ulCategories: HTMLLIElement,
) {
  fetch(
    `https://api.todos.in.jt-lab.ch/categories?id=eq.${categorie[indexCat].id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categorie[indexCat]),
    },
  )
  if (ulCategories) {
    categorie.splice(indexCat, 1)
    ulCategories.innerHTML = ''
    categorie.forEach((categori, indexCat) => {
      afficherCategories(categori, indexCat, ulCategories)
    })
  }
}
