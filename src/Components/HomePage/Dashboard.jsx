import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AccountBalance from '../AccountBalance';
import ActiveGateways from '../Gateway';
import TotalTransactions from '../DashboradComponents/TotalTransactions';
import RecentActivity from '../Recentactivity';
import Currency from '../currency';
import MerchantTotalRefunds from '../DashboradComponents/TotalRefunds';





// All the component of Dashboard/Home Page section
export default function GatewayDashboard() {
    
    return (
        <>
            <Box sx={{zIndex: 0, marginTop: -8, padding: 4}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>

                        {/* Total Balance */}
                        <AccountBalance />

                        <Grid container>
                            <Grid item xs={12} my={2}>

                                {/* Pocket Plan */}
                                <ActiveGateways />

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={8}>

                        {/* Total Transactions */}
                        <TotalTransactions />

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} my={3}>

                                {/* Total Refund */}
                                <MerchantTotalRefunds />

                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} md={6} my={2}>

                        {/* Recent Activity */}
                        <RecentActivity />

                    </Grid>

                    <Grid item xs={12} md={6} my={2}>

                        {/* Currency */}
                        <Currency /> 

                    </Grid>
                </Grid>
            </Box>
        </>
    );
};


