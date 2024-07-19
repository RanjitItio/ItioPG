import {TextField, Grid} from '@mui/material';
import TestFooterSection from './Footer';
import MaskedInput from 'react-text-mask';
import { useState } from 'react';


const cardNumberMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
const expiryMask     = [/\d/, /\d/, '/', /\d/, /\d/];



export default function TestCardPayment({...props}) {

    const initialFormValues = {
        expiry: '',
        cardHolderName: '',
        secretCode: ''
    };

    const [cardType, setCardType]        = useState('');
    const [cardError, setCardError]      = useState('');
    const [cardNumber, setCardNumber]    = useState('');
    const [formValues, updateFormValues] = useState(initialFormValues);
    const [expiryError, setExpiryError]  = useState('');
    const [cvvError, setCvvError]        = useState('');
    const [holderNameError, setHolderNameError] = useState('');


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
                MerchantOrderId: props.merchantOrderID
            }

            const encoded_base64 = btoa(JSON.stringify(PAYLOAD))
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

        <TestFooterSection
           merchantTransactionAmount={props.merchantTransactionAmount}
           merchantTransactionCurrency={props.merchantTransactionCurrency}
           disblePayButton={props.disblePayButton}
           handleSubmitCardPayment={handleSubmitCardPayment}
        //    loadingButton={props.loadingButton}
        />
        </div>

    );
};