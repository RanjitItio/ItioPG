import React, { useState, useEffect, useRef } from 'react';
import {
  Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button,
  Box, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import axiosInstance from '../Authentication/axios';
import EditIcon from '@mui/icons-material/Edit';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import animationData from '../Animations/EmptyAnimation.json';
import Lottie from 'lottie-react';







// All Business Transaction Data
export default function AllBusinessTable () {

    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [filterOpen, setFilterOpen] = useState(false);
    const [loader, setLoader]         = useState(true);   // Waiting for API data state
    const [emptyData, setEmptyData] = useState(false);    // Empty API response state
    const [businesssData, setBusinessData] = useState([]);

    // Method to open and close the Filter button fields
    const handleFilterClick = () => {
       setFilterOpen(!filterOpen);
    };



     // Get all the Businesses created by the user
     useEffect(() => {
      axiosInstance.get(`api/v4/user/all/merchants/`).then((res) => {
          // console.log(res.data.data)
          if (res.status === 200 && res.data.data) {
              setBusinessData(res.data.data)
              setLoader(false)
          };

          if (res.data.data.length === 0) {
              setEmptyData(true);
              setLoader(false)
          };

      }).catch((error)=> {
          console.log(error)

          if (error.response.data.msg === 'Merchant not available') {
            setEmptyData(true);
            setLoader(false)
          };
      })

  }, []);
  


// Status color according to the input
const getStatusColor = (status) => {
  switch(status){
      case 'Approved':
          return 'success'
      case 'Cancelled':
          return 'danger'
      case 'Moderation':
          return 'warning'
  }
};


const handleAddNewBusiness = ()=> {
      navigate('/merchant/add/businesses/')
  };


const handleBusinessUpdate = (merchant, curr) => {
    const merch    = merchant
    const currency = curr
    navigate('/merchant/update/businesses/', {state: {merchant_details: merch, currency: currency}})
};


// API response witing component
if (loader) {
  return (
      <>
      <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
          {/* <TextField placeholder="Search for transaction here" variant="outlined" size="small" /> */}
          <div className="d-flex justify-content-start">
              <p>
                  <b><span className='fs-3'>BUSINESSES</span></b> <br />
                  <small>List of all your Businesses in one place</small>
              </p>
          </div>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
          <CircularProgress />
      </Box>
      </>
  )
};


// If the response data is empty
if (emptyData) {
  return (
      <>

      <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
          {/* <TextField placeholder="Search for transaction here" variant="outlined" size="small" /> */}
          <div className="d-flex justify-content-start">
              <p>
                  <b><span className='fs-3'>BUSINESSES</span></b> <br />
                  <small>List of all your Businesses in one place</small>
              </p>
          </div>

          <Box>
          {isSmallScreen ? (
            <>
              <IconButton onClick={handleFilterClick}>
                <FilterAltOutlinedIcon />
              </IconButton>

              <IconButton style={{ marginLeft: 0 }}>
                <FileUploadOutlinedIcon />
              </IconButton>
            </>
          ) : (
            <>
              
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNewBusiness}>
                  Add New Business
              </Button>
            </>
          )}
        </Box>

      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '0%'}}>
          <Lottie animationData={animationData} loop={true} style={{width:'200px', height: '200px'}} />
      </Box>
      <p style={{display:'flex', justifyContent: 'center'}}>Nothing to show</p>

      </>
  )
};



  return (
    <Box sx={{zIndex: 0, marginTop: -8, padding: 4}}>
    <Card sx={{borderRadius:'20px', boxShadow:'-28px -8px 9px 0px rgba(0,0,0,0.75)'}}>
      <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
        {/* <TextField placeholder="Search for transaction here" variant="outlined" size="small" /> */}
        <div className="d-flex justify-content-start">
            <p>
                <b><span className='fs-3'>BUSINESSES</span></b> <br />
                <small>List of all your Businesses in one place</small>
            </p>
        </div>


        <Box>
          {isSmallScreen ? (
            <>
              <IconButton onClick={handleFilterClick}>
                <FilterAltOutlinedIcon />
              </IconButton>

              <IconButton style={{ marginLeft: 0 }}>
                <FileUploadOutlinedIcon />
              </IconButton>
            </>
          ) : (
            <>
              
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNewBusiness}>
                  Add New Business
              </Button>

              <Button variant="contained" style={{ marginLeft: 10 }} startIcon={<IosShareIcon />}>
                Export
              </Button>
            </>
          )}
        </Box>
      </Box>

        {/* <Collapse in={filterOpen}>
            <Box p={1}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl sx={{width: {xs: '100%', sm: '95%',md:'80%'}}} size='medium'>
                        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          // value={age}
                          // onChange={handleChange}
                          label="Transaction Type"
                        >
                          <MenuItem value="">
                              <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>With label + helper text</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <FormControl sx={{width: {xs: '100%', sm: '95%',md:'80%'}}} size='medium'>
                        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        // value={age}
                        label="Business Type"
                        // onChange={handleChange}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>With label + helper text</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <TextField 
                          type="date" 
                          label="Date Range" 
                          variant="outlined" 
                          size="medium" 
                          InputLabelProps={{ shrink: true }} 
                          sx={{width: {xs: '100%', sm: '95%',md:'80%'}, marginBottom: {xs: 2}}}
                          />
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl sx={{width: {xs: '100%', sm: '95%',md:'80%'}}} size='medium'>
                            <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                            <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            // value={age}
                            label="Business Type"
                            // onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <FormHelperText>With label + helper text</FormHelperText>
                        </FormControl>
                </Grid>
            </Grid>
            </Box>
        </Collapse> */}

        <TableContainer style={{ overflowX: 'auto', maxHeight: '400px', overflowY: 'auto'}}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Sl No.</b></TableCell>
                        <TableCell><b>Date Created</b></TableCell>
                        <TableCell><b>Business Name</b></TableCell>
                        <TableCell><b>Domain Name</b></TableCell>
                        <TableCell><b>Currency</b></TableCell>
                        <TableCell><b>Generate Form</b></TableCell>
                        <TableCell><b>Details</b></TableCell>
                        <TableCell><b>Status</b></TableCell>
                        <TableCell><b>Edit</b></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {businesssData.map((business, index) => (
                    <TableRow key={index}>

                      {/* Serial No. Column */}
                        <TableCell>{index + 1}</TableCell>

                        {/* Date Created */}
                        <TableCell>{business.merchants.created_date}</TableCell>

                        {/* Business Name Column */}
                        <TableCell>
                        <Box display="flex" alignItems="center">
                            <img src={`${business.merchants.logo}`} alt={business.merchants.bsn_name} style={{ width: 24, height: 24, marginRight: 8 }} />
                            <Box>
                                <div>{business.merchants.bsn_name}</div>
                                <div style={{ color: 'gray', fontSize: 'small' }}>{business.merchants.bsn_name}</div>
                            </Box>
                        </Box>
                        </TableCell>

                        {/* Business URL Column */}
                        <TableCell><a href={business.merchants.bsn_url}>{business.merchants.bsn_url}</a></TableCell>

                        {/* Currency Column */}
                        <TableCell>{business.currency.name}</TableCell>

                        {/* Generate Form Column */}
                        <TableCell>{business.currency.name}</TableCell>

                        {/* Business Details Column */}
                        <TableCell>
                              {business.currency.name}
                        </TableCell>

                        {/* Status Column */}
                        <TableCell>
                            {/* <p>{getStatusColor(business.merchants.status)}</p> */}
                            <p className={`text-${getStatusColor(business.merchants.status)}`}>{business.merchants.status}</p>
                        </TableCell>

                        {/* Edit Column */}
                        <TableCell>

                          <IconButton onClick={()=> {handleBusinessUpdate(business.merchants, business.currency);}}>
                              <EditIcon color='primary'/>
                          </IconButton>

                        </TableCell>

                    </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>

        <Pagination count={10} color="primary" sx={{margin: 3}}/>
    </Card>
    </Box>
  );
};


