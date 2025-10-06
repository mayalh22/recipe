document.addEventListener('DOMContentLoaded', () => {
  const recipes = document.querySelectorAll('.recipe')

  recipes.forEach(recipe => {
    recipe.addEventListener('click', () => {
      recipes.forEach(r => {
        r.classList.remove('selected')
        r.querySelectorAll('p').forEach(p => p.style.display = 'none')
      })

      recipe.classList.add('selected')
      recipe.querySelectorAll('p').forEach(p => p.style.display = 'block')

      alert('you selected: ' + recipe.querySelector('h2').textContent)
    })

    recipe.querySelectorAll('p').forEach(p => p.style.display = 'none')
  })
})