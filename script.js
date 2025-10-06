
document.addEventListener('DOMContentLoaded', () => {
  const recipes = document.querySelectorAll('.recipe')
  recipes.forEach(recipe => {
    recipe.addEventListener('click', () => {
      alert('you selected: ' + recipe.querySelector('h2').textContent)
    })
  })
})
