import { CheckSquare, IndianRupee, BookOpen } from "lucide-react";

const DashboardSummary = () => {
  const summaryItems = [
    {
      icon: CheckSquare,
      value: "3",
      label: "tasks",
      color: "text-nature-forest"
    },
    {
      icon: IndianRupee,
      value: "₹1200",
      label: "subs due",
      color: "text-nature-sunset"
    },
    {
      icon: BookOpen,
      value: "1",
      label: "diary entry",
      color: "text-nature-ocean"
    }
  ];

  return (
    <div className="px-6 mt-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-center gap-8 md:gap-12">
            {summaryItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 group">
                <div className={`p-2 rounded-lg bg-background/5 group-hover:bg-background/10 transition-colors duration-200`}>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading font-semibold text-foreground">
                    {item.value}
                  </span>
                  <span className="font-body text-sm text-muted-foreground">
                    {item.label}
                  </span>
                </div>
                {index < summaryItems.length - 1 && (
                  <div className="w-px h-4 bg-border/50 ml-4 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
