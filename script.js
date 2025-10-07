document.addEventListener('DOMContentLoaded', () => {
  const recipes = document.querySelectorAll('.recipe')
  const searchBox = document.getElementById('searchBox')
  const showAllBtn = document.getElementById('showAllBtn')

  let selectedRecipe = null;

  const hideRecipeDetails = (recipe) => {
    recipe.querySelectorAll('p').forEach(p => {
      p.style.display = 'none';
    });
  };

  const showRecipeDetails = (recipe) => {
    recipe.querySelectorAll('p').forEach(p => {
      p.style.display = 'block';
    });
  };

  const selectRecipe = (recipe) => {
    if (selectedRecipe) {
      selectedRecipe.classList.remove('selected');
      hideRecipeDetails(selectedRecipe);
    }

    recipe.classList.add('selected');
    showRecipeDetails(recipe);
    selectedRecipe = recipe;

    recipe.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    });
  };

  const deselectRecipe = () => {
    if (selectedRecipe) {
      selectedRecipe.classList.remove('selected');
      hideRecipeDetails(selectedRecipe);
      selectedRecipe = null;
    }
  };

  recipes.forEach(recipe => {
    hideRecipeDetails(recipe);

    recipe.addEventListener('click', (e) => {
      e.stopPropagation();

      if (recipe === selectedRecipe) {
        deselectRecipe();
      } else {
        selectRecipe(recipe);
      }
    });
  });

  if (searchBox) {
    const performSearch = (searchTerm) => {
      const term = searchTerm.toLowerCase().trim();
      let visibleCount = 0;

      recipes.forEach(recipe => {
        const title = recipe.querySelector('h2')?.textContent.toLowerCase() || '';
        const paragraphs = Array.from(recipe.querySelectorAll('p'));
        const allText = [title, ...paragraphs.map(p => p.textContent.toLowerCase())].join(' ');

        const matches = term === '' || allText.includes(term);

        if (matches) {
          recipe.style.display = 'block';
          recipe.classList.remove('collapsed');
          visibleCount++;
        } else {
          recipe.style.display = 'none';
          recipe.classList.add('collapsed');
        }
      });

      const existingMessage = document.querySelector('.no-results');
      if (existingMessage) {
        existingMessage.remove();
      }

      if (visibleCount === 0 && term !== '') {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.style.cssText = 'text-align: center; padding: 2rem; color: #8b4513; font-style: italic;';
        noResults.textContent = `No recipes found for "${searchTerm}"`;
        document.querySelector('.recipes').appendChild(noResults);
      }
    };

    searchBox.addEventListener('input', (e) => {
      performSearch(e.target.value);

      if (e.target.value.trim() !== '') {
        deselectRecipe();
      }
    });

    searchBox.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchBox.value = '';
        performSearch('');
        searchBox.blur();
      }
    });
  }

  if (showAllBtn) {
    showAllBtn.addEventListener('click', () => {
      recipes.forEach(recipe => {
        recipe.style.display = 'block';
        recipe.classList.remove('collapsed');
      });

      deselectRecipe();

      if (searchBox) {
        searchBox.value = '';
      }

      const existingMessage = document.querySelector('.no-results');
      if (existingMessage) {
        existingMessage.remove();
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.recipe')) {
      deselectRecipe();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      deselectRecipe();
    }
  });
});