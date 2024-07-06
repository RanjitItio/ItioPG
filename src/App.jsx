import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './Components/Navbar/navBar';
import WelcomeSection from './Components/HomePage/WelcomeSection';
import GatewayDashboard from './Components/HomePage/Dashboard';
import BusinessTransactionTable from './Components/Transactions/TransactionTable';
import AllBusinessTable from './Components/Business/BusinessTable';



function App() {
  
  return (
    <Router>

      <Navbar />
      <WelcomeSection />

      <Routes>

          <Route exact path='/' element={<GatewayDashboard />}></Route>
          <Route exact path='/merchant/business/transactions/' element={<BusinessTransactionTable />}></Route>
          <Route exact path='/merchant/businesses/' element={<AllBusinessTable />}></Route>

      </Routes>

    </Router>
    

  );
};

export default App
