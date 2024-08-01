import { Box, Typography, Button } from "@mui/material";




// Footer Section
export default function PreviewFooterSection({buttonText}) {

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt= 'auto'
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
            <Typography variant="p">
               <b>0.00 USD</b>
            </Typography>

            <Button
                disabled
                variant="contained"
                size="small"
                sx={{
                    "&.Mui-disabled": {
                    background: "#0081cf",
                    color: "white"
                    }
                }}
                >
                {buttonText ? buttonText : 'Proceed to Pay'}
            </Button>
              
          </Box>
    );
    
};