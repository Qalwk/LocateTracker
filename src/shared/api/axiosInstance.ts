import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchFlights = async ({ offset = 0, limit = 10 }) => {
  const response = await axiosInstance.get('/flights', {
    params: { offset, limit }
  });
  return response.data;
};