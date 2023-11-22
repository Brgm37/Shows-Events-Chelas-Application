import express from "express";
import secaServices from "./seca-services.mjs"

const router = express.Router();

router.get('/events/popular', secaServices.getPopularEvents);  //get the 30 most popular events
router.get('/events/search', secaServices.searchEvents);       //get an event by his name
router.get('/groups', secaServices.getGroups);                 //get all the groups
router.get('/groups/group', secaServices.getGroup);            // get an especific group 

export default function secaWebApi(app){
    app.use('/api', router); 
}