import {TextField, Grid} from '@mui/material';





export default function CardPayment() {
    return (
        <div style={{marginBottom:'90px'}}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField size='small' id="card_number" label="Card Number" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField size='small' id="expiry" label="Expiry" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField size='small' id="CVV" label="CVV" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField size='small' id="card_holder_name" label="Card Holder Name" variant="outlined" fullWidth />
            </Grid>
        </Grid>
        </div>

    );
};