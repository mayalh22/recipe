document.addEventListener('DOMContentLoaded', () => {
  const recipes = document.querySelectorAll('.recipe')

  recipes.forEach(recipe => {
    recipe.addEventListener('click', () => {
      recipes.forEach(r => r.classList.remove('selected'))
      recipe.classList.add('selected')
      alert('you selected: ' + recipe.querySelector('h2').textContent)
    })
  })
})
