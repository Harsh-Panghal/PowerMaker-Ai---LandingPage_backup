import { useState } from "react";
import { RecipeForm } from "@/components/RecipeForm";
import { RecipeDisplay } from "@/components/RecipeDisplay";
import { AuthButton } from "@/components/AuthButton";
import { generateRecipe } from "@/utils/recipeGenerator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Utensils } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  nutritionalNote: string;
  youtubeSearch: string;
}

const Index = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateRecipe = async (data: {
    favoriteFoods: string;
    allergies: string;
    deficiencies: string;
    cuisine: string;
  }) => {
    setIsLoading(true);
    try {
      const generatedRecipe = await generateRecipe(data);
      setRecipe(generatedRecipe);
    } catch (error) {
      console.error("Error generating recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setRecipe(null);
  };

  if (recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <Button
              onClick={handleStartOver}
              variant="outline"
              className="flex items-center gap-2 hover:bg-muted/50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Generate Another Recipe
            </Button>
            <AuthButton />
          </div>
          <RecipeDisplay recipe={recipe} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="flex justify-end mb-6">
            <AuthButton />
          </div>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Utensils className="h-12 w-12 text-primary" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-food-primary to-food-secondary bg-clip-text text-transparent">
                Healthy Recipe Generator
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Create personalized, nutritious recipes tailored to your preferences, dietary needs, and health goals. 
              Cooking healthy has never been easier!
            </p>
          </div>
          
          <RecipeForm onSubmit={handleGenerateRecipe} isLoading={isLoading} />
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="w-16 h-16 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Recipes</h3>
            <p className="text-muted-foreground">
              Get recipes tailored to your favorite ingredients and cuisine preferences
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="w-16 h-16 bg-gradient-to-br from-warning to-food-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🥗</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Allergy-Safe</h3>
            <p className="text-muted-foreground">
              Automatically excludes ingredients you're allergic to for safe cooking
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="w-16 h-16 bg-gradient-to-br from-food-primary to-food-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💪</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Nutritionally Targeted</h3>
            <p className="text-muted-foreground">
              Addresses specific nutritional deficiencies to support your health goals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
