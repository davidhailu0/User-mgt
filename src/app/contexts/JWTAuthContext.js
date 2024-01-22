import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { MatxLoading } from 'app/components';
import { getProfile } from 'app/service/PaymentService';

const initialState = {
  user: null,
  lastActive:Date.now(),
  isInitialised: false,
  isAuthenticated: false
};

// const isValidToken = (accessToken) => {
//   if (!accessToken) return false;

//   const decodedToken = jwtDecode(accessToken);
//   const currentTime = Date.now() / 1000;
//   return decodedToken.exp > currentTime;
// };

// const setSession = (accessToken) => {
//   if (accessToken) {
//     localStorage.setItem('accessToken', accessToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     localStorage.removeItem('accessToken');
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user,lastActive:Date.now() };
    }

    case 'LOGIN': {
      //console.log(action.payload)
      const { user } = action.payload;
      //console.log(user.username)
      return { ...state, isAuthenticated: true, user,lastActive:Date.now() };
    }

    case 'LOGOUT': {
      return { ...state, isAuthenticated: false, user: null };
    }

    case 'REGISTER': {
      const { user } = action.payload;

      return { ...state, isAuthenticated: true, user };
    }

    case 'LASTACTIVE':{
      return {...state,lastActive:Date.now()}
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => {},
  logout: () => {},
  register: () => {},
  registerLastActive:()=>{}
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (credentials) => {

    const apiURL = process.env.REACT_APP_API_URL+ "/api/auth/login";
    
    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      
  
      // console.log(response);
      //  console.log(await response.json());
       const  responseData   = await response.json();
       if (responseData.status == 'failed') {
        // console.log("ds",responseData)
        return responseData
      }else{
        const { user,token } = responseData; // Access the 'data' property directly
        // console.log('user', token);
         localStorage.setItem("token", 'Bearer ' + token);
   
        dispatch({ type: 'LOGIN', payload: { user:user } });
        return responseData;
      }
      
      
      
    } catch (error) {
      throw new Error(error);
    }
    // const response = await axios.post('/api/auth/login', { email, password });
    // const { user } = response.data;

    // dispatch({ type: 'LOGIN', payload: { user } });
  };

  const register = async (email, username, password) => {
    const response = await axios.post('/api/auth/register', { email, username, password });
    const { user } = response.data;

    dispatch({ type: 'REGISTER', payload: { user } });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: 'LOGOUT' });
  };

  const registerLastActive = ()=>{
    dispatch({type:'LASTACTIVE'})
  }

  useEffect(() => {
    (async () => {
      try {
       // console.log("sfs")
        getProfile().then((response) => {
          //console.log("dfd",response.data);
          dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: response.data } });
      }).catch(error => {
          console.error(error);
         
          dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
      })
       
        
        
      } catch (err) {
        console.error(err);
        dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
      }
    })();
  }, []);

  // SHOW LOADER
  if (!state.isInitialised) return <MatxLoading />;

  return (
    <AuthContext.Provider value={{ ...state, method: 'JWT', login, logout, register,registerLastActive }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
