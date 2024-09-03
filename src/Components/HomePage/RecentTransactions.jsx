import React from 'react';
import { Box, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText, Chip, Paper } from '@mui/material';

const transactions = [
  { name: 'John L. Foster', date: '5 January 2021 at 10.15 pm', amount: '+450.00', status: 'Due', img: '/path/to/avatar1.jpg' },
  { name: 'John C. Adams', date: '5 January 2021 at 10.15 pm', amount: '+450.00', status: 'Cancel', img: '/path/to/avatar2.jpg' },
  { name: 'Weston P. Thomas', date: '5 January 2021 at 10.15 pm', amount: '+450.00', status: 'Paid', img: '/path/to/avatar3.jpg' },
  { name: 'Weston P. Thomas', date: '5 January 2021 at 10.15 pm', amount: '+450.00', status: 'Paid', img: '/path/to/avatar3.jpg' },
  { name: 'Weston P. Thomas', date: '5 January 2021 at 10.15 pm', amount: '+450.00', status: 'Paid', img: '/path/to/avatar3.jpg' },
  { name: 'Weston P. Thomas', date: '5 January 2021 at 10.15 pm', amount: '+450.00', status: 'Paid', img: '/path/to/avatar3.jpg' },
  { name: 'Weston P. Thomas', date: '5 January 2021 at 10.15 pm', amount: '+450.00', status: 'Paid', img: '/path/to/avatar3.jpg' },
];


const statusColors = {
  Paid: 'success',
  Due: 'warning',
  Cancel: 'error',
};



const RecentTransactions = () => {
  return (
    <Paper>
    <Typography variant="h6" component="div" sx={{ marginBottom: 2, padding:1 }}>
        Recent Transactions
      </Typography>

    <Box
      sx={{
        borderRadius: 1,
        boxShadow: 1,
        padding: 2,
        backgroundColor: 'white',
        maxHeight: 280,
        overflowY: 'auto',
      }}
    >
      <List>
        {transactions.map((transaction, index) => (
          <ListItem key={index} divider>
            <ListItemAvatar>
              <Avatar src={transaction.img} alt={transaction.name} />
            </ListItemAvatar>
            <ListItemText
              primary={transaction.name}
              secondary={transaction.date}
              primaryTypographyProps={{ fontWeight: 'bold' }}
              secondaryTypographyProps={{ color: 'text.secondary' }}
            />
            <Typography variant="body2" sx={{ fontWeight: 'bold', marginRight: 2 }}>
              {transaction.amount}
            </Typography>
            <Chip
              label={transaction.status}
              color={statusColors[transaction.status]}
              sx={{ borderRadius: '4px', minWidth: '60px', textAlign: 'center' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
    </Paper>
  );
};



export default RecentTransactions;
