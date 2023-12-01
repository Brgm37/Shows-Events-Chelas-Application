import express from 'express';
import secaWebApi from './seca-web-api.mjs';

const app = express();                                    //é criado um app Express()
const port = process.env.PORT || 3000;

secaWebApi(app);

// Set up a basic route for testing
app.get('/', (req, res) => {                              //quando alguém acessa ao caminho raiz do servidor '/',
    res.send('SECA Server is up and running!');           //passa o seguinte callBack
  });

app.listen(port, () => {                                  //usado para criar o servidor e executar o callBack passado 
    console.log(`Server is running on port ${port}`)      //quando o servidor é criado
});