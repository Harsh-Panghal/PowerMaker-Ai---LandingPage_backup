interface RecipeInputs {
  favoriteFoods: string;
  allergies: string;
  deficiencies: string;
  cuisine: string;
}

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  nutritionalNote: string;
  youtubeSearch: string;
}

// Mock recipe generator - in a real app, this would call an AI service
export const generateRecipe = async (inputs: RecipeInputs): Promise<Recipe> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const { favoriteFoods, allergies, deficiencies, cuisine } = inputs;
  
  // Sample recipes based on common inputs
  const sampleRecipes: Record<string, Recipe> = {
    "italian": {
      name: "Mediterranean Spinach Chicken Parmesan",
      ingredients: [
        "2 chicken breasts (boneless, skinless)",
        "2 cups fresh spinach",
        "1 cup tomato sauce (no added sugar)",
        "1/2 cup mozzarella cheese (low-fat)",
        "1 tbsp olive oil",
        "1 tsp garlic powder",
        "1/2 cup whole wheat breadcrumbs",
        "Salt and pepper to taste",
        "1 tbsp fresh basil"
      ],
      instructions: [
        "Preheat oven to 375°F (190°C).",
        "Season chicken breasts with salt, pepper, and garlic powder.",
        "Heat olive oil in a pan and sear chicken for 3 minutes per side until golden.",
        "Place chicken in a baking dish, top with tomato sauce and fresh spinach.",
        "Sprinkle mozzarella cheese and breadcrumbs on top for extra crunch.",
        "Bake for 20-25 minutes until chicken reaches internal temperature of 165°F.",
        "Garnish with fresh basil and serve hot with a side salad."
      ],
      nutritionalNote: "High in iron from spinach and lean protein from chicken, supporting energy levels and muscle health.",
      youtubeSearch: "Healthy Chicken Parmesan with Spinach recipe"
    },
    "asian": {
      name: "Iron-Rich Teriyaki Quinoa Bowl",
      ingredients: [
        "1 cup quinoa",
        "200g lean beef strips",
        "2 cups baby spinach",
        "1 bell pepper (sliced)",
        "1 carrot (julienned)",
        "2 tbsp teriyaki sauce (low sodium)",
        "1 tbsp sesame oil",
        "1 tsp fresh ginger (grated)",
        "2 cloves garlic (minced)",
        "1 tbsp sesame seeds"
      ],
      instructions: [
        "Cook quinoa according to package instructions and set aside.",
        "Heat sesame oil in a large pan over medium-high heat.",
        "Add garlic and ginger, stir-fry for 30 seconds until fragrant.",
        "Add beef strips and cook for 3-4 minutes until browned.",
        "Add bell pepper and carrot, stir-fry for 2-3 minutes.",
        "Add spinach and teriyaki sauce, cook until spinach wilts.",
        "Serve over quinoa and sprinkle with sesame seeds."
      ],
      nutritionalNote: "Packed with iron from beef and spinach, plus complete protein from quinoa for sustained energy.",
      youtubeSearch: "Healthy Teriyaki Quinoa Bowl recipe"
    },
    "mediterranean": {
      name: "Greek-Style Lentil Power Bowl",
      ingredients: [
        "1 cup red lentils",
        "2 cups vegetable broth",
        "1 cucumber (diced)",
        "1 cup cherry tomatoes (halved)",
        "1/2 red onion (thinly sliced)",
        "1/4 cup kalamata olives",
        "100g feta cheese (crumbled)",
        "2 tbsp olive oil",
        "1 lemon (juiced)",
        "1 tsp dried oregano",
        "Fresh dill for garnish"
      ],
      instructions: [
        "Rinse lentils and cook in vegetable broth for 15-20 minutes until tender.",
        "Drain lentils and let cool slightly.",
        "In a large bowl, combine lentils, cucumber, tomatoes, and red onion.",
        "Add kalamata olives and crumbled feta cheese.",
        "Whisk together olive oil, lemon juice, and oregano for dressing.",
        "Pour dressing over the bowl and toss gently to combine.",
        "Garnish with fresh dill and serve at room temperature."
      ],
      nutritionalNote: "Rich in plant-based iron from lentils and vitamin C from tomatoes for better iron absorption.",
      youtubeSearch: "Mediterranean Lentil Power Bowl recipe"
    }
  };

  // Generate a recipe based on cuisine preference or default to Italian
  const cuisineKey = cuisine.toLowerCase();
  const selectedRecipe = sampleRecipes[cuisineKey] || sampleRecipes["italian"];

  // Customize recipe name based on inputs
  if (deficiencies.toLowerCase().includes("iron")) {
    selectedRecipe.name = `Iron-Rich ${selectedRecipe.name}`;
  }
  if (deficiencies.toLowerCase().includes("protein")) {
    selectedRecipe.name = `High-Protein ${selectedRecipe.name}`;
  }

  // Filter out allergenic ingredients (simplified)
  if (allergies) {
    const allergyList = allergies.toLowerCase().split(',').map(a => a.trim());
    selectedRecipe.ingredients = selectedRecipe.ingredients.filter(ingredient => {
      return !allergyList.some(allergy => ingredient.toLowerCase().includes(allergy));
    });
  }

  return selectedRecipe;
};