import express from "express";
import secaServices from "./seca-services.mjs"

// Create an instance of the Express router
const router = express();

// Define routes for various API endpoints using the services from seca-services.mjs
router.get('/events/popular', secaServices.getPopularEvents);
router.get('/events/search', secaServices.searchEvents);
router.get('/groups', secaServices.getGroups);
router.get('/groups/group', secaServices.getGroup);
router.post('/groups', secaServices.postGroup);
router.put('/groups/group', secaServices.editGroup);
router.delete('/groups', secaServices.deleteGroup);
router.delete('/groups/group', secaServices.deleteEvent);
router.post('/createUser', secaServices.postUser);

// Export a function that sets up the Express app to use the defined router under the '/api' path
export default function secaWebApi(app) {
    app.use('/api', router);
}

// Log a message indicating the completion of setting up the server
console.log("End setting up server");
