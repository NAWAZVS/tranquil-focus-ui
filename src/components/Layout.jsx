import Navigation from "@/components/Navigation";
import sunsetBg from "@/assets/sunset-pavilion-bg.webp";

const Layout = ({ children }) => {
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
        <main className="pb-20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
