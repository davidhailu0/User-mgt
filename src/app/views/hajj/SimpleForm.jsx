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
import { getNameQuery } from 'app/service/PaymentService';

import { makeTransation } from 'app/service/PaymentService';
import swal from 'sweetalert';

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const SimpleForm = (props) => {
  const { searchResult,setSearchResult } = props;
  const [state, setState] = useState({ date: new Date() });
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [customerName, setCustomerName] = useState('');

  const [accountError, setAccountError] = useState('');

  

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

    } = searchResult;

   //console.log(searchResult)
   searchResult.account_number = account;
   searchResult.account_holder = customerName;
   searchResult.amount_inaccount = balance;
   //console.log(searchResult)
      try {
        

        makeTransation(searchResult).then((response) => {
         // console.log(response.data.status)
           if (response.data.status == 'Success') {
            swal("Success", "TRANSACTION MADE SUCESSFULY", "success", {
              buttons: false,
              timer: 2000,
            })
            setSearchResult(null)
        } else {
          swal('No Results', response.data.message, 'error');
          
        }
          
      }).catch(error => {
          //console.error(error);
          swal('No Results', error.message, 'error');
      })
  
       
      } catch (error) {
        // Handle network errors
        swal('No Results', 'Network error:', 'error');
        
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

    setAccountError('')
    if (inputValue.length === 13) {

     

      getNameQuery(dynamicValue).then(async(response) => {
      //  console.log(response.data)
       if(response.data.status == "Error"){
        setCustomerName('')
        setBalance('')
        setAccountError(response.data.message)
       } else{
       setCustomerName(response.data.Customer_Name)
           setBalance(response.data.Available_Balance)
           setAccountError('')
       }
    }).catch(error => {
        //console.error(error);
        setAccountError(error.message)
          setCustomerName('')
          setBalance('')
    })
      
    } else {
      //console.log("eu");
      setCustomerName('')
      setBalance('')
    }
  };

 

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null} >
        <Grid container spacing={6} >
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 3 }}>
            <TextField
              type="text"
              name="first_name"
              id="standard-basic"
              value={searchResult.first_name || ""}
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
              value={searchResult.middle_name || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
              sx={{ "& .MuiInputBase-root": { height: 40 } }}
              disabled
            />
            <TextField
              type="text"
              name="last_name"
              id="standard-basic"
              value={searchResult.last_name || ""}
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
              value={searchResult.passport_number || ""}
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
              value={searchResult.service_package || ""}
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
              value={searchResult.phone || ""}
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
              value={searchResult.amount || ""}
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
              value={searchResult.birth_date || ""}
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
              error={!!accountError}
              helperText={accountError}
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
                  disabled={!balance || searchResult.amount < balance}
                  onClick={handleSubmit}
                >
                  <Icon>payment</Icon>
                  <Typography sx={{ pl: 1, textTransform: "capitalize" }}>Make Transaction</Typography>
                </Button>
              </Grid>
              
      
              
            </Grid>

          </Grid>

        </Grid>




      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;
