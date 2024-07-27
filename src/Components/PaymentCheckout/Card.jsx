import {TextField, Grid} from '@mui/material';
import { useState } from 'react';
import MaskedInput from 'react-text-mask';
import FooterSection from './Footer';
import axiosInstance from '../Authentication/axios';
import { useNavigate } from 'react-router-dom';
import MasterCardOTPComponent from '../Mastercard/otp';




// Card Payment
export default function CardPayment({...props}) {
    const initialFormValues = {
        expiry: '',
        cardHolderName: '',
        secretCode: ''
    }

    const cardNumberMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
    const expiryMask     = [/\d/, /\d/, '/', /\d/, /\d/];

    const navigate = useNavigate();

    const [cardType, setCardType]              = useState('');
    const [cardError, setCardError]            = useState('');
    const [cardNumber, setCardNumber]          = useState('');
    const [expiryError, setExpiryError]        = useState('');
    const [cvvError, setCvvError]              = useState('');
    const [holderNameError, setHolderNameError] = useState('');
    const [formValues, updateFormValues]       = useState(initialFormValues);
    const [sessionID, setSessionID]            = useState('');
    const [transactionID, setTransactionID]    = useState('');
    const [apiError, setAPIError]              = useState('');  // API Response Error




    const IdentifyCardType =(e)=> {
        const number = e.target.value;
        const cleaned = number.replace(/\D/g, '');
        setCardNumber(cleaned)

        if (/^4/.test(cleaned)) {
            setCardType('Visa')
            setCardError('Only Master card accepted')

        } else if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) {
            setCardType('Mastercard')
            // setCardNumber(cleaned)

        } else if (/^3[47]/.test(cleaned)) {
            setCardType('American Express');
            // setCardError('Only Master card accepted')

        } else if (/^6(?:011|5|4[4-9]|22)/.test(cleaned)) { 
            setCardType('Discover');
            // setCardError('Only Master card accepted')

        } else if (/^35(2[89]|[3-8][0-9])/.test(cleaned)) {
            setCardType('JCB');
            // setCardError('Only Master card accepted')

        } else if (/^3(?:0[0-5]|[68])/.test(cleaned)) {
            setCardType('Diners Club');
            // setCardError('Only Master card accepted')

        } else {
            setCardType('Others');
            // setCardError('');
        }

    };


    // Capture the card details
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
                MerchantOrderId: props.merchantOrderID
            }

            const encoded_base64 = btoa(JSON.stringify(PAYLOAD))

            // setLoader(true)
            
            // Call API to process the transaction
            axiosInstance.post(`api/pg/prod/v1/pay/mc/`, {
                    request: encoded_base64

                }).then((res)=> {
                    console.log(res)

                    if (res.status === 200 && res.data.status === 'AUTHENTICATION_IN_PROGRESS') {
                        setSessionID(res.data.session)
                        setTransactionID(res.data.transactionID)

                        // Disable the Loading button
                        // props.setLoadingButton(false)

                        setTimeout(() => {
                            props.setLoadingButton(false)
                            navigate('/merchant/payment/mastercard/otp/')
                        }, 1000);
                    }

                }).catch((error)=> {
                    console.log(error)

                    if (error.response.data.status === 'PAYMENT_FAILED') {
                        setAPIError(error.response.data.message)

                         // Disable the Loading button
                         props.setLoadingButton(false)

                    } else {
                        setAPIError('')
                    }

                })
            }
        };



    return (
        <>
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
            {apiError && 
                <p style={{color: 'red', display: 'flex', 
                            justifyContent: 'center', alignItems:'center'}}
                        >
                    {apiError}
                </p>
            }

        <FooterSection
           merchantTransactionAmount={props.merchantTransactionAmount}
           merchantTransactionCurrency={props.merchantTransactionCurrency}
           disblePayButton={props.disblePayButton}
           handleSubmitCardPayment={handleSubmitCardPayment}
           loadingButton={props.loadingButton}
        />

        </div>

        {sessionID && transactionID && (
            <MasterCardOTPComponent sessionID={sessionID} transactionID={transactionID} />
        )}

        </>
    );
};