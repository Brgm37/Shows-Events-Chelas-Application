import cors from 'cors';
import express from 'express';
import url from 'url';
import morgan from 'morgan';
import path from 'path';
import hbs from 'hbs';
import passport from 'passport';
import expressSession from 'express-session';

import secaWebInit from './public/seca-web-site.mjs';
import secaApiInit from './seca-web-api.mjs';
import secaDataElasticInit from './data/elastic/seca-data-elastic.mjs';
import secaServicesInit from './seca-services.mjs';

const INDEX_GROUPS = 'groups';
const INDEX_USERS = 'users';

const secaDataUsers = secaDataElasticInit(INDEX_USERS);
const secaDataGroups = secaDataElasticInit(INDEX_GROUPS);
const secaServices = secaServicesInit(secaDataUsers, secaDataGroups);
const secaApi = secaApiInit(secaServices);
const secaSite = secaWebInit(secaServices);

const port = 3000;
const currentFileDir = url.fileURLToPath(new URL('.', import.meta.url));
const app = express();


app.use(expressSession({secret: 'group_30', resave: false, saveUninitialized: false}));
app.use(morgan('dev'));
app.use(express.static(`${currentFileDir}/public`, { type: 'text/css' }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.session());
app.use(passport.initialize());

passport.serializeUser(serializeUserDeserializeUser);
passport.deserializeUser(serializeUserDeserializeUser);
function serializeUserDeserializeUser (user, done) {
    done(null, user)
}

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
hbs.registerHelper('lt', function (a, b){
   return Number(a) < Number(b);
});
hbs.registerHelper('gt', function(a, b){
    return Number(a) > Number(b);
});

//Site route
app.use("/site/auth", secaSite.verifyAuthenticated);
app.get('/site/home', secaSite.makeHomePage);
app.post('/site/signIn', secaSite.singIn);
app.get('/site/auth/home', secaSite.allGroups);
app.post('/site/signUp', secaSite.signUp);
app.post('/site/auth/home/insertGroup', secaSite.createGroup);
app.get('/site/auth/home/showDetails', secaSite.showDetails);
app.get('/site/css', secaSite.showCss);
app.post('/', secaSite.dummy);
app.post('/site/signOut', secaSite.signOut);
app.post('/site/auth/home/update', secaSite.updateGroup);
app.post('/site/auth/home/delete', secaSite.deleteGroup);
app.get('/site/auth/home/showEvents' , secaSite.showEvents);
app.post('/site/auth/home/showEvents/delete', secaSite.deleteEvent);
app.post('/site/auth/home/showEvents/add', secaSite.addEvent);
app.get('/site/home/showEvents', secaSite.showEventsWithOutUser);

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
