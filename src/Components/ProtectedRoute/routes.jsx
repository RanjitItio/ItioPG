import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./authProvider";
import { ProtectedRoute } from "./protectedRoutes";
import { Route, Routes } from 'react-router-dom';
import Signup from "../Authentication/Signup";
import Signin from "../Authentication/Login";





const AuthRoutes = () => {

    const { token } = useAuth();
  

    const routesForPublic = [
      {
        path: "/service",
        element: <div>Service Page</div>,
      },
      {
        path: "/about-us",
        element: <div>About Us</div>,
      },
    ];
  
   
    const routesForAuthenticatedOnly = [
      {
        path: "*",
        element: <ProtectedRoute />, 
        children: [
          {
            path: "*",
            element: (
              
                <Routes>
                    <Route exact path='/signup/' element={<Signup />}></Route>
                    <Route exact path='/signin/' element={<Signin />}></Route>

                  <Route exact path='*' element={

                      <Routes>
                          <Route exact path='/test/transaction/table/' element={<TransactionTable open={open} />}></Route>
                          <Route exact path='/' element={<CryptoFiat open={open} />}></Route>
                      </Routes>
                
                  }></Route>
                </Routes>
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

    ];
  
    
    const router = createBrowserRouter([
      ...routesForPublic,
      ...(!token ? routesForNotAuthenticatedOnly : []),
      ...routesForAuthenticatedOnly,
    ]);
    
    return <RouterProvider router={router} />;
  
  };



export default AuthRoutes;