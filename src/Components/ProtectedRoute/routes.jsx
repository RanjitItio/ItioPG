import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./authProvider";
import ProtectedRoute from './protectedRoutes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from '../Authentication/Signin';
import Signup from "../Authentication/Signup";
import Navbar from '../Navbar/navBar';
import WelcomeSection from '../HomePage/WelcomeSection';
import GatewayDashboard from '../HomePage/Dashboard';
import BusinessTransactionTable from '../Transactions/TransactionTable';
import AllBusinessTable from '../Business/BusinessTable';
import KYCForm from "../Authentication/KycForm";
import KYCSubmission from "../Authentication/KycSubmit";
import Signout from "../Authentication/Signout";
import AddNewBusines from "../Business/AddBusiness";
import UpdateMerchant from "../Business/UpdateBusiness";
import PaymentCheckoutPage from "../PaymentCheckout/checkout";
import UPIQRCOde from "../PaymentCheckout/UPIQR";







// Authentication Route
const AuthRoutes = () => {


    const { token } = useAuth();
    
    const routesForPublic = [
      {
        path: "/service",
        element: <div>Service Page</div>,
      },
      {
        path: "/merchant/payment/checkout/",
        element: <PaymentCheckoutPage />,
      },
    ];
  
   
    const routesForAuthenticatedOnly = [
      {
        path: '/signup/',
        element: <Signup />,
      },
      {
        path: '/signin/',
        element: <Signin />,
      },
      {
        path: "*",
        element: <ProtectedRoute />, 
        children: [
          {
            path: "*",
            element: (
        <>
                <Navbar />
                <Routes>

                  <Route exact path='/merchant/add/businesses/' element={<AddNewBusines />}></Route>
                  <Route exact path='/merchant/update/businesses/' element={<UpdateMerchant />}></Route>

                  <Route exact path='*' element={
                    <>

                      {/* With Navbar and Welcome section   */}
                      <WelcomeSection />

                      <Routes>
                          <Route exact path='/' element={<GatewayDashboard />}></Route>
                          <Route exact path='/merchant/business/transactions/' element={<BusinessTransactionTable />}></Route>
                          <Route exact path='/merchant/businesses/' element={<AllBusinessTable />}></Route>
                      </Routes>
                      
                      </>
                  }></Route>
                </Routes>
                </>
            ),
          },
        ],
      },
    ];
  

    const routesForNotAuthenticatedOnly = [
      {
        path: "/signup/",
        element: <Signup />,
      }, 
      {
        path: "/signin/",
        element: <Signin />,
      },
      {
        path: "/signout/",
        element: <Signout />,
      },
      {
        path: "/kyc/",
        element: <KYCForm />,
      },
      {
        path: "/kyc/success/",
        element: <KYCSubmission />,
      },
    ];
  
    
    const router = createBrowserRouter([
      ...routesForPublic,
      ...(!token ? routesForNotAuthenticatedOnly : []),
      ...routesForAuthenticatedOnly,
    ]);
    
    return <RouterProvider router={router} />;
  
  };



export default AuthRoutes;