import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import GatewayDashboard from './Components/HomePage/HomeDash';



function App() {
  
  return (
    <Router>
      <Routes>
          <Route exact path='/' element={<GatewayDashboard />}></Route>
      </Routes>
    </Router>
    

  );
};

export default App
