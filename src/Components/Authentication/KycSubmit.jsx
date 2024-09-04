import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';





function KYCSubmission(params) {
  const [userName, updateUserName] = useState({});

  useEffect(() => {
    const queryString = new URLSearchParams(window.location.search);

    const first_name = queryString.get('first_name');
    const last_name = queryString.get('last_name');

    updateUserName({
      firstName: first_name,
      lastName: last_name,
    });
  }, []);

  return (
    <Dialog
      open={true}
      onClose={() => {}}
      aria-labelledby="kyc-submission-dialog-title"
      aria-describedby="kyc-submission-dialog-description"
    >
      <DialogTitle id="kyc-submission-dialog-title">KYC Submission Report</DialogTitle>
      <DialogContent>
        <DialogContentText id="kyc-submission-dialog-description">
          <Typography variant="body1" className="text-success">
            <b>Thank you for applying</b>
          </Typography>
          <Typography variant="body1" className="text-success">
            Dear {userName.firstName} {userName.lastName}, your KYC application has been submitted successfully.
            Please wait for admin approval.
          </Typography>
          <Typography variant="body1" className="text-success">
            You will get notified about your approval status.
          </Typography>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default KYCSubmission;