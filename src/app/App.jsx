import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
// import routes from './routes';
import '../fake-db';
import MyComponent from './routes';

const App = () => {
  //const content = useRoutes(routes);

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
