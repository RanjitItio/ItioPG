import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';




function PocketPlan() {
    return (
        <Box className="card mt-2 shadow" sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    <b>My Pocket Plans</b>
                </Typography>

                {/* First Container */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                            <CardContent sx={{ overflow: 'auto', maxHeight: 100 }}>

                                <Typography variant="h5" component="div">
                                    New Car
                                </Typography>

                                <Typography variant="subtitle1" color="text.secondary">
                                    $1191,68
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                            <CardContent sx={{ overflow: 'auto', maxHeight: 100 }}>

                                <Typography variant="h5" component="div">
                                    New Console
                                </Typography>

                                <Typography variant="subtitle1" color="text.secondary">
                                    $3.094,56
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
                                    Savings
                                </Typography>

                                <Typography variant="subtitle1" color="text.secondary">
                                    $1.324,22
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                            <CardContent sx={{ overflow: 'auto', maxHeight: 100 }}>

                                <Typography variant="h5" component="div">
                                    Wedding
                                </Typography>

                                <Typography variant="subtitle1" color="text.secondary">
                                    $5.000,00
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




export default PocketPlan;