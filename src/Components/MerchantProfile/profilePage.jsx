import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { Input as JoyInput, Select as JoySelect, FormControl as JoyFormControl, 
         Option as JoyOption, FormHelperText as JoyFormHelperText, Avatar,
         Textarea as JoyTextarea } from '@mui/joy';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';





// Custom styles for profile header and avatar
const ProfileHeader = styled(Box)(({ theme }) => ({
  backgroundImage: 'url(https://python-uat.oyefin.com/media/profileBackgroundImage.png)',
  backgroundSize: 'cover',
  height: '130px',
  borderRadius: '10px 10px 0 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  border: '3px solid white',
  variant: 'soft',
  position: 'relative',
}));


const UploadButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#d8eff8',
    border: `1px solid ${theme.palette.divider}`,
    '&:hover': {
      backgroundColor: '#adc5cf',
    },
    padding: theme.spacing(0.5),
  }));


const ProfileInfoContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '0 0 10px 10px',
  marginTop: theme.spacing(1),
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
}));


const ProfileImage = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  }));




const MerchantProfilePage = () => {
      const navigate = useNavigate();
      const [profilePic, updateProfilePic] = useState(null);   // Profile Pic state
      const [imageError, setImageError]    = useState('');  // Image Errors state
      const [successMessage, setSuccessMessage] = useState('');   // Success Message state
      const [userData, updateUserData]          = useState([]);   // User profile data state
      const [error, setError]                   =  useState('');

      const initialFormData = {
        full_name: userData?.full_name || '',
        email: userData?.email || '',
        phoneno: userData?.phoneno || '',
        state: userData?.state || '',
        city:  userData?.city || '',
        landmark: userData?.landmark || '',
        zipcode: userData?.zipcode || '',
        country: userData?.country || '',
        address: userData?.address || '',
        nationality: userData?.nationality || '',
        dob: userData?.dateofbirth || '',
      };

      const [formData, updateFormData] = useState(initialFormData);
      const [maritalStatus, setMaritalSatatus] = useState('');
      const [gender, updateGender]             = useState('');


      
    // Get The selected marital status
        const handleUpdateMaritalStatusChange = (event, newValue)=> {
          setMaritalSatatus(newValue);
      };
      
      // Get the selecetd gender
      const handleUpdateGenderChange = (event, newValue)=> {
          updateGender(newValue);
      };


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


      
     // Update Formdata value to UserData when page loads
     useEffect(() => {
      updateFormData({
          full_name: userData?.full_name || '',
          email: userData?.email || '',
          phoneno: userData?.phoneno || '',
          state: userData?.state || '',
          city:  userData?.city || '',
          landmark: userData?.landmark || '',
          zipcode: userData?.zipcode || '',
          country: userData?.country || '',
          address: userData?.address || '',
          nationality: userData?.nationality || '',
          dob: userData?.dateofbirth || '',
      })
  
      if (userData.marital_status) {
          setMaritalSatatus(userData.marital_status);
      }

      if (userData.gander) {
          updateGender(userData.gander)
      }

  }, [userData])
  


  // Get the image file
        const handleUpdateProfilePic = (file)=> {
            updateProfilePic(file);
            
        };

        // Trigger upload image method
        useEffect(() => {
            if (profilePic) {
                handleUploadImage();
            } 
        }, [profilePic]);


        // capture updated form data
        const handleChangeFormData = (e)=> {
            const {name, value} = e.target;

            updateFormData({...formData, 
                [name]: value
            })
        };

  
      // Upload image into DB
      const handleUploadImage = ()=> {
            
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
        };


      // Method to update the Data
      const handleSubmitFormData = ()=> {
          if (formData.full_name === '') {
            setError('Name can not be Empty')
          } else if (formData.email === '') {
            setError('Email can not be Empty')
          } else if (formData.phoneno === '') {
            setError('Mobile Number can not be Empty')

          } else {
            axiosInstance.put(`/api/v1/merchant/profile/`, {
                email: formData.email,
                phoneno: formData.phoneno,
                full_name: formData.full_name,
                state: formData.state,
                city: formData.city,
                landmark: formData.landmark,
                zipcode: formData.zipcode,
                nationality: formData.nationality,
                dob: formData.dob,
                gender: gender,
                marital_status: maritalStatus,
                country: formData.country,
                address: formData.address

            }).then((res)=> {
              //    console.log(res)

                if (res.status === 200 && res.data.success === true) {
                    setSuccessMessage('Updated Successfully')

                    location.reload(true);
                };

            }).catch((error)=> {
                console.log(error)

            })
          }
    };




  return (
    <>
     <Grid container spacing={1}>
        {/* First Column */}
        <Grid item xs={12} md={3.5} sx={{mx:4, mt:2}}>
            <Paper elevation={3} sx={{height:'100%'}}>

                <ProfileHeader>
                    <Box position="relative">
                        <ProfileAvatar alt="Profile Pic" src={userData?.picture || 'Profile pic'} />
                        <UploadButton color="primary" component="label">
                            <PhotoCameraIcon />
                            <input type="file" hidden onChange={(e)=> {handleUpdateProfilePic(e.target.files[0])}} />
                        </UploadButton>
                    </Box>
                </ProfileHeader>

                <ProfileInfoContainer elevation={0}>
                    <Typography variant="h6" align="center">
                        {userData?.full_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {userData?.email}
                    </Typography>

                    <Box mt={3}>
                        <Typography variant="h6">Personal Info</Typography>
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={12}>
                                <InfoRow>
                                    <Typography variant="p"><b>Full Name:</b></Typography>
                                    <Typography variant="p">{userData?.full_name}</Typography>
                                </InfoRow>

                                <InfoRow>
                                    <Typography variant="p"><b>Email:</b></Typography>
                                    <Typography variant="p">{userData?.email}</Typography>
                                </InfoRow>

                                <InfoRow>
                                    <Typography variant="p"><b>Phone Number:</b></Typography>
                                    <Typography variant="p">{userData?.phoneno}</Typography>
                                </InfoRow>

                                <InfoRow>
                                    <Typography variant="p"><b>DOB:</b></Typography>
                                    <Typography variant="p">{userData?.dateofbirth}</Typography>
                                </InfoRow>

                                <InfoRow>
                                    <Typography variant="p"><b>Gender:</b></Typography>
                                    {userData?.gander && (
                                            <Typography variant="p">{userData?.gander?.charAt(0).toUpperCase() + userData?.gander?.slice(1)}</Typography>
                                        )}
                                </InfoRow>
                                
                                <InfoRow>
                                    <Typography variant="p"><b>Marital Status:</b></Typography>
                                    {userData?.marital_status && (
                                            <Typography variant="p">{userData?.marital_status?.charAt(0).toUpperCase() + userData?.marital_status?.slice(1)}</Typography>
                                        )}
                                </InfoRow>
                            </Grid>
                        </Grid>
                    </Box>
                </ProfileInfoContainer>
            </Paper>
        </Grid>

        {/* Second Column */}
        <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ backgroundColor: '#fff', borderRadius: '8px', mt:2, height:'98%', p:3 }}>
                {/* Profile Image Upload Section */}
                <Grid container spacing={3}>
                    {/* <Grid item xs={12}>
                        <ProfileImage>
                            <Avatar
                                sx={{ width: 100, height: 100 }}
                                src={userData?.picture || 'Profile pic'}
                                alt="Profile"
                            />
                            <Button
                                variant="outlined"
                                component="label"
                                sx={{ mt: 2 }}
                            >
                                Upload Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(e)=> {handleUpdateProfilePic(e.target.files[0])}}
                            />
                            </Button>
                        </ProfileImage>
                    </Grid> */}

                    {/* Form Section */}
                    <Grid item xs={12} sm={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <JoyInput
                                    placeholder="Full Name"
                                    variant="outlined"
                                    name='full_name'
                                    value={formData?.full_name}
                                    onChange={(event)=> handleChangeFormData(event)}
                                    required
                                    sx={{
                                        backgroundColor: '#f5f7fb',
                                        borderRadius: '10px', 
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <JoyInput
                                    placeholder="Email"
                                    variant="outlined"
                                    name='email'
                                    value={formData.email}
                                    onChange={(event)=> handleChangeFormData(event)}
                                    required
                                    sx={{
                                        backgroundColor: '#f5f7fb',
                                        borderRadius: '10px', 
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <JoyInput
                                    placeholder="Mobile Number"
                                    variant="outlined"
                                    name='phoneno'
                                    value={formData?.phoneno}
                                    onChange={handleChangeFormData}
                                    sx={{
                                        backgroundColor: '#f5f7fb',
                                        borderRadius: '10px', 
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <JoyFormControl>
                                    <JoySelect 
                                        placeholder="Gender"
                                        name='gender'
                                        value={gender}
                                        onChange={(event, newValue)=> {handleUpdateGenderChange(event, newValue)}}
                                        >
                                        <JoyOption value="male">Male</JoyOption>
                                        <JoyOption value="female">Female</JoyOption>
                                        <JoyOption value="others">Others</JoyOption>
                                    </JoySelect>
                                </JoyFormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                {userData.gander && (
                                <JoyFormControl>
                                    <JoySelect 
                                        placeholder="Marital Status"
                                        name='marital_status'
                                        value={maritalStatus}
                                        onChange={handleUpdateMaritalStatusChange}
                                        >
                                        <JoyOption value="married">Married</JoyOption>
                                        <JoyOption value="single">Single</JoyOption>
                                        <JoyOption value="divorced">Divorced</JoyOption>
                                        <JoyOption value="widowed">Widowed</JoyOption>
                                    </JoySelect>
                                </JoyFormControl>
                                )}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <JoyInput
                                    placeholder="State"
                                    variant="outlined"
                                    name='state'
                                    value={formData?.state}
                                    onChange={handleChangeFormData}
                                    sx={{
                                        backgroundColor: '#f5f7fb',
                                        borderRadius: '10px', 
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <JoyInput
                                    placeholder="City"
                                    variant="outlined"
                                    name='city'
                                    value={formData?.city}
                                    onChange={handleChangeFormData}
                                    required
                                    sx={{
                                        backgroundColor: '#f5f7fb',
                                        borderRadius: '10px', 
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <JoyInput
                                    placeholder="Landmark"
                                    variant="outlined"
                                    name='landmark'
                                    value={formData?.landmark}
                                    onChange={handleChangeFormData}
                                    required
                                    sx={{
                                        backgroundColor: '#f5f7fb',
                                        borderRadius: '10px', 
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <JoyInput
                                    placeholder="Zipcode"
                                    variant="outlined"
                                    name='zipcode'
                                    value={formData?.zipcode}
                                    onChange={handleChangeFormData}
                                    required
                                    sx={{
                                        backgroundColor: '#f5f7fb',
                                        borderRadius: '10px', 
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <JoyInput
                                    placeholder="Country"
                                    variant="outlined"
                                    name='country'
                                    value={formData?.country}
                                    onChange={handleChangeFormData}
                                    required
                                    sx={{
                                        backgroundColor: '#f5f7fb',
                                        borderRadius: '10px', 
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <JoyInput
                                    placeholder="Nationality"
                                    variant="outlined"
                                    name='nationality'
                                    value={formData?.nationality}
                                    onChange={handleChangeFormData}
                                    required
                                    sx={{
                                        backgroundColor: '#f5f7fb',
                                        borderRadius: '10px', 
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <JoyInput
                                    type='date'
                                    placeholder="DOB"
                                    variant="outlined"
                                    name='dob'
                                    value={formData?.dob || ''}
                                    onChange={handleChangeFormData}
                                    required
                                    slotProps={{
                                        input: {
                                          min: '1990-06-07',
                                          max: '2025-06-24',
                                        },
                                      }}
                                    sx={{
                                        backgroundColor: '#f5f7fb',
                                        borderRadius: '10px', 
                                    }}
                                />
                                <JoyFormHelperText sx={(theme) => ({ color: theme.vars.palette.primary[400] })}>DOB</JoyFormHelperText>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <JoyTextarea
                                    placeholder="Address"
                                    variant="outlined"
                                    minRows={3}
                                    size='lg'
                                    name='address'
                                    value={formData?.address}
                                    onChange={handleChangeFormData}
                                    required
                                    sx={{
                                        backgroundColor: '#f5f7fb',
                                        borderRadius: '10px', 
                                    }}
                                />
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
                  {/* Action Buttons */}
                <Box mt={8} display="flex" justifyContent="center">
                    <Button variant="outlined" color="error" sx={{ mr: 2 }} onClick={()=> {navigate('/')}}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmitFormData}>
                        Update
                    </Button>
                </Box>

                {successMessage && <p style={{color:'green', display:'flex', justifyContent:'center'}}>{successMessage}</p>}

            </Paper>
        </Grid>
     </Grid>

     <Footer />
    </>
  );
};


export default MerchantProfilePage;
