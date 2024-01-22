import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled, useTheme } from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import axios from 'axios';
import swal from "sweetalert";
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const JWTRoot = styled(JustifyBox)(() => ({
  //background: '#008083',
  backgroundImage: 'url(dist/img/zzb.jpg)',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center'
  }
}));

// inital login credentials
const initialValues = {
  email: 'jason@ui-lib.com',
  password: 'dummyPass',
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!')
});
async function loginUser(credentials) {
  //console.log(credentials);
  const apiURL = process.env.REACT_APP_API_URL+ "/login";
  const fakeURL = process.env.REACT_APP_FAKE_URL;
  const formData = new FormData()
  formData.append('username',credentials.username)
  formData.append('password',credentials.password)
  try {
    const response = await fetch(apiURL, {
      method: "POST",
      body: formData,
    });

    const data = response;
    console.log("Response:", data);
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }

}

const JwtLogin = () => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
   // console.log("handleFormSubmit is clicked!!!!")
    
    const response =  login({
      username,
      password,
    })
    // console.log("user",await response)
    const  responseData  = await response;
    const { user } =  responseData;
    //console.log(await response)
    console.log(user)
    if (responseData.status == 'failed') {
      console.log("ds",responseData)
      swal("Failed", responseData.message, "error");
    }else if (response === undefined) {
      swal("ERROR 500!", "Internal Server Error.contact the  Administrator", "error");

    }

    else if (user) {
      console.log("apiKey")
      swal("Success", "SUCESSFULY lOGEDIN", "success", {
        buttons: false,
        timer: 2000,
      })
        .then((value) => {
          // console.log("this is test");
          // Storing the session cookie as a cookie
          //document.cookie = `JSESSIONID=${JSESSIONID}; path=/`;
          // localStorage.setItem("accessToken", response["accessToken"]);
          // localStorage.setItem("sAMAccountName", response["sAMAccountName"]);
          // localStorage.setItem("user", JSON.stringify(response["user"]));
          window.location.href = "/dashboard";
        })
        .catch((err) => {
          console.log(err);
          swal("Failed", err, "error");
        });
    } else {
      console.log("apiKey")
      swal("Failed", response.error, "error");
    }

    // try {
    //   await login(values.email, values.password);
    // //  navigate('/');
    // } catch (e) {
    //   setLoading(false);
    // }
  };

  return (
    <JWTRoot>

      <Card className="card">
        <Grid item sm={5} xs={5}>
          {/* <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="" />
            </JustifyBox>
          </Grid> */}

          <Grid item sm={10} xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="username"
                      name="username"
                      label="username"
                      variant="outlined"
                      onBlur={handleBlur}

                      onChange={(e) => setUserName(e.target.value)}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}

                      onChange={(e) => setPassword(e.target.value)}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    {/* <FlexBox justifyContent="space-between">
                      <FlexBox gap={1}>
                        <Checkbox
                          size="small"
                          name="remember"
                          onChange={handleChange}
                          checked={values.remember}
                          sx={{ padding: 0 }}
                        />

                        <Paragraph>Remember Me</Paragraph>
                      </FlexBox>

                      <NavLink
                        to="/session/forgot-password"
                        style={{ color: theme.palette.primary.main }}
                      >
                        Forgot password?
                      </NavLink>
                    </FlexBox> */}

                    <LoadingButton

                      type="submit"
                      color="primary"
                      position="center"
                      style={{ backgroundColor: "#008083" }}
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}

                    >
                      Login
                    </LoadingButton>

                    {/* <Paragraph>
                      Don't have an account?
                      <NavLink
                        to="/session/signup"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                      >
                        Register
                      </NavLink>
                    </Paragraph> */}
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>

    </JWTRoot>
  );
};

export default JwtLogin;

// import { useRef, useState, useEffect } from 'react';
// // import useAuth from '../hooks/useAuth';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import useAuth from 'app/hooks/useAuth';
// // import axios from '../api/axios';
// import axios from 'axios';
// const LOGIN_URL = '/auth';

// const JwtLogin = () => {
//     const { setAuth } = useAuth();

//     const navigate = useNavigate();
//     const location = useLocation();
//     const from = location.state?.from?.pathname || "/";

//     const userRef = useRef();
//     const errRef = useRef();

//     const [user, setUser] = useState('');
//     const [pwd, setPwd] = useState('');
//     const [errMsg, setErrMsg] = useState('');

//     useEffect(() => {
//         userRef.current.focus();
//     }, [])

//     useEffect(() => {
//         setErrMsg('');
//     }, [user, pwd])

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post(LOGIN_URL,
//                 JSON.stringify({ user, pwd }),
//                 {
//                     headers: { 'Content-Type': 'application/json' },
//                     withCredentials: true
//                 }
//             );
//             console.log(JSON.stringify(response?.data));
//             //console.log(JSON.stringify(response));
//             const accessToken = response?.data?.accessToken;
//             const roles = response?.data?.roles;
//             setAuth({ user, pwd, roles, accessToken });
//             setUser('');
//             setPwd('');
//             navigate(from, { replace: true });
//         } catch (err) {
//             if (!err?.response) {
//                 setErrMsg('No Server Response');
//             } else if (err.response?.status === 400) {
//                 setErrMsg('Missing Username or Password');
//             } else if (err.response?.status === 401) {
//                 setErrMsg('Unauthorized');
//             } else {
//                 setErrMsg('Login Failed');
//             }
//             errRef.current.focus();
//         }
//     }

//     return (

//         <section>
//             <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
//             <h1>Sign In</h1>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="username">Username:</label>
//                 <input
//                     type="text"
//                     id="username"
//                     ref={userRef}
//                     autoComplete="off"
//                     onChange={(e) => setUser(e.target.value)}
//                     value={user}
//                     required
//                 />

//                 <label htmlFor="password">Password:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     onChange={(e) => setPwd(e.target.value)}
//                     value={pwd}
//                     required
//                 />
//                 <button>Sign In</button>
//             </form>
//             <p>
//                 Need an Account?<br />
//                 <span className="line">
//                     <Link to="/register">Sign Up</Link>
//                 </span>
//             </p>
//         </section>

//     )
// }

// export default JwtLogin

