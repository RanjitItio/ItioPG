import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import animationData from '../Animations/WelcomeRobot.json';
import Lottie from 'lottie-react';
import Alert from '@mui/material/Alert';
import { useNavigate} from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { breadcrumbs } from './BreadCrumps';
import { useState, useEffect } from 'react';
import axiosInstance from '../Authentication/axios';






// Welcome Section
export default function WelcomeSection() {

    const user_full_name = localStorage.getItem('user_name');

    const navigate = useNavigate();
    const [breadcrumb, setBreadcrumb] = useState(breadcrumbs); // Breadcrumb Steps
    const [stepsData, setStepsData]   = useState([]);          // Merchant steps completed data
    const [showAlert, setShowAlert]   = useState(false);       // Sandbox alert notification


    // Snadbox alert Button method
    const handleAlertClicked = ()=> {
        navigate('/merchant/sandbox/steps/')
    };

    // Update Breadcrumb data
    const updateBreadCrumb =(path, label)=> {
        setBreadcrumb([
            {
                path: '/',
                label: 'Dashboard'
            },
            {
                path,
                label
            }
        ])
    };

    // Path button clicked
    const handleButtonClicked =(path, lable)=> {
        updateBreadCrumb(path, lable);
        navigate(path)
    };

    // Call API to get how many steps the user has completed
    useEffect(()=> {
        axiosInstance.get(`api/v2/merchant/sb/steps/`).then((res)=> {
            // console.log(res)

            if (res.status === 200 && res.data.success === true) {
                setStepsData(res.data)

                localStorage.setItem('i_sb_s_c', res.data.isCompleted)
                localStorage.setItem('i_sb_bs_c', res.data.businessStep)
                localStorage.setItem('i_sb_bks_c', res.data.bankStep)
            }

        }).catch((error)=> {
            console.log(error);

        });

    }, []);

    
    // All steps completed or not
    useEffect(() => {
       if (stepsData['isCompleted']) {
            setShowAlert(false);

       } else if (stepsData['isCompleted'] === false) {
            setShowAlert(true)
       } 

    }, [stepsData]);

    

    return (
        <Box sx={{ backgroundColor: "#2C73D2", paddingBottom: 5}}>

            {showAlert &&  
                <Alert 
                    severity="warning"
                    action={
                        <Button color='inherit' size='small' onClick={handleAlertClicked}>
                            Complete
                        </Button>
                    }
                >
                    Your account is in sandbox mode, Please activate your account!
                </Alert>
            }

            <Typography variant="h4" sx={{ pt: 2, pb: 2, marginLeft: "4rem", color: "white", display: 'flex', alignItems: 'center' }}>
                <span>
                    Welcome, {user_full_name}
                </span>
                <Lottie animationData={animationData} loop={true} style={{width:'100px', height: '100px'}} />
            </Typography>

            
            <Breadcrumbs 
                 separator={<NavigateNextIcon fontSize="small" />} 
                 aria-label="breadcrumb"
                 sx={{ marginLeft: "4rem"}}
            >
                {breadcrumb.map((breadcrumb, index) => (
                    <Link
                    underline="hover"
                    key={index}
                    color="inherit"
                    to={breadcrumb.path}
                    style={{color:'white'}}
                    >
                    {breadcrumb.label}
                    </Link>
                ))}
            </Breadcrumbs>


            <Box sx={{display: 'flex', overflowX: 'auto', ml: '3.5rem', mt: 3, '& > *': { flexShrink: 0 }}}>
                <Button 
                    onClick={()=> {handleButtonClicked('/', "Overview");}}
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
                    onClick={()=> {handleButtonClicked('/merchant/business/transactions/', "Transactions"); }}
                    variant="text" 
                    sx={{ 
                    color: "white", 
                    mr: 2 
                    }}
                >
                    Transaction
                </Button>

                <Button 
                    onClick={()=> {handleButtonClicked('/merchant/businesses/', 'Businesses'); }}
                    variant="text" 
                    sx={{ 
                    color: "white", 
                    mr: 2 
                    }}
                >
                    Business
                </Button>

                <Button 
                    onClick={()=> {handleButtonClicked('/merchant/bank/accounts/', 'Bank Accounts'); }}
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