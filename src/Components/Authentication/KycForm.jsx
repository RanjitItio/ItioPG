import React, { useState, useEffect } from 'react';
import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';
import {
  Button, Card, CardContent, Container, FormControl, InputLabel,
  Input, MenuItem, Select, TextField, Typography,
} from '@mui/material';




const KYCForm = () => {
    const navigate = useNavigate();
    const current_date = new Date().toISOString().split('T')[0];
  
    const initialFormData = {
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      maritalStatus: '',
      email: '',
      phoneNumber: '',
      address: '',
      landmark: '',
      city: '',
      zipCode: '',
      stateOrUt: '',
      country: '',
      nationality: '',
      idType: '',
      idNumber: '',
      idExpiryDate: '',
      document: '',
      user_id: '',
    };
  
    const [step, setStep] = useState(1);
    const [formData, updateFormData] = useState(initialFormData);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
  
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const first_name = urlParams.get('first_name') || '';
      const last_name = urlParams.get('last_name') || '';
      const contact_no = urlParams.get('contact_number') || '';
      const email = urlParams.get('email') || '';
      const user_ID = urlParams.get('user_id') || '';
  
      updateFormData({
        ...initialFormData,
        firstName: first_name,
        lastName: last_name,
        phoneNumber: contact_no,
        email: email,
        user_id: parseInt(user_ID),
      });
    }, []);
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      let validationError = [];
  
      if (!formData.firstName.trim()) validationError.push('Please fill your First Name');
      if (!formData.lastName.trim()) validationError.push('Please fill your Last Name');
      if (!formData.dob.trim()) validationError.push('Please fill your Date of Birth');
      if (!formData.gender.trim()) validationError.push('Please select your Gender');
      if (!formData.maritalStatus.trim()) validationError.push('Please select your Marital Status');
      if (!formData.email.trim()) validationError.push('Please fill your email Address');
      if (!formData.phoneNumber.trim()) validationError.push('Please fill your Phone number');
      if (!formData.address.trim()) validationError.push('Please fill your Address');
      if (!formData.landmark.trim()) validationError.push('Please type your Landmark name');
      if (!formData.city.trim()) validationError.push('Please fill your city name');
      if (!formData.zipCode.trim()) validationError.push('Please fill your Zipcode');
      if (!formData.stateOrUt.trim()) validationError.push('Please fill your State or UT');
      if (!formData.country.trim()) validationError.push('Please fill your Country Name');
      if (!formData.nationality.trim()) validationError.push('Please type your Nationality');
      if (!formData.idType.trim()) validationError.push('Please select your ID Type');
      if (!formData.idNumber.trim()) validationError.push('Please type your ID Number');
      if (!formData.idExpiryDate.trim()) validationError.push('Please fill in ID Expiry Date');
  
      if (validationError.length > 0) {
        setError(validationError.join(', '));
        return;
      } else {
        setError('');
      }
  
      const formDataToSend = new FormData();
  
      formDataToSend.append('user_id', formData.user_id);
      formDataToSend.append('firstname', formData.firstName);
      formDataToSend.append('lastname', formData.lastName);
      formDataToSend.append('dateofbirth', formData.dob);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('marital_status', formData.maritalStatus);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phoneno', formData.phoneNumber);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('landmark', formData.landmark);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('zipcode', formData.zipCode);
      formDataToSend.append('state', formData.stateOrUt);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('nationality', formData.nationality);
      formDataToSend.append('id_type', formData.idType);
      formDataToSend.append('id_number', formData.idNumber);
      formDataToSend.append('id_expiry_date', formData.idExpiryDate);
      formDataToSend.append('uploaddocument', formData.document);
  
      try {
        const res = await axiosInstance.post('api/v1/user/kyc/', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (res.status === 200) {
          setSuccessMessage(`KYC has been submitted successfully`);
          const queryString = new URLSearchParams({ first_name: formData.firstName, last_name: formData.lastName });

          setTimeout(() => {
            navigate(`/kyc/success/?${queryString}`);
          }, 2000);
          
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      updateFormData({
        ...formData,
        [name]: files ? files[0] : value,
      });
    };
  
    const handleZipCodeChange = (e) => {
      const input_value = e.target.value;
  
      if (Number.isNaN(Number(input_value))) {
        setError('Please type a number');
      } else {
        setError('');
      }
    };
  
    const handleDocumentChange = (event) => {
      updateFormData({ ...formData, document: event.target.files[0] });
    };
  
    const renderStep = () => {
      switch (step) {
        case 1:
          return (
            <div>
              <Typography variant="h4" component="h2" gutterBottom>
                Personal Details
              </Typography>
              <Container>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Date of Birth"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <MenuItem value="">Select Gender</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Marital Status</InputLabel>
                  <Select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                  >
                    <MenuItem value="">Select Marital Status</MenuItem>
                    <MenuItem value="single">Single</MenuItem>
                    <MenuItem value="married">Married</MenuItem>
                    <MenuItem value="divorced">Divorced</MenuItem>
                    <MenuItem value="widowed">Widowed</MenuItem>
                  </Select>
                </FormControl>
              </Container>
              <div className="flex justify-between mt-6">
                <Button disabled variant="contained" color="primary" className="mr-2">
                  Previous
                </Button>
                <Button onClick={nextStep} variant="contained" color="primary">
                  Next
                </Button>
              </div>
            </div>
          );
        case 2:
          return (
            <div>
              <Typography variant="h4" component="h2" gutterBottom>
                Contact Details
              </Typography>
              <Container>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Landmark"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Zip Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    onBlur={handleZipCodeChange}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="State/UT"
                    name="stateOrUt"
                    value={formData.stateOrUt}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                  />
                </FormControl>
              </Container>
              <div className="flex justify-between mt-6">
                <Button onClick={prevStep} variant="contained" color="primary" className="mr-2">
                  Previous
                </Button>
                <Button onClick={nextStep} variant="contained" color="primary">
                  Next
                </Button>
              </div>
            </div>
          );
        case 3:
          return (
            <div>
              <Typography variant="h4" component="h2" gutterBottom>
                Identity Verification
              </Typography>
              <Container>
                <FormControl fullWidth margin="normal">
                  <InputLabel>ID Type</InputLabel>
                  <Select
                    name="idType"
                    value={formData.idType}
                    onChange={handleChange}
                  >
                    <MenuItem value="">Select ID Type</MenuItem>
                    <MenuItem value="aadhaar">Aadhaar</MenuItem>
                    <MenuItem value="passport">Passport</MenuItem>
                    <MenuItem value="driving_license">Driving License</MenuItem>
                    <MenuItem value="voter_id">Voter ID</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="ID Number"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="ID Expiry Date"
                    type="date"
                    name="idExpiryDate"
                    value={formData.idExpiryDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Upload Document</InputLabel>
                  <Input
                    type="file"
                    name="document"
                    onChange={handleDocumentChange}
                  />
                </FormControl>
              </Container>
              <div className="flex justify-between mt-6">
                <Button onClick={prevStep} variant="contained" color="primary" className="mr-2">
                  Previous
                </Button>
                <Button onClick={handleFormSubmit} variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </div>
          );
        default:
          return null;
      }
    };
  
    return (
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Typography variant="h3" component="h1" gutterBottom>
              KYC Form
            </Typography>
            {error && (
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            )}
            {successMessage && (
              <Typography variant="body1" color="success">
                {successMessage}
              </Typography>
            )}
            <form>{renderStep()}</form>
          </CardContent>
        </Card>
      </Container>
    );
  };
  

export default KYCForm;