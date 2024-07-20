import { Grid, Paper, Typography, Box, styled } from '@mui/material';
import { ArrowForwardIos as ArrowForwardIosIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
  marginTop: theme.spacing(4),
  // padding: '1%'
}));

const PaperStyle = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const IconStyle = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const tools = [
  { title: 'API Keys', description: 'Access and manage your API keys', url: '/merchant/developer/api/keys/' },
  { title: 'API Docs', description: 'Integration Documentation', url: '/pg/developer/docs/' },
  { title: 'Payment Forms', description: 'Pay without code', url: '/pg/developer/docs/' },
  { title: 'API Logs and Alerts', description: 'View API logs and configure alerts for API errors', url: '' },
  { title: 'Webhooks', description: 'Configure webhooks, subscribe to events and trace logs', url: '' },
  { title: 'Whitelisting', description: 'View, request and track your whitelisting requests', url: '' },
  { title: 'Checkout Analytics', description: 'Set up checkout tracking with your favorite analytics provider', url: '' },
  { title: 'Integration Usage', description: 'Monitor integration performance and version updates', url: '' },
];




function DeveloperTools() {
  const navigate = useNavigate();

  // Redirect to respective page method
  const handleClick = (navigationURL)=> {
    navigate(navigationURL)
  };


  return (
      <Root>
        <Typography variant='h4' sx={{marginLeft: '38px'}}>
          Developer Tools
        </Typography>

        <Grid container spacing={3} sx={{p: 5}}>
          {tools.map((tool, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <PaperStyle elevation={3} onClick={()=> handleClick(tool.url)}>
                <Box>
                  <Typography variant="h6">
                      {tool.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                      {tool.description}
                  </Typography>
                </Box>
                <IconStyle>
                  <ArrowForwardIosIcon />
                </IconStyle>
              </PaperStyle>
            </Grid>
          ))}
        </Grid>
    </Root>
  );
}

export default DeveloperTools;