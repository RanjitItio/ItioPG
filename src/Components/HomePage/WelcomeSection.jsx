import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Link } from 'react-router-dom';





export default function WelcomeSection() {

    const user_full_name = localStorage.getItem('user_name');

    return (

        <Box sx={{ backgroundColor: "#2C73D2", paddingBottom: 5}}>
            <Typography variant="h4" sx={{ pt: 5, pb: 2, marginLeft: "4rem", color: "white" }}>
                <span>
                <b>Welcome, {user_full_name}</b>
                <EmojiEmotionsIcon sx={{ ml: 1 }} />
                </span>
            </Typography>

            <Typography variant="body1" sx={{ marginLeft: "4rem", color: "white" }}>
                Dashboard &gt; <b>Overview</b>
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
                    // to="/merchant/businesses/" 
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