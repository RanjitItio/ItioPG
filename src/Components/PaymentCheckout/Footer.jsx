import { Box, Typography, Button } from "@mui/material"



export default function FooterSection() {
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
            <Typography variant="h6">₹ 1</Typography>
            <Button variant="contained" color="primary">Pay Now</Button>
          </Box>
    );
    
};