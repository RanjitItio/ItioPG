import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AccountBalance from '../AccountBalance';
import TotalTransactions from '../DashboradComponents/TotalTransactions';
import MerchantMonthlyTransaction from './MonthyTransaction';
import StatsComponent from './Stats';
import RecentTransactions from './RecentTransactions';
import TransactionStatistics from './TransactionStatitics';
import Footer from '../Footer';
// import Currency from '../currency';
// import MerchantTotalRefunds from '../DashboradComponents/TotalRefunds';
// import RecentActivity from '../Recentactivity';







// All the component of Dashboard/Home Page section
export default function GatewayDashboard() {
    
    return (
        <>
            <Box sx={{zIndex: 0, marginTop: -8, padding: 4}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        {/* Account Balance */}
                            <AccountBalance />
                        <Grid container>
                            <Grid item xs={12} my={2}>
                                {/* Monthly Transaction*/}
                                <MerchantMonthlyTransaction />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={8}>

                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={7}>
                                {/* Stats */}
                                <StatsComponent />
                            </Grid>

                            <Grid item xs={12} sm={5}>
                                {/* Transaction Statitics */}
                                <TransactionStatistics />
                            </Grid>

                            <Grid item xs={12}>
                                {/* Recent Transaction */}
                                <RecentTransactions />
                            </Grid>

                            <Grid item xs={12}>
                                {/*  Total Transaction */}
                                <TotalTransactions />
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

                {/* <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} md={6} my={2}>
                        <RecentActivity />
                    </Grid>

                    <Grid item xs={12} md={6} my={2}>
                        <Currency /> 
                    </Grid>
                </Grid> */}
            </Box>

            <Footer />
        </>
    );
};


