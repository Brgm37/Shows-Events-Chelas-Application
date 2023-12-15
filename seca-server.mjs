import express from 'express';
import { engine } from 'express-handlebars';
import secaApi from './seca-web-api.mjs';
import secaSite from './seca-web-site.mjs';
import hbs from 'hbs';
import secaServices from './seca-services.mjs';

const app = express();                                                 //é criado um app Express()
app.use(express.json());
app.use(express.urlencoded());
app.engine('handlebars', engine('main'));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
const port = process.env.PORT || 3000;

//configuração do router
const router = express(); 
app.use('/seca', router);

const groups =[];
const users = [];
export {groups, users}
// Set up a basic route for testing
app.get('/allGroups/:token/:groups', (req, res) => {                                                //quando alguém acessa ao caminho raiz do servidor '/',
    const groups = req.params.groups;
    res.render('allGroups', { groups: groups, token: req.params.token, style: 'allGroups.css'});                             //passa o seguinte callBack
}); 
app.get('/updateGroup/:groupId/:groupName/:groupDes', (req, res) => {
    const groupName = req.params.groupName 
    const groupDes = req.params.groupDes
    const groupId = req.params.groupId                                             //quando alguém acessa ao caminho raiz do servidor '/',
    res.render('updateGroup', { group: {groupId: groupId, name: groupName, description: groupDes} });                             //passa o seguinte callBack
});
app.get('/home', (req, res) => {                                                //quando alguém acessa ao caminho raiz do servidor '/',
    res.render('home', { title: 'home', style: 'home.css'});                             //passa o seguinte callBack
});
app.post('/delete', (req, res) => {                                                //quando alguém acessa ao caminho raiz do servidor '/',
    res.render('deleteGroup', { group: {
        name: 'nome',
        description: 'des'
    }});                             //passa o seguinte callBack
});
app.get('/addEvent/:token/:groupId', (req, res) => {                                                //quando alguém acessa ao caminho raiz do servidor '/',
    res.render('addEvent', { token: req.params.token, groupId: req.params.groupId, style: 'addEvent.css'});                             //passa o seguinte callBack
});
app.get('/site/:token/:groupId/details', secaSite.renderDetails);
app.listen(port, () => {                                                    //usado para criar o servidor e executar o callBack passado 
    console.log(`Server is running on port ${port}`);                        //quando o servidor é criado
});

//app.get('/site/events/:eventName/:s/:p', secaSite.searchEventsName);
app.get('/site/events/popular', secaSite.getPopularEvents);

//Definição de rotas API
router.get('/api/events/popular', secaApi.getPopularEvents);           //get the 30 most popular events
app.get('/api/:groupId/events/search', secaApi.searchEvents);                //get an event by his name
app.get('/api/events/search', secaApi.searchEvents);                //get an event by his name
router.get('/api/groups', secaApi.getGroups);                          //get all the groups
router.get('/api/groups/group', secaApi.getGroup);                     //get an especific group
router.post('/api/groups', secaApi.postGroup);                         //insert group
//app.post('api/groups/:eventId/addEvent', secaApi.addEvent);                      //add event into a group (to decide)
router.put('/api/groups/group', secaApi.editGroup);                    //update group
router.delete('/api/groups', secaApi.deleteGroup);                     //delete group
router.delete('/api/groups/group', secaApi.deleteEvent);               //delete 
router.post('/api/createUser', secaApi.postUser);

//Definição de rotas Site
//router.get('/site/groups/all', secaSite.getAllGroups);          
router.get('/site/groups/group', secaSite.getGroup);
app.post('/site/:token/insertGroup', secaSite.insertGroup);
app.get('/site/logIn', secaSite.logIn);
app.post('/site/signIn', secaSite.signIn);                         
router.post('/site/groups/update', secaSite.updateGroup);                         
app.post('/site/groups/:token/:groupId/delete', secaSite.deleteGroup);
app.post('site/groups/:token/:groupId/addEvent/:eventId', secaSite.addEvent);

/*export default function secaApi(app){                                //recebe como parametro a app Express e usa
    app.use('/seca', router);                                          //o método app.use para associar o prefixo
}*/                                                                    //'/api' a todas as rotas do router 

console.log("End setting up server")