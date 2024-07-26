import {TextField, Grid} from '@mui/material';
import TestFooterSection from './Footer';
import MaskedInput from 'react-text-mask';
import { useState } from 'react';
import axiosInstance from '../Authentication/axios';



const cardNumberMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
const expiryMask     = [/\d/, /\d/, '/', /\d/, /\d/];


// Sandbox card payment
export default function TestCardPayment({...props}) {

    const initialFormValues = {
        expiry: '',
        cardHolderName: '',
        secretCode: ''
    };

    const [cardType, setCardType]        = useState('');   // Card type state(MC, Visa etc.)
    const [cardError, setCardError]      = useState('');   // Card type error state(MC, Visa etc.)
    const [cardNumber, setCardNumber]    = useState('');  // Card number state
    const [formValues, updateFormValues] = useState(initialFormValues);  // All card fields state
    const [expiryError, setExpiryError]  = useState('');         // Expiry field empty state
    const [cvvError, setCvvError]        = useState('');         // Cvv field is empty state
    const [holderNameError, setHolderNameError] = useState('');  // Card holder name is empty state
    const [error, setError]              = useState('');  // Error from API state

     // Method to Identify card type
    const IdentifyCardType =(e)=> {
        const number = e.target.value;
        const cleaned = number.replace(/\D/g, '');
        setCardNumber(cleaned)

        if (/^4/.test(cleaned)) {
            setCardType('Visa')
            setCardError('Only Master card accepted')

        } else if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) {
            setCardType('Mastercard')

        } else if (/^3[47]/.test(cleaned)) {
            setCardType('American Express');

        } else if (/^6(?:011|5|4[4-9]|22)/.test(cleaned)) { 
            setCardType('Discover');

        } else if (/^35(2[89]|[3-8][0-9])/.test(cleaned)) {
            setCardType('JCB');

        } else if (/^3(?:0[0-5]|[68])/.test(cleaned)) {
            setCardType('Diners Club');

        } else {
            setCardType('Others');
        }

    };

    // Capture the card details and change the format
    const handleChange = (e)=> {
        const {name, value} = e.target;
        props.setDisablePayButton(false);

        let sanitizedCVVValue = value;

        if (name === 'secretCode') {
           if (value.length > 3) {
              sanitizedCVVValue = value.slice(0, 3)

           } else if (!/^\d*$/.test(value)) {
              sanitizedCVVValue = value.replace(/\D/g, '');
            }

            e.target.value = sanitizedCVVValue;
        };

        updateFormValues({
          ...formValues,
          [name]: sanitizedCVVValue
        })
  };

     // Submit the Card detail
     const handleSubmitCardPayment = ()=> {
        if (cardType !== 'Mastercard') {
            setCardError('Only Master card accepted')
        }
        else if (cardNumber === '') {
            setCardError('Please type card number')

        } else if (formValues.expiry === '') {
            setExpiryError('Please type card expiry date')

        } else if (formValues.secretCode === '') {
            setCvvError('Please type Card CVV')
            
        } else if (formValues.cardHolderName === '') {
            setHolderNameError('Please type Card holder name')
            
        } else {
            // Show loading button
            // props.setDisablePayButton(true);
            props.setLoadingButton(true)

            setExpiryError('');
            setCardError('');
            setCvvError('');
            setHolderNameError('');

            const PAYLOAD = {
                cardNumber: cardNumber,
                cardExpiry: formValues.expiry,
                cardCvv: formValues.secretCode,
                cardHolderName: formValues.cardHolderName,
                MerchantOrderId: props.merchantOrderID,
                paymentMode: 'Card'
            }

            const encoded_base64 = btoa(JSON.stringify(PAYLOAD))

            // Call API to process the transaction
            axiosInstance.post(`/api/v1/pg/sandbox/merchant/process/transactions/`, {
                request: encoded_base64

            }).then(async (res)=> {
                // console.log(res.data)

                // If Success status received
                if (res.status === 200 && res.data.status === 'PAYMENT_SUCCESS') {
                    let redirectUrl = res.data.merchantRedirectURL

                    setTimeout(() => {
                        window.location.href = `/merchant/payment/success/?url=${redirectUrl}`
                    }, 2000);
                }

                // If failed status received
                else if (res.status === 200 && res.data.status === 'PAYMENT_FAILED') {
                    let redirectUrl = res.data.merchantRedirectURL

                    setTimeout(() => {
                        window.location.href = `/merchant/payment/fail/?url=${redirectUrl}`
                    }, 2000);
                }

            }).catch((error)=> {
                console.log(error)

                if (error.response) {
                    if (error.response.data.error === 'Transaction has been closed') {
                        setError('Transaction Closed')
                        props.setLoadingButton(false); 
                    } else if (error.response.data.error === 'Please initiate transaction') {
                        setError('Please reinitiate Transaction')
                    } else if (error.response.data.error === 'Merchant Public key not found') {
                        setError('Invalid merchantPublicKey')
                    } else {
                        setError('')
                    };
                };
            })
        }
     };


    return (
        <div style={{marginBottom:'90px'}}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
            <MaskedInput
                mask={cardNumberMask}
                guide={false}
                name='cardNumber'
                value={cardNumber}
                onChange={(e)=> {IdentifyCardType(e);}}
                render={(ref, props) => (
                    <TextField
                    {...props}
                    inputRef={ref}
                    type="text"
                    size="small"
                    id="card_number"
                    label="Card Number"
                    variant="outlined"
                    fullWidth
                    error={Boolean(cardError)}
                    helperText={cardError}
                    />
                )}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
            <MaskedInput
                mask={expiryMask}
                guide={false}
                name='expiry'
                value={formValues.expiry}
                onChange={handleChange}
                render={(ref, props) => (
                    <TextField
                    {...props}
                    inputRef={ref}
                    type="text"
                    size="small"
                    id="expiry"
                    label="Expiry"
                    variant="outlined"
                    fullWidth
                    error={Boolean(expiryError)}
                    helperText={expiryError}
                    />
                )}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField 
                        size='small'
                        name='secretCode' 
                        id="secretCode" 
                        label="CVV" 
                        variant="outlined" 
                        fullWidth 
                        onChange={handleChange}
                        error={Boolean(cvvError)}
                        helperText={cvvError}
                    />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField 
                    size='small' 
                    id="cardHolderName" 
                    name='cardHolderName'
                    label="Card Holder Name" 
                    variant="outlined" 
                    onChange={handleChange}
                    error={Boolean(holderNameError)}
                    helperText={holderNameError}
                    fullWidth 
                     />
            </Grid>

        </Grid>

        {/* API Response Error Message */}
        {error && 
                <p style={{color: 'red', display: 'flex', 
                            justifyContent: 'center', alignItems:'center'}}
                        >
                    {error}
                </p>
            }

        <TestFooterSection
           merchantTransactionAmount={props.merchantTransactionAmount}
           merchantTransactionCurrency={props.merchantTransactionCurrency}
           disblePayButton={props.disblePayButton}
           handleSubmitCardPayment={handleSubmitCardPayment}
           loadingButton={props.loadingButton}
        />
        </div>

    );
};