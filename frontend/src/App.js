import { Header, Footer } from './components';
import { AllRoutes } from './routes/AllRoutes';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <div className='App dark:bg-slate-800'>
        <Header />
        <AllRoutes />
        <Footer />
      </div>
    </AuthProvider>


  );
}

export default App;
