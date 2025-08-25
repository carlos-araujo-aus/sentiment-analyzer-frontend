   // src/services/apiClient.ts
   import axios from 'axios';
   
   // Create a dedicated instance of axios with a base configuration
   const apiClient = axios.create({
     // Set the base URL for all requests made with this instance.
     // It's read from the environment variables, which makes it
     // easy to switch between development and production.
     baseURL: import.meta.env.VITE_API_BASE_URL,
   
     // Set default headers for all outgoing requests.
     headers: {
       'Content-Type': 'application/json',
     },
   });
   
   export default apiClient;