import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import SimpleForm from './SimpleForm';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'
import { getHujjaj } from 'app/service/PaymentService';
import { jsonArray } from 'app/utils/hajj';
import swal from 'sweetalert';

// import StepperForm from './StepperForm';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const MobHajjAppliciant = () => {
  const [customerValue, setCustomerValue] = useState('');
  const [error, setError] = useState('');
  const [searchResult, setSearchResult] = useState(null);


  const handleSearch = async() => {
    if (customerValue.trim() === '') {
      setError('Please enter a valid code');
    } else {
      try {

        getHujjaj(customerValue).then(async(response) => {
          console.log(response.data.pilgrim)
          
       
      // console.log(data?.pilgrim);
         setSearchResult(response.data?.pilgrim);
         setError('')
      }).catch(error => {
          console.error(error);
          setError(''+error.message);
          swal('No Results', error.message, 'error');
              setSearchResult(null);
      })
        // const response = await axios.get(`https://ethiohajj.com/api/pilgrim/${customerValue}`);
        // console.log('Response data:', response.data);
        // const payload = {  "payment_code":"ZQYAYWVK"}      
        // const apiUrl = `https://ethiohajj.com/api/pilgrim/${customerValue}`;
        // const response = await fetch(apiUrl, {
        //   method: 'GET',
        //   data: payload
        // });

        // if (response.ok) {
        //   const data = await response.json();
        //   // Do something with the data
        //   console.log(data?.pilgrim);
        //   setSearchResult(data?.pilgrim);
        // }else {
          
        //   const errorData = await response.json();
        //   if (response.status === 403) {
        //     // Access Forbidden
        //     setError(''+errorData.error);
        //     //console.log(errorData.error )
        //     swal('No Results', errorData.error, 'error');
        //     setSearchResult(null);
        //   } else {
        //     // Handle other errors
        //     setError(errorData.error )
        //     swal('No Results', errorData.error, 'error');
        //     setSearchResult(null);
        //     //console.error('Request failed with status:', response.status);
        //   }
        // }
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
          {searchResult && <SimpleForm hujajj={searchResult} />}

        </SimpleCard>

        {/* <SimpleCard title="stepper form">
          <StepperForm />
        </SimpleCard> */}
      </Stack>
    </Container>
  );
};

export default MobHajjAppliciant;
