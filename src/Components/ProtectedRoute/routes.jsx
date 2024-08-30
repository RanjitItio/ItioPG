import React, {Suspense} from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./authProvider";
import ProtectedRoute from './protectedRoutes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from '../Authentication/Signin';
import Signup from "../Authentication/Signup";
import Navbar from '../Navbar/navBar';
import WelcomeSection from '../HomePage/WelcomeSection';
// import GatewayDashboard from '../HomePage/Dashboard';
// import BusinessTransactionTable from '../Transactions/TransactionTable';
// import AllBusinessTable from '../Business/BusinessTable';
import KYCForm from "../Authentication/KycForm";
import KYCSubmission from "../Authentication/KycSubmit";
import Signout from "../Authentication/Signout";
import AddNewBusines from "../Business/AddBusiness";
import UpdateMerchant from "../Business/UpdateBusiness";
// import PaymentCheckoutPage from "../PaymentCheckout/checkout";
import TestPaymentCheckoutPage from "../PaymentTestCheckout/checkout";
// import MasterCardOTPComponent from "../Mastercard/otp";
// import PaymentSuccessPage from "../PaymentStatus/Success";
// import PaymentFailedPage from "../PaymentStatus/Failed";
import MastercardPaymentStatus from "../PaymentCheckout/MCPaymentStatus";
import DeveloperTools from "../Developer/DevTools";
import APIKeys from "../Developer/APIKeys";
// import MerchantBankAccounts from "../Bank/BankAccounts";
import AddMerchantBankAccount from "../Bank/AddBankaccount";
import UpdateMerchantBankAccount from "../Bank/updateBank";
import SandBoxProcessStepper from "../Steps/steps";
import AllPaymentForms from "../PaymentForm/Froms";
import PaymentForm from "../PaymentForm/PaymentForms";
import PaymentFormAllSteps from "../PaymentForm/Checkout/Steps";
import 'bootstrap/dist/css/bootstrap.min.css';



import CircularProgress from '@mui/joy/CircularProgress';
const GatewayDashboard = React.lazy(()=> import('../HomePage/Dashboard'));
const ForgetPassword = React.lazy(()=> import('../Authentication/ForgotPassword'));
const PaymentCheckoutPage = React.lazy(()=> import('../PaymentCheckout/checkout'));
const PaymentSuccessPage = React.lazy(()=> import('../PaymentStatus/Success'));
const PaymentFailedPage = React.lazy(()=> import('../PaymentStatus/Failed'));
const MasterCardOTPComponent = React.lazy(()=> import('../Mastercard/otp'));
const MerchantWithdrawalRequests = React.lazy(()=> import('../Withdrawal/AllWithdrawals'));
const BusinessTransactionTable = React.lazy(()=> import('../Transactions/TransactionTable'));
const AllBusinessTable = React.lazy(()=> import('../Business/BusinessTable'));
const MerchantBankAccounts = React.lazy(()=> import('../Bank/BankAccounts'));
const APILogs = React.lazy(()=> import('../APILogs/APILog'));
const AllMerchantRefundRequests = React.lazy(()=> import('../Refund/AllRefunds'));
const DevDocs = React.lazy(()=> import('../Developer/Docs/Devdocs'));






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
      element: (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentCheckoutPage />
        </Suspense>
      ),
    },
    {
      path: "/merchant/payment/sb/checkout/",
      element: <TestPaymentCheckoutPage />,
    },
    {
      path: "/merchant/payment/mastercard/otp/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
            <MasterCardOTPComponent />
        </Suspense>
      ),
    },
    {
      path: "/merchant/payment/success/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <PaymentSuccessPage />
        </Suspense>
      ),
    },
    {
      path: "/merchant/payment/fail/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentFailedPage />
        </Suspense>
      ),
    },
    {
      path: "/mastercard/payment/status/",
      element: <MastercardPaymentStatus />,
    },
    {
      path: "/pg/developer/docs/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <DevDocs />
        </Suspense>
        ),
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
      element: (
        <Suspense fallback={<div>Loading...</div>}>
            <ForgetPassword />
        </Suspense>
      )
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
              <Suspense fallback={<CircularProgress sx={{display:'flex', justifyContent:'center', alignItems:'center'}}/>}>
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

                {/* API Logs */}
                <Route exact path='/merchant/api/logs/' element={<APILogs />}></Route>

                
                <Route exact path='*' element={
                  <>

                    {/* With Navbar and Welcome section   */}
                    <WelcomeSection />

                    {/* <Suspense fallback={<CircularProgress sx={{display:'flex', justifyContent:'center', alignItems:'center'}}/>}> */}
                    <Routes>
                        <Route exact path='/' element={<GatewayDashboard />}></Route>
                        <Route exact path='/merchant/business/transactions/' element={<BusinessTransactionTable />}></Route>
                        <Route exact path='/merchant/businesses/' element={<AllBusinessTable />}></Route>
                        <Route exact path='/merchant/bank/accounts/' element={<MerchantBankAccounts />}></Route>
                        <Route exact path='/merchant/withdrawal/requests/' element={<MerchantWithdrawalRequests />}></Route>
                        {/* Refunds */}
                        <Route exact path='/merchant/refund/requests/' element={<AllMerchantRefundRequests />}></Route>

                    </Routes>
                    {/* </Suspense> */}
                    
                    </>
                }></Route>
              </Routes>
              </Suspense>
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
      element: (
        <Suspense fallback={<div>Loading...</div>}>
            <ForgetPassword />
        </Suspense>
      )
    },
  ];

  
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(token ? [] : routesForNotAuthenticatedOnly),
    ...routesForAuthenticatedOnly,
  ]);
  
  return <RouterProvider router={router} />;

};



export default AuthRoutes;