import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickAddButton = () => {
  return (
    <Button 
      className="
        fixed bottom-8 right-8 w-16 h-16 rounded-full
        bg-gradient-primary hover:scale-110 active:scale-95
        glow-soft hover:glow-strong
        transition-all duration-300 ease-spring
        shadow-elevated border-0
        z-50
      "
      size="icon"
    >
      <Plus className="w-6 h-6 text-background" />
      <span className="sr-only">Add Task</span>
    </Button>
  );
};

export default QuickAddButton;
