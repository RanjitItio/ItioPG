import { 
      Typography, Table, TableContainer, 
      TableHead, TableRow, Box, 
      TableBody, Button, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import axiosInstance from '../Authentication/axios';
import { useEffect, useState } from "react";
import NewKeyGenerationPopup from "./NewKeyPopup";




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#bcc0c5',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));



// API Keys
export default function APIKeys() {

    const [keys, updateKeys]       = useState([]);
    const [newKeys, updateNewKeys] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false); // Open pop up state
    const [success, setSuccess]     = useState('');

    // get all available keys of the Merchant
    useEffect(() => {
        axiosInstance.get(`api/v3/merchant/keys/`).then((res)=> {

            if (res.status === 200 && res.data.success === true) {
                updateKeys(res.data)
            }
        }).catch((error)=> {
            console.log(error.response)

            if (error.response.statusText === 'Unauthorized') {
                window.location.href = '/signin/';
            };

        })
    }, []);

    // Method to generate new keys
    const handleGenerateKeys = ()=> {
        axiosInstance.get(`api/merchant/genearte/keys/`).then((res)=> {
            // console.log(res)

            if (res.status === 200 && res.data.msg === 'Key generated successfully') {
                updateKeys([]);
                updateNewKeys(res.data.data);
                setSuccess('Created Successfully')
                window.location.reload()
            };

        }).catch((error)=> {
            console.log(error.response)

            if (error.response.statusText === 'Unauthorized') {
                window.location.href = '/signin/';
            };
        })
    };

    // Method to handle Popup
    const handlePopupOpen = ()=> {
        setPopupOpen(true);
    };


    // Format datetime
    const dateTimeString =  keys? keys.createdAt : newKeys? newKeys.created_at : '';
    let date, time;

    if (dateTimeString) {
        [date, time] = dateTimeString.split("T");
        [time] = time.split('.')
    };


    return (
        <>
            <Grid container sx={{marginTop: '2%'}}>
                <Grid item xs={6} sm={6} md={6} lg={6} >
                    <Typography variant="h5" sx={{marginLeft: '4%'}}>API Keys</Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} textAlign="right">
                    <Button 
                        variant="contained" 
                        sx={{marginRight: '4%'}}
                        onClick={handlePopupOpen}
                    >
                        Generate Keys
                    </Button>
                </Grid>
            </Grid>

            <Box
               sx={{
                m: 3,
               }}
            >
            <TableContainer 
                   sx={{ 
                        overflowX: 'auto', 
                        maxHeight: '400px',
                        overflowY: 'auto',
                        borderRadius: '10px'
                        }}
                    >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell><b>Generated At</b></StyledTableCell>
                            <StyledTableCell><b>Public Key</b></StyledTableCell>
                            <StyledTableCell><b>Secret Key</b></StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>

                            <TableCell>{date} {time}</TableCell>

                            <TableCell>{keys? keys.merchantPublicKey : newKeys.public_key}</TableCell>

                            <TableCell>{keys? keys.merchantSecretKey : newKeys.secret_key}</TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
        </TableContainer>
        </Box>

        <NewKeyGenerationPopup 
                setOpen={setPopupOpen} 
                open={popupOpen} 
                handleGenerateKeys={handleGenerateKeys}
                success={success}
            />
        </>
    )
}