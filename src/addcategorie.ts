import type { CAT } from './main.ts'

export async function stockageCategories(
  categoriesInput: HTMLInputElement,
  categoriesColor: HTMLInputElement,
  getCategorie: CAT[],
) {
  if (categoriesInput && categoriesColor) {
    const title = categoriesInput.value.trim()
    const color = categoriesColor.value.trim()
    const newCategories = { title, color }

    const response = await fetch('https://api.todos.in.jt-lab.ch/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategories),
    })

    const sauvegardeCategorie = (await response.json()) as CAT
    getCategorie.push(sauvegardeCategorie)
    if (categoriesInput && categoriesInput.value.length - 1) {
      categoriesInput.value = ''
      categoriesColor.value = ''
    }
  }
}
