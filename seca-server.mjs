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
app.get('/site/css', secaSite.showCss);
app.post('/', secaSite.dummy);
app.get('/site/events/search', secaSite.showEvents);

//Api route
app.get('/api/events/popular', secaApi.getPopularEvents);
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

