import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const AuthButton = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          {user.email}
        </div>
        <Button
          onClick={signOut}
          variant="outline"
          size="sm"
          className="border-border/50 hover:bg-muted/50"
        >
          <LogOut className="h-4 w-4 mr-1" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => navigate("/auth")}
      variant="outline"
      size="sm"
      className="border-border/50 hover:bg-muted/50"
    >
      <LogIn className="h-4 w-4 mr-1" />
      Sign In
    </Button>
  );
};