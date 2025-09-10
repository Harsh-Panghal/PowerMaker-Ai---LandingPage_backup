import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, ChefHat, Heart, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  nutritionalNote: string;
  youtubeSearch: string;
}

interface RecipeDisplayProps {
  recipe: Recipe;
}

export const RecipeDisplay = ({ recipe }: RecipeDisplayProps) => {
  const handleYouTubeSearch = () => {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.youtubeSearch)}`;
    window.open(searchUrl, '_blank');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <ChefHat className="h-8 w-8 text-primary" />
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-food-primary bg-clip-text text-transparent">
            {recipe.name}
          </CardTitle>
        </div>
        
        <div className="flex items-center justify-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm">30 mins</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="text-sm">2-4 servings</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-success" />
            <span className="text-sm">Healthy</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Nutritional Note */}
        <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-lg p-4 border border-success/20">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-success" />
            <h3 className="font-semibold text-foreground">Nutritional Benefits</h3>
          </div>
          <p className="text-muted-foreground">{recipe.nutritionalNote}</p>
        </div>

        {/* Ingredients */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
              1
            </span>
            Ingredients
          </h3>
          <div className="grid gap-3">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className="w-2 h-2 rounded-full bg-food-accent" />
                <span className="text-foreground">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Instructions */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <span className="w-8 h-8 bg-food-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
              2
            </span>
            Instructions
          </h3>
          <div className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-lg bg-gradient-to-r from-muted/20 to-accent/10">
                <div className="flex-shrink-0">
                  <span className="w-8 h-8 bg-food-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </span>
                </div>
                <p className="text-foreground leading-relaxed">{instruction}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* YouTube Tutorial */}
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
            <Youtube className="h-6 w-6 text-red-500" />
            Watch Tutorial
          </h3>
          <Button
            onClick={handleYouTubeSearch}
            variant="outline"
            className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 transition-colors"
          >
            <Youtube className="h-4 w-4 mr-2" />
            Search "{recipe.youtubeSearch}" on YouTube
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};