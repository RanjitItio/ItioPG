import { Typography, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




export default function TestPaymentTopBar({setUPIQRPage, setAllPayment, setCardDetails, allPayment}) {

    const handleBack = ()=> {
        setUPIQRPage(false);
        setAllPayment(true);
        setCardDetails(false);
    };

    return (
        <Box 
             sx={{
                backgroundColor: '#0081CF', 
                position:'sticky', 
                top: 0, 
                zIndex: 1000,
                borderRadius: '9px 9px 0 0'
                }} 
                mt={2}
            >
            <Box sx={{ padding: '1px'}} display="flex" justifyContent="start" alignItems='start'>

                {!allPayment && 
                 <IconButton onClick={handleBack} sx={{marginTop: '2%'}}>
                    <ArrowBackIcon fontSize='small'/>
                 </IconButton>
                 }

                <img src="https://python-uat.oyefin.com/media/signup/merchant.png" alt="" style={{ width: '30px', height: '30px', marginLeft: '4px', marginTop: '3%' }} />
                <Typography variant="h6" color={'white'} sx={{marginLeft: '15px', marginTop: '3%'}}>Business Name</Typography>

            </Box>
            <hr style={{ margin: '1rem 0', borderTop: '1px solid black'}}  />
        </Box>

    );
};