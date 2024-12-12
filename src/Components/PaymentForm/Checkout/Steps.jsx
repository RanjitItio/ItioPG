import PaymentFormAmountStep from "./AmountStep";
import PaymentFormCustomerDetailStep from "./CustomerDetailStep";
import { useState, useEffect } from "react";
import axiosInstance from "../../Authentication/axios";


const steps = ['Amount Details', 'Customer Details'];


// All payment form steps
export default function PaymentFormAllSteps () {
    const [current, setCurrent] = useState(0);  // All steps
    const [amountDetails, setAmountDetails] = useState([]); // Amount fields data
    const [CustomerAmountError, setCustomerAmountError] = useState(''); // Amount fields Error
    const [phoneNumberError, setPhoneNumberError] = useState(''); //  Phone Number Field Error
    const [emailError, setEmailError] = useState(''); // Email Field Error
    const [formValue, updateFormValues]     = useState({
        email: '', phoneno: '', customerAmt: 0
    });   // All steps data


     // Get the query params for the query
     const queryParams = new URLSearchParams(location.search);
     const button_id = queryParams.get('payment_button')

    // Call API while the page loads to get the merchant selected amount fields and label
    useEffect(() => {
        axiosInstance.get(`api/merchant/payment/form/fields/?form_id=${button_id}`).then((res)=> {
            // console.log(res)

            if (res.status === 200 && res.data.success === true) {
                setAmountDetails(res.data.merchant_payment_form)
            }
        }).catch((error)=> {
            // console.log(error)

        })
    }, []);


    // Capture all the step values
    const handleStepValueChange  = (e)=> {
        const { name, value } = e.target;

        if (name === 'customerAmt' && value.length > 6) {
            setCustomerAmountError('Amount must be less than 6 digits');

        } else if (name === 'phoneno' && value.length > 10) {
            setPhoneNumberError('Phone number must be at least 10 digits');

        } else if (name === 'email' && value.length > 46) {
            setEmailError('Email must be at least 46 characters');

        } else {
            setCustomerAmountError('');
            setPhoneNumberError('');

            updateFormValues({...formValue, 
                [e.target.name]: e.target.value
            });
        }
       
    };



    return (
        <>
            {current === 0 && (
                <PaymentFormAmountStep 
                    current={current} 
                    steps={steps}
                    setCurrent={setCurrent}
                    amountDetails={amountDetails}
                    handleStepValueChange={handleStepValueChange}
                    formValue={formValue}
                    CustomerAmountError={CustomerAmountError}
                    setCustomerAmountError={setCustomerAmountError}
                />
            )}

            {current === 1 && (
                <PaymentFormCustomerDetailStep 
                    current={current}
                    steps={steps}
                    setCurrent={setCurrent}
                    amountDetails={amountDetails}
                    handleStepValueChange={handleStepValueChange}
                    formValue={formValue}
                    phoneNumberError={phoneNumberError}
                    emailError={emailError}
                />
            )}


        </>
    );
};