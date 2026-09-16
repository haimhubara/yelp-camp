import { Header, Footer } from './components';
import { AllRoutes } from './routes/AllRoutes';
import { AuthProvider } from './context/AuthContext';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <AuthProvider>
      <div
        className={`App min-h-screen relative ${isHomePage
            ? "bg-cover bg-center bg-fixed"
            : "dark:bg-slate-800"
          }`}
        style={
          isHomePage
            ? {
              backgroundImage:
                "url('https://images.unsplash.com/photo-1602391833977-358a52198938?q=80&w=1974&auto=format&fit=crop')",
            }
            : {}
        }
      >
        {isHomePage && (
          <div className="absolute inset-0 bg-black/50" />
        )}

        <div className="relative z-10">
          <Header isHomePage={isHomePage} />
          <AllRoutes />
          <Footer isHomePage={isHomePage} />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
