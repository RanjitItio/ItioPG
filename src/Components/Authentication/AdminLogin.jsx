import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";






export default function AdminLogin() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const access_token  = queryParams.get('access');
    const refresh_token = queryParams.get('refresh');
    const merchant_name = queryParams.get('name');
    const isMerchant    = queryParams.get('ismerchant');

    

    useEffect(() => {
        if (access_token && refresh_token) {
            localStorage.setItem('refresh_token', refresh_token)
            localStorage.setItem('access_token', access_token)
            localStorage.setItem('token', access_token)
            localStorage.setItem('user_name', merchant_name)
            localStorage.setItem('is_merchant', isMerchant)
    
            setTimeout(() => {
                navigate('/?refresh=true')
            }, 2000);
    
        } else {
            return (
                <p>Not accessible</p>
            )
        };
    }, [access_token, refresh_token]);
    
    
    
    return (
        <>
        </>
    );
};