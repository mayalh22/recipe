//script.js//
//by maya hazarika, oct 2025//

//run after full page load//
document.addEventListener('DOMContentLoaded', () => {
  //get references to DOM elements//
  const recipes = document.querySelectorAll('.recipe')
  const searchBox = document.getElementById('searchBox')
  const showAllBtn = document.getElementById('showAllBtn')
  const randomBtn = document.getElementById('randomBtn');

  let selectedRecipe = null; //track currently selected recipe//

  //hide all recipe details initially//
  const hideRecipeDetails = (recipe) => {
    recipe.querySelectorAll('p').forEach(p => {
      p.style.display = 'none';
    });
  };
  //show recipe details//
  const showRecipeDetails = (recipe) => {
    recipe.querySelectorAll('p').forEach(p => {
      p.style.display = 'block';
    });
  };
  //select a recipe card, and highlight//
  const selectRecipe = (recipe) => {
    //if another recipe is selected, deselect it//
    if (selectedRecipe) {
      selectedRecipe.classList.remove('selected');
      hideRecipeDetails(selectedRecipe);
    }
    //highlight current recipe, show details//
    recipe.classList.add('selected');
    showRecipeDetails(recipe);
    selectedRecipe = recipe;
    //smooth scroll selected recipe into view//
    recipe.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    });
  };
  //deselect currently selected recipe//
  const deselectRecipe = () => {
    if (selectedRecipe) {
      selectedRecipe.classList.remove('selected');
      hideRecipeDetails(selectedRecipe);
      selectedRecipe = null;
    }
  };
  //initialize all recipe cards//
  recipes.forEach(recipe => {
    hideRecipeDetails(recipe);

    recipe.addEventListener('click', (e) => {
      e.stopPropagation();
      //toggle selection//
      if (recipe === selectedRecipe) {
        deselectRecipe();
      } else {
        selectRecipe(recipe);
      }
    });
  });
  //search functionality//
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
      //remove existing no-results message//
      const existingMessage = document.querySelector('.no-results');
      if (existingMessage) {
        existingMessage.remove();
      }
      //if no matches, show no-results message//
      if (visibleCount === 0 && term !== '') {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.style.cssText = 'text-align: center; padding: 2rem; color: #8b4513; font-style: italic;';
        noResults.textContent = `No recipes found for "${searchTerm}"`;
        document.querySelector('.recipes').appendChild(noResults);
      }
    };
    //performs search on input events//
    searchBox.addEventListener('input', (e) => {
      performSearch(e.target.value);
      //deselect recipe if search box not empty//
      if (e.target.value.trim() !== '') {
        deselectRecipe();
      }
    });
    //clear search on esc key//
    searchBox.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchBox.value = '';
        performSearch('');
        searchBox.blur();
      }
    });
  }
  //show all recipes button functionality//
  if (showAllBtn) {
    showAllBtn.addEventListener('click', () => {
      recipes.forEach(recipe => {
        recipe.style.display = 'block';
        recipe.classList.remove('collapsed');
      });

      deselectRecipe(); //deselect any selected recipe//

      if (searchBox) {
        searchBox.value = ''; //clear search box//
      }

      const existingMessage = document.querySelector('.no-results');
      if (existingMessage) {
        existingMessage.remove(); //remove no-results message//
      }
      //scroll to top smoothly//
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
    //random recipe button functionality//
  if (randomBtn) {
    randomBtn.addEventListener('click', () => {
      const recipeArray = Array.from(recipes);
      const randomRecipe = recipeArray[Math.floor(Math.random() * recipeArray.length)];
      selectRecipe(randomRecipe);
    });
  }

  //click outside recipe or press esc to deselect//
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.recipe')) {
      deselectRecipe();
    }
  });
  //pressing esc key deselects recipe//
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      deselectRecipe();
    }
  });
});
