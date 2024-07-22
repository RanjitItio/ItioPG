import { 
      Typography, Table, TableContainer, 
      TableHead, TableRow, Box, 
      TableBody, Button, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import axiosInstance from '../Authentication/axios';
import { useEffect, useState } from "react";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#bcc0c5',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


export default function APIKeys() {

    const [publicKeys, updatePublicKeys] = useState('');
    const [secretKeys, updateSecretKeys] = useState('');
    const [createdAt, updateCreatedAt]   = useState('');

    useEffect(() => {
        axiosInstance.get(`api/v3/merchant/keys/`).then((res)=> {

            if (res.status === 200 && res.data.success === true) {
                updatePublicKeys(res.data.merchantPublicKey)
                updateSecretKeys(res.data.merchantSecretKey)
                updateCreatedAt(res.data.createdAt)
            }

        }).catch((error)=> {
            console.log(error.response)

        })
    }, [])
    
    return (
        <>
            <Grid container sx={{marginTop: '2%'}}>
                <Grid item xs={6} sm={6} md={6} lg={6} >
                    <Typography variant="h5" sx={{marginLeft: '4%'}}>API Keys</Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} textAlign="right">
                    <Button variant="contained" sx={{marginRight: '4%'}}>Generate Keys</Button>
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

                            <TableCell>{createdAt}</TableCell>

                            <TableCell>{publicKeys}</TableCell>

                            <TableCell>{secretKeys}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
        </TableContainer>
        </Box>
        </>
    )
}