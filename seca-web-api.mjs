import express from "express";
import secaServices from "./seca-services.mjs"

//configuração do router
const router = express();                                                //criar um router para as várias rotas abaixo

                                                                         //quando alguém acessar a '/events/popular'
                                                                         //executa o callBack
//Definição de rotas
router.get('/events/popular', secaServices.getPopularEvents);                   //get the 30 most popular events
router.get('/events/search', secaServices.searchEvents);                //get an event by his name
router.get('/groups', secaServices.getGroups);                          //get all the groups
router.get('/groups/group', secaServices.getGroup);                     // get an especific group
router.post('/groups', secaServices.postGroup);                         //insert group 
router.put('/groups/group', secaServices.editGroup);                   //update group
//router.delete('groups', secaServices.deleteGroups);                   //delete group
router.post('/createUser', secaServices.postUser) ;

export default function secaWebApi(app){                                //recebe como parametro a app Express e usa
    app.use('/api', router);                                            //o método app.use para associar o prefixo
}                                                                       //'/api' a todas as rptas do router 

console.log("End setting up server")
