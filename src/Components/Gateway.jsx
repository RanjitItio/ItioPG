import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';




function ActiveGateways() {

    return (
        <Box className="card mt-2 shadow" sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    <b>My Active Gateways</b>
                </Typography>

                {/* First Container */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                            <CardContent sx={{ overflow: 'auto', maxHeight: 100 }}>

                                <Typography variant="h5" component="div">
                                    Paytm
                                </Typography>

                                <Typography variant="subtitle1" color="text.secondary">
                                    Paytm
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                            <CardContent sx={{ overflow: 'auto', maxHeight: 100 }}>

                                <Typography variant="h5" component="div">
                                    Razorpay
                                </Typography>

                                <Typography variant="subtitle1" color="text.secondary">
                                    Razorpay
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
                {/* First Container ends here */}

                {/* Second Container */}
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                            <CardContent sx={{ overflow: 'auto', maxHeight: 100 }}>

                                <Typography variant="h5" component="div">
                                    Phonepe
                                </Typography>

                                <Typography variant="subtitle1" color="text.secondary">
                                    Phonepe
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                            <CardContent sx={{ overflow: 'auto', maxHeight: 100 }}>

                                <Typography variant="h5" component="div">
                                    Mastercard
                                </Typography>

                                <Typography variant="subtitle1" color="text.secondary">
                                    Mastercard
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
                {/* Second Conatiner ends here */}

                {/* Third Container */}
                <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
                    <Grid item>
                        <Button variant="outlined" color="primary">
                        Load More
                        </Button>
                    </Grid>
                </Grid>

            </CardContent>
        </Box>
    );
};




export default ActiveGateways;