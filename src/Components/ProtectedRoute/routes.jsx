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
import TestPaymentCheckoutPage from "../PaymentTestCheckout/checkout";
import MasterCardOTPComponent from "../Mastercard/otp";
import PaymentSuccessPage from "../PaymentStatus/Success";
import PaymentFailedPage from "../PaymentStatus/Failed";
import MastercardPaymentStatus from "../PaymentCheckout/MCPaymentStatus";
import DeveloperTools from "../Developer/DevTools";
import APIKeys from "../Developer/APIKeys";
import DevDocs from "../Developer/Devdocs";
import MerchantBankAccounts from "../Bank/BankAccounts";
import AddMerchantBankAccount from "../Bank/AddBankaccount";
import UpdateMerchantBankAccount from "../Bank/updateBank";
import SandBoxProcessStepper from "../Steps/steps";
import AllPaymentForms from "../PaymentForm/Froms";
import PaymentForm from "../PaymentForm/PaymentForms";
import PaymentFormAllSteps from "../PaymentForm/Checkout/Steps";
import 'bootstrap/dist/css/bootstrap.min.css';
// import ForgetPassword from "../Authentication/ForgotPassword";

const ForgetPassword = React.lazy(()=> import('../Authentication/ForgotPassword'))






// Authentication Route
const AuthRoutes = () => {


    const { token } = useAuth();
    
    const routesForPublic = [
      {
        path: "/kyc/",
        element: <KYCForm />,
      },
      {
        path: "/kyc/success/",
        element: <KYCSubmission />,
      },
      {
        path: "/merchant/payment/checkout/",
        element: <PaymentCheckoutPage />,
      },
      {
        path: "/merchant/payment/sb/checkout/",
        element: <TestPaymentCheckoutPage />,
      },
      {
        path: "/merchant/payment/mastercard/otp/",
        element: <MasterCardOTPComponent />,
      },
      {
        path: "/merchant/payment/success/",
        element: <PaymentSuccessPage />,
      },
      {
        path: "/merchant/payment/fail/",
        element: <PaymentFailedPage />,
      },
      {
        path: "/mastercard/payment/status/",
        element: <MastercardPaymentStatus />,
      },
      {
        path: "/pg/developer/docs/",
        element: <DevDocs />,
      },
      {
        path: "/merchant/pg/payment/form/step/",
        element: <PaymentFormAllSteps />,
      },
      {
        path: "/merchant/bank/NA/",
        element: <div>Nothing to show</div>,
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
        path: '/forgot-password/',
        element: <ForgetPassword />,
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
                  <Route exact path='/merchant/developer/tools/' element={<DeveloperTools />}></Route>
                  <Route exact path='/merchant/developer/api/keys/' element={<APIKeys />}></Route>

                  {/* Bank Account */}
                  <Route exact path='/add/merchant/bank/account/' element={<AddMerchantBankAccount />}></Route>
                  <Route exact path='/update/merchant/bank/accounts/' element={<UpdateMerchantBankAccount />}></Route>

                  {/* SandBox Steps */}
                  <Route exact path='/merchant/sandbox/steps/' element={<SandBoxProcessStepper />}></Route>

                  {/* SandBox Steps */}
                  <Route exact path='/merchant/payment/forms/' element={<AllPaymentForms />}></Route>
                  <Route exact path='/merchant/payment/form/steps/' element={<PaymentForm />}></Route>

                  
                  <Route exact path='*' element={
                    <>

                      {/* With Navbar and Welcome section   */}
                      <WelcomeSection />

                      <Routes>
                          <Route exact path='/' element={<GatewayDashboard />}></Route>
                          <Route exact path='/merchant/business/transactions/' element={<BusinessTransactionTable />}></Route>
                          <Route exact path='/merchant/businesses/' element={<AllBusinessTable />}></Route>
                          <Route exact path='/merchant/bank/accounts/' element={<MerchantBankAccounts />}></Route>
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
      {
        path: "/forgot-password/",
        element: <ForgetPassword />,
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