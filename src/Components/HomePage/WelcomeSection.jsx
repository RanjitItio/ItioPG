import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import animationData from '../Animations/WelcomeRobot.json';
import Lottie from 'lottie-react';






export default function WelcomeSection() {

    const user_full_name = localStorage.getItem('user_name');

    return (

        <Box sx={{ backgroundColor: "#2C73D2", paddingBottom: 5}}>
            <Typography variant="h4" sx={{ pt: 2, pb: 2, marginLeft: "4rem", color: "white", display: 'flex', alignItems: 'center' }}>
                <span>
                    Welcome, {user_full_name}
                </span>
                <Lottie animationData={animationData} loop={true} style={{width:'100px', height: '100px'}} />
            </Typography>

            <Typography variant="body1" sx={{ marginLeft: "4rem", color: "white" }}>
                Dashboard &gt; Overview
            </Typography>

            <Box sx={{display: 'flex', overflowX: 'auto', ml: '3.5rem', mt: 3, '& > *': { flexShrink: 0 }}}>
                <Button 
                    component={Link} 
                    to="/" 
                    variant="contained"
                    sx={{ 
                    color: "whitesmoke", 
                    backgroundColor: "transparent", 
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                    mr: 2 
                }}>
                    Overview
                </Button>

                <Button 
                    component={Link} 
                    to="/merchant/business/transactions/" 
                    variant="text" 
                    sx={{ 
                    color: "white", 
                    mr: 2 
                    }}
                >
                    Transaction
                </Button>

                <Button 
                    component={Link} 
                    to="/merchant/businesses/" 
                    variant="text" 
                    sx={{ 
                    color: "white", 
                    mr: 2 
                    }}
                >
                    Business
                </Button>

                <Button 
                    component={Link} 
                    to="/merchant/bank/accounts/" 
                    variant="text" 
                    sx={{ 
                    color: "white", 
                    mr: 2 
                    }}
                >
                    Bank Accounts
                </Button>
            </Box>

            <Divider sx={{width: "18rem", backgroundColor: "grey", height: "1px", mt: 1, ml: "3.5rem"}} className="green-line" />
        
            </Box>
    );
};