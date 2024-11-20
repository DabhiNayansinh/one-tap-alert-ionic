import axios from 'axios';

axios.defaults.withCredentials = true; // Disable sending cookies with API requests
// const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: { 'Content-Type': 'application/json' },
    // 'X-CSRF-TOKEN': csrfToken, // Include the CSRF token
});
// withCredentials: true, // Required for cookies to be sent with the request
export const createItem = (data) => api.post('/items', data);

export default apiClient;
