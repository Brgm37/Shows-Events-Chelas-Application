import express from 'express';
import { engine } from 'express-handlebars';
import secaApi from './seca-web-api.mjs';
import secaSite from './seca-web-site.mjs';

const app = express();                                    //é criado um app Express()
app.engine('handlebars', engine());
app.set('view-engine', 'handlebars');
const port = process.env.PORT || 3000;

//configuração do router
const router = express(); 
app.use('/seca', router);

// Set up a basic route for testing
app.get('/', (req, res) => {                              //quando alguém acessa ao caminho raiz do servidor '/',
    res.send('SECA Server is up and running!');           //passa o seguinte callBack
});
app.listen(port, () => {                                  //usado para criar o servidor e executar o callBack passado 
    console.log(`Server is running on port ${port}`)      //quando o servidor é criado
});


//Definição de rotas API
router.get('/api/events/popular', secaApi.getPopularEvents);           //get the 30 most popular events
router.get('/api/events/search', secaApi.searchEvents);                //get an event by his name
router.get('/api/groups', secaApi.getGroups);                          //get all the groups
router.get('/api/groups/group', secaApi.getGroup);                     //get an especific group
router.post('/api/groups', secaApi.postGroup);                         //insert group
//router.post('/groups/group', secaApi.addEvent);                      //add event into a group (to decide)
router.put('/api/groups/group', secaApi.editGroup);                    //update group
router.delete('/api/groups', secaApi.deleteGroup);                     //delete group
router.delete('/api/groups/group', secaApi.deleteEvent);               //delete 
router.post('/api/createUser', secaApi.postUser);

//Definição de rotas Site
router.get('/site/groups/all', secaSite.getAllGroups);          
router.get('/site/groups/group', secaSite.getGroup);
router.post('/site/insertGroup', secaSite.insertGroup);                          
router.post('/site/groups/update', secaSite.updateGroup);                         
router.post('/site/groups/delete', secaSite.deleteGroup);

/*export default function secaApi(app){                                //recebe como parametro a app Express e usa
    app.use('/seca', router);                                            //o método app.use para associar o prefixo
}*/                                                                     //'/api' a todas as rotas do router 

console.log("End setting up server")
