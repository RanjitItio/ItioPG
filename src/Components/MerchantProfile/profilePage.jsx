import React from 'react';
import { useState, useEffect } from 'react';
import { Avatar, Box, Grid, Typography, Card,
         CardContent, Link, Button, Chip, IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import axiosInstance from '../Authentication/axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';



const MerchantProfilePage = () => {
  const navigate = useNavigate();
  const [profilePic, updateProfilePic] = useState(null);   // Profile Pic state
  const [imageError, setImageError]    = useState('');  // Image Errors state
  const [successMessage, setSuccessMessage] = useState('');   // Success Message state
  const [userData, updateUserData]          = useState([]);   // User profile data state

  // Get all the user data
  useEffect(() => {
    axiosInstance.get(`api/v1/merchant/profile/`).then((res)=> {
      // console.log(res)

      if(res.status === 200 && res.data.success === true) {
        updateUserData(res.data.merchant_profile)
      }

    }).catch((error)=> {
      console.log(error);

    })
  }, []);

  

  // Get the image file
  const handleUpdateProfilePic = (file)=> {
    updateProfilePic(file);

    handleUploadImage();
  };

  

  // Upload image into DB
  const handleUploadImage = ()=> {
       
      if (profilePic) {
        const file = profilePic
        const validFormats = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/svg+xml'];

        if (!validFormats.includes(file.type)) {
          setImageError('Unsupported file format. Please upload a jpeg, png, bmp, gif, or svg file.')

        } else {
          setImageError('');

          const formDatObj = new FormData();

          formDatObj.append('picture', profilePic)

          axiosInstance.post(`/api/v1/upload/profile/pic/`, formDatObj, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.success === true) {
              setSuccessMessage("Image uploaded successfully");
            } 

          }).catch((error)=> {
              console.log(error)

              if (error.response.data.message === 'File size exceeds the maximum allowed size') {
                setImageError('File size must be less than 2MB')
              } else if (error.response.data.message === 'File name is missing') {
                setImageError('Invalid file name')
              } else {
                setImageError('')
              }

          })
        }
      } else {
        setImageError('Invalid Image')
      }
  };


   // Redirect to Update page
   const handleEditPageRedirect = (user_data)=> {
        navigate('/update/merchant/profile/', {state: {user: user_data}})
   };


  return (
    <Box sx={{ p: 2 }}>
      {/* <Card sx={{ p: 2 }}> */}
        <Grid container spacing={2}>

          <Grid item xs={12} md={4}>
              <Card sx={{ p: 1, position: 'relative',boxShadow: 3,borderRadius: '12px',backgroundColor: '#f5f5f5' }}>
                <Box display="flex" justifyContent="center">
                  
                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar
                      sx={{
                        width: { xs: '90px', sm: '13rem' },
                        height: { xs: '90px', sm: '13rem' }
                      }}
                      alt="Profile Pic"
                      src={userData?.picture || 'Profile pic'}
                    />

                    <input 
                      type="file" 
                      id="contained-button-file" 
                      multiple 
                      style={{display:'none'}}
                      onChange={(e)=> {handleUpdateProfilePic(e.target.files[0])}}
                    />
                    <Tooltip title="Upload">
                      <IconButton
                        aria-label="upload picture"
                        component="label" 
                        htmlFor="contained-button-file"
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          backgroundColor: 'white', 
                          boxShadow: 1, 
                        }}
                      >
                        <CreateIcon sx={{ color: 'primary.main' }} fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                  <small style={{color:'red', display:'flex', justifyContent:'center'}}>{imageError && imageError}</small>
                  <small style={{color:'green', display:'flex', justifyContent:'center'}}>{successMessage && successMessage}</small>
              </Card>
        </Grid>


          {/* User Info */}
          <Grid item xs={12} md={8}>

          <Card sx={{ p:  5, boxShadow: 3,borderRadius: '12px',backgroundColor: '#f5f5f5', position:'relative'}}>

            <Box sx={{position:'absolute', top:16, right: 16}}>
              <Tooltip title="Edit">
                <IconButton onClick={()=> {handleEditPageRedirect(userData)}}>
                    <CreateIcon sx={{ color: 'primary.main' }} fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            <Box>
              <Typography variant="h4">{userData?.full_name}</Typography>
              <Typography variant="subtitle1" color="primary">{userData?.email}</Typography>
              <Typography variant="body2">{userData?.state} {userData?.city}</Typography>


              {/* Actions */}
              <Box mt={2}>
                <Button variant="contained" color="primary">Upload Doc</Button>
                <Button variant="outlined" sx={{ ml: 2 }}><a href={userData.uploaddocument} target='blank'>View Doc</a></Button>
              </Box>
            </Box>
          </Card>
          </Grid>
        </Grid>
      {/* </Card> */}


      <Grid container spacing={2}>
         <Grid item xs={12} sm={5}>
               
               <Grid item xs={12}>
                    <Card sx={{ mt: 2, p: 2,boxShadow: 3,borderRadius: '12px',backgroundColor: '#f5f5f5', position:'relative'  }}>
                        <CardContent>
                            <Box sx={{position:'absolute', top:16, right: 16}}>
                              <Tooltip title="Edit">
                                <IconButton onClick={()=> {handleEditPageRedirect(userData)}}>
                                    <CreateIcon sx={{ color: 'primary.main' }} fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>

                            <Box sx={{ mt : 2 }}>
                            {/* Work Info Header */}
                            <Box display="flex" alignItems="center">
                                <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', color: 'text.primary'  }}>
                                    Docuemnts
                                </Typography>
                                <Chip
                                label= {userData.status === 'Approved' ? 'Approved' : 'Not Approved'}
                                color={userData.status === 'Approved' ? 'success' : 'warning'}
                                icon={userData.status === 'Approved' ? <CheckCircleIcon fontSize='small' /> : <ErrorIcon fontSize='small' />}
                                sx={{ ml: 1, fontSize: '0.75rem', height: '20px', borderRadius: '10px' }}
                                />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                Document Type
                              </Typography>

                              <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 2 }}>
                                {userData?.id_type || 'N/A'}
                              </Typography>

                              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                Document Number
                              </Typography>

                              <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 2 }}>
                                {userData?.id_number || 'N/A'}
                              </Typography>

                              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                Document Expiry Date
                              </Typography>

                              <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 2 }}>
                                {userData?.id_expiry_date || 'N/A'}
                              </Typography>
                            </Box>

                            {/* View Document */}
                            <Box textAlign="center">
                              <Button
                                variant="contained"
                                color="primary"
                                href={userData?.uploaddocument}
                                target="_blank"
                                sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: '8px' }}
                              >
                                View Document
                              </Button>
                            </Box>

                            </Box>
                        </CardContent>
                    </Card>
               </Grid>

               <Grid item xs={12}>
                    <Card sx={{ mt: 2, p: 2, boxShadow: 3,borderRadius: '12px',backgroundColor: '#f5f5f5', position:'relative' }}>
                        <CardContent>

                            <Box sx={{position:'absolute', top:16, right: 16}}>
                              <Tooltip title="Edit">
                                  <IconButton onClick={()=> {handleEditPageRedirect(userData)}}>
                                      <CreateIcon sx={{ color: 'primary.main' }} fontSize="small" />
                                  </IconButton>
                              </Tooltip>
                            </Box>

                            <Box sx={{ mt: 2 }}>
                                {/* Work Info Header */}
                                <Box display="flex" alignItems="center">
                                    <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
                                       Address
                                    </Typography>
                                    <Chip
                                    label="Primary"
                                    color="primary"
                                    sx={{ ml: 1, fontSize: '0.75rem', height: '20px', borderRadius: '4px' }}
                                    />
                                </Box>

                                {/* Address */}
                                <Typography variant="body2" color="textSecondary">
                                    {userData.city}, {userData.landmark} {userData.state} {userData.country} {userData.zipcode}
                                    <br />
                                    {userData.address}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
               </Grid>
         </Grid>

         
         <Grid item xs={12} sm={7}>
            <Card sx={{ mt: 3, p: 3, borderRadius: '12px', boxShadow: 4, backgroundColor: '#f9f9f9', position:'relative' }}>
              <CardContent>

                <Box sx={{position:'absolute', top:16, right: 16}}>
                  <Tooltip title="Edit">
                    <IconButton onClick={()=> {handleEditPageRedirect(userData)}}>
                        <CreateIcon sx={{ color: 'primary.main' }} fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box>
                  {/* Contact Information */}
                  <Typography variant="h6" gutterBottom sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                    Contact Information
                  </Typography>
                  <Box sx={{ ml: 2, mb: 3 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <PhoneIcon sx={{ color: '#337ab7', mr: 1 }} />
                      <Typography variant="body1" sx={{ color: '#2c3e50' }}>
                        <strong>Phone:</strong>{' '}
                        <Link href={`tel:+${userData?.phoneno}`} sx={{ textDecoration: 'none', color: '#337ab7' }}>
                          {userData?.phoneno}
                        </Link>
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mb={2}>
                      <LocationOnIcon sx={{ color: '#337ab7', mr: 1 }} />
                      <Typography variant="body1" sx={{ color: '#2c3e50' }}>
                        <strong>Address:</strong> {userData?.landmark}, {userData?.city}, {userData?.state}, {userData?.country}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mb={2}>
                      <EmailIcon sx={{ color: '#337ab7', mr: 1 }} />
                      <Typography variant="body1" sx={{ color: '#2c3e50' }}>
                        <strong>Email:</strong>{' '}
                        <Link href={`mailto:${userData?.email}`} sx={{ textDecoration: 'none', color: '#337ab7' }}>
                          {userData?.email}
                        </Link>
                      </Typography>
                    </Box>
                  </Box>

                  {/* Basic Information */}
                  <Typography variant="h6" gutterBottom sx={{ color: '#2c3e50', fontWeight: 'bold', mt: 3 }}>
                    Basic Information
                  </Typography>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body1" sx={{ color: '#2c3e50', mb: 2 }}>
                      <strong>Birthday:</strong> {userData?.dateofbirth}
                    </Typography>

                    <Typography variant="body1" sx={{ color: '#2c3e50', mb: 2 }}>
                      <strong>Gender:</strong> {userData?.gander}
                    </Typography>

                    <Typography variant="body1" sx={{ color: '#2c3e50', mb: 2 }}>
                      <strong>Nationality:</strong> {userData?.nationality}
                    </Typography>

                    <Typography variant="body1" sx={{ color: '#2c3e50', mb: 2 }}>
                      <strong>Marital Status:</strong> {userData?.marital_status}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
         </Grid>
      </Grid>

      
      
    </Box>
  );
};


export default MerchantProfilePage;
