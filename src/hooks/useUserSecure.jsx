import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const userSecure = axios.create({
  baseURL: 'https://sports-academy-server-rouge.vercel.app', 
});

const useUserSecure = () => {
  const { logOut } = useAuth(); 
  const navigate = useNavigate(); 


  useEffect(() => {
    userSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    userSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return [userSecure];
};

export default useUserSecure;
