import { Typography, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



// Top bar for Business name
export default function TopBar ({setUPIQRPage, setAllPayment, setCardDetails, allPayment, merchantBusinessName, timer, formatTime}) {
    
    // Back button
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
                borderRadius: '9px 9px 0 0',
                display: 'flex',
                justifyContent: "space-between",
                alignItems: 'center',
                padding: '10px 12px',
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                }}  
                mt={2}
            >
    
            <Box sx={{ padding: '1px', display: 'flex', alignItems: 'center' }}>

                {!allPayment && 
                 <IconButton onClick={handleBack} sx={{marginTop: '2%'}}>
                    <ArrowBackIcon fontSize='small'/>
                 </IconButton>
                 }

                <img src="https://python-uat.oyefin.com/media/signup/merchant.png" alt="" style={{ width: '30px', height: '30px', marginLeft: '4px', marginTop: '3%' }} />
                <Typography variant="h6" color={'white'} sx={{marginLeft: '15px', marginTop: '3%'}}>{merchantBusinessName ? merchantBusinessName : 'Business Name'}</Typography>

            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color:'#ffff', marginRight:'6px'}}>{timer? formatTime(timer) : '00:00'}</Typography>
            </Box>

            {/* <hr style={{ margin: '1rem 0', borderTop: '1px solid black'}}  /> */}
        </Box>

    );
};