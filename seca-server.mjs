import express from 'express';
import secaWebApi from './seca-web-api.mjs';

const app = express();
const port = process.env.PORT || 3000;

secaWebApi(app);

// Set up a basic route for testing
app.get('/', (req, res) => {
    res.send('SECA Server is up and running!');
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});