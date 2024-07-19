import { Box, Typography, Button } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';



export default function TestFooterSection({...props}) {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
            sx={{
              position: 'sticky',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' ,
              bottom: 0,
              backgroundColor: 'white',
              padding: 2,
              borderTop: '1px solid #e0e0e0',
              zIndex: 1000,
              ':hover': {
                backgroundColor: '#f5f5f5', 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
              }
            }}
          >
            <Typography variant="h6">
                {props.merchantTransactionCurrency === "USD" ? <AttachMoneyIcon /> : ''}
                {props.merchantTransactionAmount}
            </Typography>

            <Button 
                variant="contained" 
                color="primary"
                disabled={props.disblePayButton}
                onClick={props.handleSubmitCardPayment}
                >
              Pay Now
            </Button>
          </Box>
    );
    
};