import React, { useRef,useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, Grid, Card, CardContent,styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { forwardRef, useState } from 'react';
import { useTheme } from '@mui/material';
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import { H6 } from 'app/components/Typography';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { Stack } from '@mui/material';
import { getSlip } from 'app/service/PaymentService';
import { Breadcrumb, SimpleCard } from 'app/components';
import Invoice from './Invoice';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'
import swal from 'sweetalert';



const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
      marginBottom: '30px',
      [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
  }));

export default function Slip() {
    const [open, setOpen] = useState(false);
  const theme = useTheme();
  const contentRef = useRef(null);

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  const [customerValue, setCustomerValue] = useState('');
  const [error, setError] = useState('');
  const [searchResult, setSearchResult] = useState(null);


  const handleSearch = async() => {
setError('')

    if (customerValue.trim() === '') {
      setError('Please enter a valid code');
    } else {
      try {
        getSlip(customerValue).then(async(response) => {
          //console.log(response.data)
           
         if (response.data?.status == 'success') {
           setSearchResult(response.data.data);
          setError('')
         } else {
              // console.error(response.data?.error);
           setError(''+response.data?.message);
           swal('No Results', response.data?.message, 'error');
               setSearchResult(null);
             }
      // console.log(response.data?.success);
          
       }).catch(error => {
          console.error(error);
          //  setError(''+error.message);
          //  swal('No Results', error.message, 'error');
               setSearchResult(null);
       })

       
      } catch (error) {
       
      setError('Network error');
      swal('No Results', 'Network error', 'error');
      setSearchResult(null);
      }
      //console.error('Network error:', error);
      
    
    }
  };


    

  const handleChange = (event) => {
    setCustomerValue(event.target.value);
    setError('');
  };

  return (

    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Material', path: '/material' }, { name: 'Form' }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Type the Hujaj payment Code">
          <div sx={{ marginBottom: '20px', height: '10px', }}>

            <TextField label="Payment code" variant="outlined" sx={{
        width: { sm: '15%', md: '20%' },
        "& .MuiInputBase-root": {
            height: 40
        }
        ,marginRight: '20px',
       }}
       error={!!error}
        helperText={error}
       value={customerValue}
        onChange={handleChange}
    />
            <Button variant="contained" onClick={handleSearch} startIcon={<SearchIcon />} sx={{ width: '10%', height: '40px' }}>
              Search
            </Button>
          </div>
          {searchResult && <Invoice searchResult={searchResult} setSearchResult= {setSearchResult}/>}

        </SimpleCard>

        
      </Stack>
    </Container>

  );
}
