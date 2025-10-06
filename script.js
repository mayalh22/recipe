document.addEventListener('DOMContentLoaded', () => {
  const recipes = document.querySelectorAll('.recipe')
  const searchBox = document.getElementById('searchBox')
  const showAllBtn = document.getElementById('showAllBtn')

  recipes.forEach(recipe => {
    recipe.querySelectorAll('p').forEach(p => p.style.display = 'none')
  })

  recipes.forEach(recipe => {
    recipe.addEventListener('click', () => {
      const isSelected = recipe.classList.contains('selected')
      
      recipes.forEach(r => {
        r.classList.remove('selected')
        r.querySelectorAll('p').forEach(p => p.style.display = 'none')
      })

      if (!isSelected) {
        recipe.classList.add('selected')
        recipe.querySelectorAll('p').forEach(p => p.style.display = 'block')
        recipe.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    })
  })

  if (searchBox) {
    searchBox.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase()
      
      recipes.forEach(recipe => {
        const title = recipe.querySelector('h2').textContent.toLowerCase()
        const ingredients = recipe.querySelector('p').textContent.toLowerCase()
        
        if (title.includes(searchTerm) || ingredients.includes(searchTerm)) {
          recipe.style.display = 'block'
        } else {
          recipe.style.display = 'none'
        }
      })
    })
  }

  if (showAllBtn) {
    showAllBtn.addEventListener('click', () => {
      recipes.forEach(r => {
        r.style.display = 'block'
        r.classList.remove('selected')
        r.querySelectorAll('p').forEach(p => p.style.display = 'none')
      })
      if (searchBox) searchBox.value = ''
    })
  }
})