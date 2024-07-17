import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



const IS_DEVELOPMENT = import.meta.env.VITE_IS_DEVELOPMENT

let URL = ''

if (IS_DEVELOPMENT === 'True') {
    URL = 'http://127.0.0.1:8000'
 } else {
     URL = 'https://python-uat.oyefin.com'
 };



export default function MastercardPaymentStatus() {
    const location = useLocation();
    const navigate = useNavigate();

    const [redirectURL, setRedirectURL] = useState('');  // Merchant redirect URL state
    const [loader, setloader] = useState(true);  // Loader for API Response state

    const queryParams = new URLSearchParams(location.search)
    let transaction_id = queryParams.get('transaction')

    if (!transaction_id) {
        transaction_id = null
    };

    useEffect(() => {
         axios.get(`${URL}/api/v1/prod/mastercard/validate/${transaction_id}`).then((res)=>{
            //   console.log(res)

              if (res.status == 200 && res.data.result == 'FAILURE' && res.data.gateway_response == 'DECLINED') {
                 setRedirectURL(res.data.redirect_url)
                 setloader(false)

                 navigate('/merchant/payment/fail/', {state: {transaction_id: transaction_id, URL: redirectURL}})
              }

              else if (res.status == 200 && res.data.result == 'SUCCESS') {
                setRedirectURL(res.data.redirect_url)
                setloader(false);

                navigate('/merchant/payment/success/', {state: {transaction_id: transaction_id, URL: redirectURL}})
              }

         }).catch((error)=> {
            console.log(error.response)
            setloader(false);

         })
    }, []);
    

    if (loader) {
        return( 
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw'}}>
                <CircularProgress />
            </Box>
        )
    };

    return (
        <>

        </>
    );
};