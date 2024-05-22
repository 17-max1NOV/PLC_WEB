import APILink from "../APILink";
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
export const loginFun = (data, navigate) => {
  return (dispatch) => {
    APILink.post(`login`, data)
      .then((response) => {
        if (response.data.status === "success") {
          toast.success(response.data.mess);
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          toast.error(response.data.mess)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
export const checkTokenAdmin = (data, navigate) => {
  return (dispatch) => {
    APILink.post(`login`, data)
      .then((response) => {
        if (response.data.status === "success") {
          toast.success(response.data.mess);
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          toast.error(response.data.mess)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const isNotAuthenticated = (navigate) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    navigate('/auth/login');
  }
};
export const isAuthenticated = (navigate) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    navigate('/');
  }
};


export const getNewAssetToken = () => {
  const data={
    refreshToken: localStorage.getItem('refreshToken')
  }
  APILink.post(`get-new-assettoken`, data)
      .then((response) => {
        localStorage.setItem('accessToken', response.data.accessToken);
      })
      .catch((error) => {
        console.error(error);
      });
};

export const logout = (navigate) => {
  const data={
    refreshToken: localStorage.getItem('refreshToken')
  } 
  APILink.post(`logout`, data)
  .then((response) => {
    if (response.data.status === "success") {
      toast.success(response.data.mess);
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');

    } else {
      toast.error(response.data.mess)
    }
  })
  .catch((error) => {
    console.error(error);
  });
};
