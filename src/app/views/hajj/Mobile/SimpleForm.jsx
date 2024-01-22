import React, { useRef } from 'react';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  Modal,
  FormControlLabel,
  Grid,
  Icon,
  Box,
  RadioGroup,
  styled,
} from "@mui/material";
import Divider from '@mui/material/Divider';
import { Span } from "app/components/Typography";
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import PrintInvoce from './PrintInvoce';

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const SimpleForm = (props) => {
  const { hujajj } = props;
  const [state, setState] = useState({ date: new Date() });
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [open, setOpen] = useState(false);

  

  const [value, setValue] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleSubmit = async(event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    const {
      first_name,
      middle_name,
      last_name,
      passport_number,
      phone,
      service_package,
      confirmPassword,
      amount,
      birth_date,

    } = hujajj;

   
      try {
        const requestBody = {
          Draccount: '0010934520101',
          Narrative: 'hajpayment',
          Amount: 100,
          PaymentCode: 'haj123654789',
        };
  
        const response = await fetch('http://19.10.12.42/sfsd/1.0.0/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Handle success response data
          console.log('Success:', data);
        } else {
          // Handle other error statuses
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        // Handle network errors
        console.error('Network error:', error);
      }

    

  };
  const handleValidation = (e) => {
    setValue(e.target.value);
    const reg = new RegExp("[a-z]");
    setValid(reg.test(e.target.value));
  };
  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };



  const {
    first_name,
    middle_name,
    last_name,
    passport_number,
    phone,
    service_package,
    confirmPassword,
    amount,
    birth_date,

  } = state;

  const handleAccChange = (event) => {
    const inputValue = event.target.value;

    const dynamicValue = inputValue.toString();


    setAccount(inputValue);

    //console.log("inputValue",inputValue)
    const token = 'eyJ4NXQiOiJNV0l5TkRJNVlqRTJaV1kxT0RNd01XSTNOR1ptTVRZeU5UTTJOVFZoWlRnMU5UTTNaVE5oTldKbVpERTFPVEE0TldFMVlUaGxNak5sTldFellqSXlZUSIsImtpZCI6Ik1XSXlOREk1WWpFMlpXWTFPRE13TVdJM05HWm1NVFl5TlRNMk5UVmhaVGcxTlRNM1pUTmhOV0ptWkRFMU9UQTROV0UxWVRobE1qTmxOV0V6WWpJeVlRX1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI0NThkN2I0My0xOTU0LTRlNjQtYjI0NS1iNDg4YjAyYWNmNmMiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IlRJNHJlUXlheERiYUxhQVVfVWViMDk4d1ZJa2EiLCJuYmYiOjE3MDUwNjMzMzUsImF6cCI6IlRJNHJlUXlheERiYUxhQVVfVWViMDk4d1ZJa2EiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczpcL1wvMTkyLjE2OC4xLjI5Ojk0NDhcL29hdXRoMlwvdG9rZW4iLCJleHAiOjEwMzQ1MDYzMzM1LCJpYXQiOjE3MDUwNjMzMzUsImp0aSI6IjdmZTFmZTYwLTllNGItNDMyNy04MmM3LTVhOTU1Mjg4YjBjMyIsImNsaWVudF9pZCI6IlRJNHJlUXlheERiYUxhQVVfVWViMDk4d1ZJa2EifQ.eQncaeeMZy_lCNan_dmWCm9ib_C9xFNAk0tYUfQQEhDO9J0tLvCDCQD-LhsPQWoLNNq6oCciQjC1vZnqTU2Tim0ws5zlEVIA_dUxNVv0-kzDShwQKbseasuVk2Czdsom7ucz9VJbtUf23P2pBbZ-mMlW4PSofBpn2mab6z1wl48Q3-0AdknC5wC8YjpHO69Ptk_MkKINecz4LIbQ_zNRCcLMs6sFX0tBmoiBrSV6HhyGlJ1Lu2bCejoRhtmmV-DWoDpH4FpViMerLWy1lV0qccHlLh1lwdS-3IsNdt0PJmL4lrJYefQ8fxBBDI04HSA0PwBAN8dm3hWim3hgqYizXg';
    if (inputValue.length === 13) {

      const apiUrl = `http://10.10.11.20/BalanceandNameQuery/1.0.0/${dynamicValue}`;
      // Make the GET request here
      fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          if (data) {
            setCustomerName(data.Customer_Name)
            setBalance(data.Available_Balance)
          }


        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
          setCustomerName('')
          setBalance('')
        });
    } else {
      //console.log("eu");
      setCustomerName('')
      setBalance('')
    }
  };

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null} >
        <Grid container spacing={6} >
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 3 }}>
            <TextField
              type="text"
              name="first_name"
              id="standard-basic"
              value={hujajj.first_name || ""}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
              label="First Name (Min length 2)"
              sx={{ "& .MuiInputBase-root": { height: 40 } }}
              disabled
            />

            <TextField
              type="text"
              name="middle_name"
              label="Middle Name"
              onChange={handleChange}
              value={hujajj.middle_name || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
              sx={{ "& .MuiInputBase-root": { height: 40 } }}
              disabled
            />
            <TextField
              type="text"
              name="last_name"
              id="standard-basic"
              value={hujajj.last_name || ""}
              onChange={handleChange}
              label="Last Name (Min length 2)"
              validators={["required"]}
              errorMessages={["this field is required"]}
              sx={{ "& .MuiInputBase-root": { height: 40 } }}
              disabled
            />






            <TextField
              type="text"
              name="passport_number"
              label="Passport Number"
              onChange={handleChange}
              value={hujajj.passport_number || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
              sx={{ mb: 4, "& .MuiInputBase-root": { height: 40 } }}
              disabled
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 3 }}>

            <TextField
              name="service_package"
              label="Service Package"
              variant="outlined"
              value={hujajj.service_package || ""}
              onChange={handleChange}
              inputProps={{ pattern: "[a-z]" }}
              validators={["required"]}
              errorMessages={["this field is required"]}
              sx={{ "& .MuiInputBase-root": { height: 40 } }}
              disabled
            />
            <TextField
              type="text"
              name="phone"
              value={hujajj.phone || ""}
              label="Mobile"
              onChange={handleChange}
              sx={{ "& .MuiInputBase-root": { height: 40 } }}
              validators={["required"]}
              errorMessages={["this field is required"]}
              disabled
            />
            <TextField
              type="text"
              name="amount"
              value={hujajj.amount || ""}
              label="Amount"
              onChange={handleChange}
              sx={{ "& .MuiInputBase-root": { height: 40 } }}
              validators={["required"]}
              errorMessages={["this field is required"]}
              disabled
            />
            <TextField
              type="text"
              name="birth_date"
              value={hujajj.birth_date || ""}
              label="Birth Date"
              onChange={handleChange}
              sx={{ "& .MuiInputBase-root": { height: 40 } }}
              validators={["required"]}
              errorMessages={["this field is required"]}
              disabled
            />
            <Divider sx={{ marginTop: '10px', marginBottom: '20px' }} color="black" />
            <TextField
              type="number"
              name="account"
              value={account || ''}
              label="Account"
              onChange={handleAccChange}
              sx={{ '& .MuiInputBase-root': { height: 40 } }}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <Grid container spacing={2} sx={{ marginBottom: '20px', marginTop: '10px' }}>
              <Grid item xs={6}>
                <Typography variant="body1">Name: {customerName}</Typography>
              </Grid>
              <Grid item xs={6} container justifyContent="flex-end">
                <Typography variant="body1">Amount: {balance}</Typography>
              </Grid>
              <Grid item xs={12} container justifyContent="flex-end"> {/* Button grid item */}
                <Button color="primary" variant="contained" type="submit"
                  disabled={hujajj.amount < balance}
                  onClick={handleSubmit}
                >
                  <Icon>payment</Icon>
                  <Typography sx={{ pl: 1, textTransform: "capitalize" }}>Pay</Typography>
                </Button>
              </Grid>
              <Button onClick={handleClickOpen}>Open Modal</Button>
              {open && <PrintInvoce open={open} setOpen={setOpen} handleClose={handleClose} handleClickOpen={handleClickOpen} />}
      
              
            </Grid>

          </Grid>

        </Grid>




      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;
