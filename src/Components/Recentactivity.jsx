import { Card, CardContent, Typography, Button } from '@mui/material';



function RecentActivity() {
    return (
        <Card className="shadow" style={{ width: '100%', height: '100%' }}>
            <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" component="div"><b>Recent Activities</b></Typography>
                    <Button variant="outlined" className="btn-light">
                        See more
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};



export default RecentActivity;