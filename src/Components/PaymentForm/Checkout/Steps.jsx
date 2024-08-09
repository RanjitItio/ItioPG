import PaymentFormAmountStep from "./AmountStep";
import PaymentFormCustomerDetailStep from "./CustomerDetailStep";
import { useState, useEffect } from "react";
import axiosInstance from "../../Authentication/axios";


const steps = ['Amount Details', 'Customer Details'];


// All payment form steps
export default function PaymentFormAllSteps () {
    const [current, setCurrent] = useState(0);  // All steps
    const [amountDetails, setAmountDetails] = useState([]); // Amount fields data
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
            console.log(error)

        })
    }, []);


    // Capture all the step values
    const handleStepValueChange  = (e)=> {
        updateFormValues({...formValue, 
            [e.target.name]: e.target.value
        })
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
                />
            )}


        </>
    );
};