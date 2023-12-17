import cors from 'cors';
import express from 'express';
import url from 'url';
import path from 'path';
import hbs from 'hbs';

import secaWebInit from './public/seca-web-site.mjs';
import secaApiInit from './seca-web-api.mjs';
import secaDataElasticInit from './data/elastic/seca-data-elastic.mjs';
import secaServicesInit from './seca-services.mjs';

const INDEX_GROUPS = 'groups';
const INDEX_USERS = 'users';

const secaDataUSers = secaDataElasticInit(INDEX_USERS);
const secaDataGroups = secaDataElasticInit(INDEX_GROUPS);
const secaServices = secaServicesInit(secaDataUSers, secaDataGroups);
const secaApi = secaApiInit(secaServices);
const secaSite = secaWebInit(secaServices);

const port = 3000;

const currentFileDir = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

app.use(express.static(`${currentFileDir}/public`, { type: 'text/css' }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, images, etc.)
app.use('/site', express.static(path.join(currentFileDir, 'public')));

// Set up Handlebars as the view engine
app.set('view engine', 'hbs');
const viewDir = path.join(currentFileDir, 'public', 'views');

app.set('views', viewDir);
hbs.registerPartials(path.join(viewDir, 'partials'));
hbs.registerHelper('add', function(a, b){
    return Number(a)+Number(b);
});
hbs.registerHelper('sub', function(a, b){
    return Number(a)-Number(b);
});
hbs.registerHelper('gt', function(a, b){
    return Number(a) > Number(b);
});

//Site route
app.get('/site/home', secaSite.makeHomePage);
app.get('/site/signIn', secaSite.singIn);
app.get('/site/allGroups', secaSite.allGroups);
app.post('/site/signUp', secaSite.signUp);
app.post('/site/insertGroup', secaSite.createGroup);
app.get('/site/details/:userId/:groupId', secaSite.showDetails);
app.post('/site/updateGroup/:userId/:groupId', secaSite.updateGroup);
app.post('/site/groups/delete/:userId/:groupId', secaSite.deleteGroup);
app.get('/site/events/:userId/:groupId', secaSite.showEvent);
app.post('/site/groups/addEvent/:userId/:groupId/:eventId', secaSite.addEvent);
app.post('/site/groups/event/delete/:userId/:groupId/:eventId', secaSite.deleteEvent);
app.post('/', secaSite.dummy);
app.get('/site/events/search', secaSite.showEvents);

//Api route
app.get('/api/events/popular', secaApi.getPopularEvents);          
app.get('/api/:groupId/events/search', secaApi.searchEvents);             
app.get('/api/events/search', secaApi.searchEvents);                
app.get('/api/groups', secaApi.getGroups);                          
app.get('/api/groups/group', secaApi.getGroup);                     
app.post('/api/groups', secaApi.postGroup);                         
app.put('/api/groups/group', secaApi.editGroup);                    
app.delete('/api/groups', secaApi.deleteGroup);                     
app.delete('/api/groups/group', secaApi.deleteEvent);                
app.post('/api/createUser', secaApi.postUser);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

console.log("End setting up server");

/*import express from 'express';
import cors from 'cors';
import { engine } from 'express-handlebars';
import secaApi from './seca-web-api.mjs';
import secaSite from './public/seca-web-site.mjs';
import hbs from 'hbs';
import secaServices from './seca-services.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.engine('handlebars', engine('main'));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.get('/home',secaSite._getHome); 

//é criado um app Express()
/* app.use(express.json());
app.use(express.urlencoded());
app.engine('handlebars', engine('main'));
app.set('view engine', 'handlebars');
app.use(express.static('public'));


//configuração do router
const router = express(); 
app.use('/seca', router);
 */

//SECA Site route
//routerSite.get('/home', secaSite.homePage);

//SECA Api route
//routerApi.get('/api/events/popular', secaApi.getPopularEvents);
//routerApi.get('/SignIn', secaSite.signIn);
//app.get('/site/logIn', secaSite.logIn);
/* 
app.get('/home', (req, res) => {                                                //quando alguém acessa ao caminho raiz do servidor '/',
    res.render('home', { title: 'home', style: 'home.css'});                             //passa o seguinte callBack
});

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
 */
/*export default function secaApi(app){                                //recebe como parametro a app Express e usa
    app.use('/seca', router);                                          //o método app.use para associar o prefixo
}
                                                                    //'/api' a todas as rotas do router 
app.listen(port, () => {                                                    //usado para criar o servidor e executar o callBack passado 
    console.log(`Server is running on port ${port}`);                        //quando o servidor é criado
});
console.log("End setting up server") */