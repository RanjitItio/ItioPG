import AuthProvider from './Components/ProtectedRoute/authProvider';
import AuthRoutes from './Components/ProtectedRoute/protectedRoutes';





function App() {
  
  return (

    <AuthProvider>
      <AuthRoutes />
    </AuthProvider>
    
  );
};

export default App
