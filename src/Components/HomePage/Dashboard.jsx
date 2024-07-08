import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TotalBalance from '../Totalbalance';
import ActiveGateways from '../Gateway';
import ExpenseCategory from '../Expense';
import IncomeAnalysis from '../IncomeAnalysis';
import ExpenseAnalysis from '../ExpenseAnalysis';
import RecentActivity from '../Recentactivity';
import Currency from '../currency';






export default function GatewayDashboard() {
    
    return (
        <>
            <Box sx={{zIndex: 0, marginTop: -8, padding: 4}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>

                        {/* Total Balance */}
                        <TotalBalance />

                        <Grid container>
                            <Grid item xs={12} className="my-2">

                                {/* Pocket Plan */}
                                <ActiveGateways />

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={8}>

                        {/* Expense Category */}
                        <ExpenseCategory />

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} className="my-2">

                                {/* Income Analysis */}
                                <IncomeAnalysis />

                            </Grid>

                            <Grid item xs={12} md={6} className="my-2">

                                {/* Expense Analysis */}
                                <ExpenseAnalysis />

                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid container spacing={2} className="mt-2">
                    <Grid item xs={12} md={6} className="my-2">

                        {/* Recent Activity */}
                        <RecentActivity />

                    </Grid>

                    <Grid item xs={12} md={6} className="my-2">

                        {/* Currency */}
                        <Currency /> 

                    </Grid>
                </Grid>
            </Box>
        </>
    );
};


