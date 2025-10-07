//script.js//
//by maya hazarika, oct 2025//

//run after full page load//
document.addEventListener('DOMContentLoaded', () => {
  //get references to DOM elements//
  const recipes = document.querySelectorAll('.recipe') //all recipe cards//
  const searchBox = document.getElementById('searchBox') //search input//
  const showAllBtn = document.getElementById('showAllBtn') //show all button//
  const randomBtn = document.getElementById('randomBtn'); //random recipe button//

  let selectedRecipe = null; //track currently selected recipe//

  //hide all recipe details initially//
  const hideRecipeDetails = (recipe) => { //hide all paragraphs in a recipe card//
    recipe.querySelectorAll('p').forEach(p => { //hide all paragraphs//
      p.style.display = 'none'; //hide paragraph//
    });
  };
  //show recipe details//
  const showRecipeDetails = (recipe) => { //show all paragraphs in a recipe card//
    recipe.querySelectorAll('p').forEach(p => { //show all paragraphs//
      p.style.display = 'block'; //show paragraph//
    });
  };
  //select a recipe card, and highlight//
  const selectRecipe = (recipe) => {
    //if another recipe is selected, deselect it//
    if (selectedRecipe) { //if a recipe is already selected//
      selectedRecipe.classList.remove('selected'); //remove highlight//
      hideRecipeDetails(selectedRecipe); //hide details//
    }
    //highlight current recipe, show details//
    recipe.classList.add('selected'); //highlight selected recipe//
    showRecipeDetails(recipe); //show details//
    selectedRecipe = recipe; //update selected recipe//
    //smooth scroll selected recipe into view//
    recipe.scrollIntoView({ //scroll selected recipe into view//
      behavior: 'smooth', //smooth scroll//
      block: 'center', //center vertically//
      inline: 'nearest' //center vertically//
    });
  };
  //deselect currently selected recipe//
  const deselectRecipe = () => { //deselect currently selected recipe//
    if (selectedRecipe) { //if a recipe is selected//
      selectedRecipe.classList.remove('selected'); //remove highlight//
      hideRecipeDetails(selectedRecipe); //hide details//
      selectedRecipe = null; //clear selected recipe//
    }
  };
  //initialize all recipe cards//
  recipes.forEach(recipe => { //for each recipe card//
    hideRecipeDetails(recipe); //hide details initially//

    recipe.addEventListener('click', (e) => { //on recipe click//
      e.stopPropagation(); //prevent event bubbling//
      //toggle selection//
      if (recipe === selectedRecipe) { //if clicked recipe is already selected//
        deselectRecipe(); //deselect it//
      } else { //select clicked recipe//
        selectRecipe(recipe); //select clicked recipe//
      }
    });
  });
  //search functionality//
  if (searchBox) { //if search box exists//
    const performSearch = (searchTerm) => { //perform search and filter recipes//
      const term = searchTerm.toLowerCase().trim(); //normalize search term//
      let visibleCount = 0; //track number of visible recipes//

      recipes.forEach(recipe => { //for each recipe card//
        //check if title or any paragraph contains search term//
        const title = recipe.querySelector('h2')?.textContent.toLowerCase() || ''; //get title text//
        const paragraphs = Array.from(recipe.querySelectorAll('p')); //get all paragraphs//
        const allText = [title, ...paragraphs.map(p => p.textContent.toLowerCase())].join(' '); //combine all text//

        const matches = term === '' || allText.includes(term); //check for match//

        if (matches) { //if match found//
          recipe.style.display = 'block'; //show recipe//
          recipe.classList.remove('collapsed'); //remove collapsed class//
          visibleCount++; //increment visible count//
        } else { //hide non-matching recipe//
          recipe.style.display = 'none'; //hide recipe//
          recipe.classList.add('collapsed'); //add collapsed class//
          //if this recipe is selected, deselect it//
          if (recipe === selectedRecipe) {
            deselectRecipe();
          }
        }
      });
      //remove existing no-results message//
      const existingMessage = document.querySelector('.no-results'); //remove existing message//
      if (existingMessage) { //if message exists//
        existingMessage.remove(); //remove it//
      }
      //if no matches, show no-results message//
      if (visibleCount === 0 && term !== '') { //if no matches//
        const noResults = document.createElement('div'); //create message element//
        noResults.className = 'no-results'; //set class//
        noResults.style.cssText = 'text-align: center; padding: 2rem; color: #8b4513; font-style: italic;'; //style message//
        noResults.textContent = `No recipes found for "${searchTerm}"`; //set message text//
        document.querySelector('.recipes').appendChild(noResults); //append message//
      }
    };
    //performs search on input events//
    searchBox.addEventListener('input', (e) => { //on input event//
      performSearch(e.target.value); //perform search//
      //deselect recipe if search box not empty//
      if (e.target.value.trim() !== '') { //if search box not empty//
        deselectRecipe(); //deselect any selected recipe//
      }
    });
    //clear search on esc key//
    searchBox.addEventListener('keydown', (e) => { //on keydown event//
      if (e.key === 'Escape') { //if esc key pressed//
        searchBox.value = ''; //clear search box//
        performSearch(''); //show all recipes//
        searchBox.blur(); //remove focus//
      }
    });
  }
  //show all recipes button functionality//
  if (showAllBtn) {   //if show all button exists//
    showAllBtn.addEventListener('click', () => { //on button click//
      recipes.forEach(recipe => { //show all recipes//
        recipe.style.display = 'block'; //show recipe//
        recipe.classList.remove('collapsed'); //remove collapsed class//
      });

      deselectRecipe(); //deselect any selected recipe//

      if (searchBox) {
        searchBox.value = ''; //clear search box//
      }

      const existingMessage = document.querySelector('.no-results'); //remove existing no-results message//
      if (existingMessage) { //if message exists//
        existingMessage.remove(); //remove no-results message//
      }
      //scroll to top smoothly//
      window.scrollTo({ top: 0, behavior: 'smooth' }); //scroll to top//
    });
  }
  //random recipe button functionality//
  if (randomBtn) { //if random button exists//
    randomBtn.addEventListener('click', () => { //on button click//
      if (recipes.length === 0) return; //if no recipes, do nothing//
      //select a random recipe//
      const recipeArray = Array.from(recipes); //convert NodeList to Array//
      const randomRecipe = recipeArray[Math.floor(Math.random() * recipeArray.length)]; //pick random recipe//
      selectRecipe(randomRecipe); //select random recipe//
    });
  }
  //click outside recipe or press esc to deselect//
  document.addEventListener('click', (e) => {   //on document click//
    if (!e.target.closest('.recipe')) { //if click outside recipe//
      deselectRecipe(); //deselect recipe//
    }
  });
  //pressing esc key deselects recipe//
  document.addEventListener('keydown', (e) => { //on keydown event//
    if (e.key === 'Escape') { //if esc key pressed//
      deselectRecipe(); //deselect recipe//
    }
  });
});
