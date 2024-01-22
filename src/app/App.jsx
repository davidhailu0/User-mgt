import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import useAuth from 'app/hooks/useAuth';
// import routes from './routes';
import '../fake-db';
import MyComponent from './routes';

const App = () => {
  //const content = useRoutes(routes);
  const { user } = useAuth();
  const router = useNavigate()
  useEffect(()=>{
    if(user){
      setTimeout(()=>{
        localStorage.removeItem("token")
        router("/signin")
     },30*1000*60)
    }
  },[user])

  return (
    <SettingsProvider>
      <AuthProvider>
        <MatxTheme>
          <CssBaseline />
          <MyComponent/>
        </MatxTheme>
      </AuthProvider>
    </SettingsProvider>
  );
};

export default App;
