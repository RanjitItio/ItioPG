import AuthProvider from './Components/ProtectedRoute/authProvider';
import AuthRoutes from './Components/ProtectedRoute/routes';






function App() {
  
  return (

    <AuthProvider>
      <AuthRoutes />
    </AuthProvider>

    // <Router>

    //   <Navbar />
    //   <WelcomeSection />

    //   <Routes>

    //       <Route exact path='/' element={<GatewayDashboard />}></Route>
    //       <Route exact path='/merchant/business/transactions/' element={<BusinessTransactionTable />}></Route>
    //       <Route exact path='/merchant/businesses/' element={<AllBusinessTable />}></Route>

    //   </Routes>

    // </Router>

    
  );
};

export default App
