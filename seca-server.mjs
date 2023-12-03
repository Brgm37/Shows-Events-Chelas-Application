import express from 'express';
import secaWebApi from './seca-web-api.mjs';

// Create an instance of the Express application
const app = express();

// Define the port for the server to listen on, using the environment variable PORT or defaulting to 3000
const port = process.env.PORT || 3000;

// Set up the Express app to use the secaWebApi module, which configures routes and services
secaWebApi(app);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});