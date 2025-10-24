import { Calendar, Clock, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";

const TodayScheduleCard = () => {
  const tasks = [
    {
      id: 1,
      title: "Morning workout",
      time: "07:00 AM",
      priority: "high",
      color: "nature-forest"
    },
    {
      id: 2,
      title: "Team standup meeting",
      time: "09:30 AM", 
      priority: "medium",
      color: "nature-ocean"
    },
    {
      id: 3,
      title: "Review project proposals",
      time: "02:00 PM",
      priority: "high",
      color: "nature-sunset"
    },
    {
      id: 4,
      title: "Grocery shopping",
      time: "05:30 PM",
      priority: "low",
      color: "nature-mountain"
    }
  ];

  const getPriorityDot = (priority: string, color: string) => {
    const colorMap = {
      "nature-forest": "text-nature-forest",
      "nature-ocean": "text-nature-ocean", 
      "nature-sunset": "text-nature-sunset",
      "nature-mountain": "text-nature-mountain"
    };
    
    return colorMap[color as keyof typeof colorMap] || "text-muted-foreground";
  };

  return (
    <Card className="glass-strong hover-lift hover-glow rounded-2xl p-6 max-w-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Calendar className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Today's Schedule
          </h3>
          <p className="font-body text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-4 group">
            <div className="flex items-center gap-2 min-w-20">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="font-body text-sm text-muted-foreground">
                {task.time}
              </span>
            </div>
            
            <div className="flex items-center gap-3 flex-1">
              <Circle 
                className={`w-3 h-3 ${getPriorityDot(task.priority, task.color)} fill-current`}
              />
              <span className="font-body text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                {task.title}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border/30">
        <button className="font-body text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          View full schedule →
        </button>
      </div>
    </Card>
  );
};

export default TodayScheduleCard;