import { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes ,useLocation ,useNavigate } from 'react-router-dom';
import Router from './routes/Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { baselightTheme } from "./theme/DefaultColors";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/index.css";
import "./assets/css/cms.css";
import {getNewAssetToken,isNotAuthenticated} from "./service/auth/auth";
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  useEffect(()=>{
  //  checkGetAssetToken();
    isNotAuthenticated(navigate);
  },[location.pathname])
  const checkGetAssetToken=()=>{
    const isAuthRouteLogin = location.pathname.includes('/auth/login');
    const isAuthRouteRegister = location.pathname.includes('/auth/register');
    if(!isAuthRouteLogin || !isAuthRouteRegister){
      const accessTokenExpiration = localStorage.getItem('accessToken');
      const currentTimestamp = Date.now();
      if (!accessTokenExpiration || currentTimestamp > parseInt(accessTokenExpiration)) {
        getNewAssetToken();
      }
    }
  }

  
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer/>
      <CssBaseline />
      {routing}

    </ThemeProvider>
  );
}

export default App;
