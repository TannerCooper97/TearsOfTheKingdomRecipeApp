import { useState, useEffect } from 'react';
import axios from 'axios';

const useHTTP = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (url, method = 'get', data = null, headers = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios({
        url,
        method,
        data,
        headers,
      });

      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Cleanup function to cancel ongoing requests when component unmounts
  useEffect(() => {
    const source = axios.CancelToken.source();
    return () => {
      source.cancel('HTTP request cancelled due to component unmount.');
    };
  }, []);

  return {
    data,
    makeRequest,
  };
};

export default useHTTP;
