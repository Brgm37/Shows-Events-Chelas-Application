import express from "express";
import * as secaServices from "./seca-services.mjs"


const router = express();

router.get('/events/popular', secaServices.getPopularEvents);           //get the 30 most popular events
router.get('/events/search/', secaServices.searchEvents);     //get an event by his name
router.get('/groups', secaServices.getGroups);                          //get all the groups
router.get('/groups/group/:groupId', secaServices.getGroup);            // get an especific group
//router.post('/groups', secaServices.postGroup);                         //insert group 
//router.put('groups/group/:groupId/:type/:eventName', secaServices.editGroup); //update group
//router.delete('groups/:groupsId', secaServices.deleteGroups);           //delete group

export default function secaWebApi(app){
    app.use('/api', router); 
}

console.log("End setting up server")
