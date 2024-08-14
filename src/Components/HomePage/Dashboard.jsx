import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
const AccountBalance = React.lazy(()=> import('../AccountBalance'));
const TotalTransactions = React.lazy(()=> import('../DashboradComponents/TotalTransactions'));
const RecentActivity = React.lazy(()=> import('../Recentactivity'));
const Currency = React.lazy(()=> import('../currency'));
const MerchantTotalRefunds = React.lazy(()=> import('../DashboradComponents/TotalRefunds'));
const MerchantPendingWithdrawals = React.lazy(()=> import('./PendingWithdrawals'));
import CircularProgress from '@mui/joy/CircularProgress';







// All the component of Dashboard/Home Page section
export default function GatewayDashboard() {
    
    return (
        <>
            <Box sx={{zIndex: 0, marginTop: -8, padding: 4}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>

                        {/* Total Balance */}
                        <Suspense fallback={<CircularProgress sx={{display:'flex', justifyContent:'center', alignItems:'center'}}/>}>
                            <AccountBalance />
                        </Suspense>

                        <Grid container>
                            <Grid item xs={12} my={2}>

                                {/* Pocket Plan */}
                                <Suspense fallback={<CircularProgress sx={{display:'flex', justifyContent:'center', alignItems:'center'}}/>}>
                                    <MerchantPendingWithdrawals />
                                </Suspense>

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={8}>

                        {/* Total Transactions */}
                        <Suspense fallback={<CircularProgress sx={{display:'flex', justifyContent:'center', alignItems:'center'}}/>}>
                            <TotalTransactions />
                        </Suspense>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} my={3}>

                                {/* Total Refund */}
                                <Suspense fallback={<CircularProgress sx={{display:'flex', justifyContent:'center', alignItems:'center'}}/>}>
                                    <MerchantTotalRefunds />
                                </Suspense>

                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} md={6} my={2}>

                        {/* Recent Activity */}
                        <Suspense fallback={<CircularProgress sx={{display:'flex', justifyContent:'center', alignItems:'center'}}/>}>
                            <RecentActivity />
                        </Suspense>

                    </Grid>

                    <Grid item xs={12} md={6} my={2}>

                        {/* Currency */}
                        <Suspense fallback={<CircularProgress sx={{display:'flex', justifyContent:'center', alignItems:'center'}}/>}>
                            <Currency /> 
                        </Suspense>

                    </Grid>
                </Grid>
            </Box>
        </>
    );
};


