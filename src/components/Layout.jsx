import Navigation from "@/components/Navigation";

const Layout = ({ children }) => {
  return (
    <div 
      className="min-h-screen bg-background relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, hsl(220 25% 8%), hsl(260 45% 15%))',
      }}
    >
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-background/80" />
      
      <div className="relative z-10">
        <Navigation />
        <main className="pb-20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
