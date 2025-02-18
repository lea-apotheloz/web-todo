import { deleteCategories } from './deleteCategories.ts'
import { type CAT, getcategorie } from './main.ts'

export async function afficherCategories(
  categori: CAT,
  indexCat: number,
  ulCategories: HTMLLIElement | null,
) {
  if (ulCategories) {
    const liCategories = document.createElement('li')

    liCategories.className = 'liCategories'

    liCategories.append(`${categori.title}`)

    liCategories.style.backgroundColor = categori.color

    const DeleteCategoriebutton = document.createElement('button')
    DeleteCategoriebutton.innerHTML =
      '<img width="20" height="20" src="https://cdn-icons-png.flaticon.com/256/8567/8567781.png" alt="filled-trash"/>'

    DeleteCategoriebutton.addEventListener('click', () => {
      deleteCategories(getcategorie, indexCat, ulCategories)
    })

    liCategories.append(DeleteCategoriebutton)
    ulCategories.append(liCategories)
  }
}
