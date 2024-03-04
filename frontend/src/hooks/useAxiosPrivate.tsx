import React, { useEffect, useState, useCallback } from 'react';
import { Spin, notification } from 'antd';
import { axiosPrivate } from '../api/axios';
import useRefreshToken from './useRefresh';
import useAuth from './useAuth';
import './loading.css';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken() as any;
  const { auth } = useAuth() as any;

  const [loading, setLoading] = useState(false);
  const { open } = notification;

  const requestIntercept = useCallback(
    () => axiosPrivate.interceptors.request.use(
      (config) => {
        setLoading(true);
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    ),
    [auth]
  );

  const responseIntercept = useCallback(
    () => axiosPrivate.interceptors.response.use(
      (response) => {
        console.log('sssssssss');
        setLoading(false);
        return response;
      },
      async (error) => {
        console.log('Inside responseIntercept success');
        const prevRequest = error?.config;
        if (error?.response.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        } else {
          setLoading(false);
          alert(error?.response?.data?.message);
          open({
            message: 'Error',
            description: error?.response?.data?.message || 'Something went wrong',
            duration: 0,
          });
          return Promise.reject(error);
        }
      }
    ),
    [refresh, open]
  );

  useEffect(() => {
    const requestInterceptorId = requestIntercept();
    const responseInterceptorId = responseIntercept();

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptorId);
      axiosPrivate.interceptors.response.eject(responseInterceptorId);
    };
  }, [requestIntercept, responseIntercept]);

  return { axiosPrivate, loading };
};

const Loading = () => {
  const { loading } = useAxiosPrivate();
  console.log('fkfff');
  alert('fbsfdd');
  return (
    <div className={`loading-container ${loading ? 'loading-active' : ''}`}>
      {loading && <Spin size="large" />}
    </div>
  );
};

export default Loading;
