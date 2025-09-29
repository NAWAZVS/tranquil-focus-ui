import Navigation from "./Navigation";
import WelcomeSection from "./WelcomeSection";
import TodayScheduleCard from "./TodayScheduleCard";
import QuickAddButton from "./QuickAddButton";
import DashboardSummary from "./DashboardSummary";
import sunsetBg from "@/assets/sunset-pavilion-bg.webp";

const Dashboard = () => {
  return (
    <div 
      className="min-h-screen bg-background relative overflow-hidden"
      style={{
        backgroundImage: `url(${sunsetBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-overlay" />
      
      <div className="relative z-10">
        <Navigation />
        <WelcomeSection />
        
        {/* Main content area */}
        <div className="px-6 mt-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Schedule card */}
              <div className="flex justify-center lg:justify-start">
                <TodayScheduleCard />
              </div>
              
              {/* Additional content area for future modules */}
              <div className="space-y-6">
                {/* Placeholder for future cards */}
                <div className="glass rounded-2xl p-6 hover-lift">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-body text-sm text-muted-foreground">
                        Productivity Score
                      </span>
                      <span className="font-heading font-semibold text-nature-forest">
                        87%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-body text-sm text-muted-foreground">
                        Weekly Goal
                      </span>
                      <span className="font-heading font-semibold text-nature-ocean">
                        12/15
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-body text-sm text-muted-foreground">
                        Streak
                      </span>
                      <span className="font-heading font-semibold text-nature-sunset">
                        7 days
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DashboardSummary />
        <QuickAddButton />
      </div>
    </div>
  );
};

export default Dashboard;