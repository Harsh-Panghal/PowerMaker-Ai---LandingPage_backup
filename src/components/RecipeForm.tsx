import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Sparkles } from "lucide-react";

interface RecipeFormProps {
  onSubmit: (data: {
    favoriteFoods: string;
    allergies: string;
    deficiencies: string;
    cuisine: string;
  }) => void;
  isLoading?: boolean;
}

export const RecipeForm = ({ onSubmit, isLoading = false }: RecipeFormProps) => {
  const [favoriteFoods, setFavoriteFoods] = useState("");
  const [allergies, setAllergies] = useState("");
  const [deficiencies, setDeficiencies] = useState("");
  const [cuisine, setCuisine] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      favoriteFoods,
      allergies,
      deficiencies,
      cuisine,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ChefHat className="h-8 w-8 text-primary" />
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-food-primary bg-clip-text text-transparent">
            Recipe Generator
          </CardTitle>
        </div>
        <p className="text-muted-foreground text-lg">
          Tell us your preferences and we'll create a personalized healthy recipe just for you!
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="favoritefoods" className="text-sm font-semibold text-foreground">
              Favorite Foods & Ingredients
            </Label>
            <Textarea
              id="favoritefoods"
              placeholder="e.g., Chicken, spinach, quinoa, sweet potatoes..."
              value={favoriteFoods}
              onChange={(e) => setFavoriteFoods(e.target.value)}
              className="min-h-[80px] resize-none border-border/50 focus:border-primary/50 transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergies" className="text-sm font-semibold text-foreground">
              Allergies to Avoid
            </Label>
            <Input
              id="allergies"
              type="text"
              placeholder="e.g., Nuts, dairy, shellfish..."
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="border-border/50 focus:border-warning/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deficiencies" className="text-sm font-semibold text-foreground">
              Nutritional Deficiencies to Address
            </Label>
            <Input
              id="deficiencies"
              type="text"
              placeholder="e.g., Iron, vitamin D, protein..."
              value={deficiencies}
              onChange={(e) => setDeficiencies(e.target.value)}
              className="border-border/50 focus:border-success/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cuisine" className="text-sm font-semibold text-foreground">
              Preferred Cuisine Type
            </Label>
            <Input
              id="cuisine"
              type="text"
              placeholder="e.g., Italian, Asian, Mediterranean..."
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="border-border/50 focus:border-food-accent/50 transition-colors"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-food-primary hover:from-primary/90 hover:to-food-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Cooking up your recipe...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Generate My Recipe
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};