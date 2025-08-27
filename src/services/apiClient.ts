   // src/services/apiClient.ts
   import axios from 'axios';
   import { getSessionId } from './sessionManager'; // <-- 1. Import getSessionId
   
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
   
   // --- 2. ADD THE NEW REQUEST INTERCEPTOR ---
   // This code runs BEFORE each request is sent.
   apiClient.interceptors.request.use(
     (config) => {
       const sessionId = getSessionId();
       if (sessionId) {
         // If a session ID exists, add it to the 'X-Session-ID' header
         config.headers['X-Session-ID'] = sessionId;
       }
       return config;
     },
     (error) => {
       // This function is triggered if something goes wrong with setting up the request
       return Promise.reject(error);
     }
   );
   
   export default apiClient;