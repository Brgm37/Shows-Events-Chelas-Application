import tmEventsData from './tm-events-data.mjs';
import secaDataMem from './seca-data-mem.mjs';

// Definition of service functions
const secaServices = {
    async getPopularEvents(req, res){ // Get the s most popular events
        try {
            /*
            if (!secaDataMem.isValidToken(req.query.token)){
                return res.status(403).json({msg : 'unrecognized token'});
            }
            */
            const s = req.query.s || 30;
            const p = req.query.p || 1;
            
            // Fetch popular events data
            let popularEventData = await tmEventsData.fetchPopularEvent(s, p);
            
            // Return a 200 response with a JSON that contains the popular events
            return res.status(200).json({msg : popularEventData});
        } catch (error) {
            console.error('Error fetching popular events:', error);
            
            // Return a 404 response with an error JSON
            return res.status(404).json({error : error})
        }
    },
    async searchEvents(req, res){ // Get events by name
        try {
            /*
            if (!secaDataMem.isValidToken(req.query.token)){
                return res.status(403).json({msg : 'unrecognized token'});
            }
            */
            const eventName = req.query.eventName; // Extracts eventName parameter from URL in req
            const s = req.query.s || 30;
            const p = req.query.p || 1;
            
            if (!eventName){
                // Return a 400 response with an error JSON if eventName is missing
                return res.status(400).json({error: 'eventName parameter is required for event search'});
            } else {
                // Fetch event data by name
                const popularEventData = await tmEventsData.fetchEventByName(eventName, s, p);
                
                // Return a 200 response with a JSON that contains the events
                return res.status(200).json({msg : popularEventData});
            }
        } catch (error) {
            console.error('Error fetching popular events:', error);
            
            // Return a 404 response with an error JSON
            return res.status(404).json({error : error});
        }
    },
    async getGroups(req, res){ // Get all groups of a user
        try {
            const token = req.query.token
            
            if (!secaDataMem.isValidToken(token)){
                // Return a 403 response with an error JSON
                return res.status(403).json({msg : 'unrecognized token'});
            }
            
            // Get all groups for the user
            const allGroups = secaDataMem.allGroups(token);
            
            // Return a 200 response with JSON containing all groups
            return res.status(200).json(allGroups);
        } catch (error) {
            console.error('Error getting the groups:', error);
            
            // Return a 500 response with an error JSON
            return res.status(500).json({error: 'Internal server Error'});
        }
    },
    async getGroup(req, res){ // Get a specific group of a user
        try {
            const token = req.query.token
            
            if (!secaDataMem.isValidToken(token)){
                // Return a 403 response with an error JSON
                return res.status(403).json({msg :'unrecognized token'});
            }
            
            const groupId = req.query.groupId; // Extract groupId parameter from URL in req
            
            if (!groupId){
                // Return a 400 response with an error JSON if groupId is missing
                return res.status(400).json({error: 'GroupId parameter is required for group search'});
            } else {
                // Get the specific group
                const group = secaDataMem.getGroup(groupId, token);
                
                if (group != null)
                    // Return a 200 response with JSON containing the group
                    return res.status(200).json(group);
                else 
                    // Return a 404 response with JSON if the group is not found for the user
                    return res.status(404).json({msg : "Group not found for the user ", token});
            }
        } catch (error) {
            console.error('Error getting the group:', error);
            
            // Return a 500 response with an error JSON
            return res.status(500).json({error: 'Internal server Error'})
        }
    },
    async postGroup(req, res){ // Create a new Group associated with a user
        try {
            const token = req.query.token
            
            if (!secaDataMem.isValidToken(token)){
                // Return a 403 response with an error JSON
                return res.status(403).json({msg :'unrecognized token'});
            }
            
            const name = req.query.name;
            const description = req.query.description;
            
            if (!name || !description){
                // Return a 400 response with an error JSON if name or description is missing
                return res.status(400).json({error:'Name parameter and description are required'});
            }
            
            // Create a new group
            const postGroup = secaDataMem.createGroup(name, description, token);
            
            if(postGroup == null)
                // Return a 409 response with a message JSON if the group already exists
                return res.status(409).json({ message:'Group already exists.'});
            
            // Return a 201 response with a message JSON if the group is created successfully
            return res.status(201).json({ message:'Group created successfully.', groupId: postGroup, userId: token });
        } catch (error) {
            console.error('Error processing the post request', error);
            
            // Return a 500 response with an error JSON
            return res.status(500).json({error: error});
        }
    },
    async postUser(req, res){ // Create a new User
        try {
            const userName = req.query.userName;
            
            if (userName == null)
                // Return a 400 response with an error JSON if userName parameter is missing
                return res.status(400).json({error: 'userName parameter is required'});
            
            // Create a new user
            const newUser = secaDataMem.createUser(userName);
            
            // Return a 201 response with JSON containing the new user details
            return res.status(201).json({msg: 'user created successfully', user: newUser.userName, userId: newUser.userId});
        } catch (error) {
            console.error('Error processing the post request', error);
            
            // Return a 500 response with an error JSON
            return res.status(500).json({error: error});
        }
    },
    async editGroup(req, res){ // Edit a group
        try {
            const token = req.query.token;
            
            if (!secaDataMem.isValidToken(token)){
                // Return a 403 response with an error JSON
                return res.status(403).json({msg :'unrecognized token'});
            }
            
            const groupId = req.query.groupId;
            const newGroupName = req.query.newGroupName || null;
            const newDescription = req.query.newDescription || null;
            const newEventId = req.query.eventId || null;
            
            if(groupId == null){
                // Return a 400 response with an error JSON if groupId is missing
                return res.status(400

).json({error:'groupId missing'});
            }
            
            // Fetch new event details if eventId is specified
            let newEvent;
            if (newEventId != null) newEvent = await tmEventsData.fetchEventById(newEventId); else newEvent = null;
            
            const change = secaDataMem.editGroup(groupId, newGroupName, newDescription, newEvent, token);
            
            // Return a 201 response with a JSON containing updated group details
            return res.status(201).json({
                msg: 'group updated successfully',
                groupId: groupId,
                groupNewName: change.name,
                groupNewDescription: change.description,
                groupEvent : change.events
            });
        } catch (error) {
            console.error('Error processing the post request', error);
            
            // Return a 500 response with an error JSON
            res.status(500).json({error: error});
        }
    },
    async deleteGroup(req, res){ // Delete an existing group
        try {
            const token = req.query.token;
            
            if(!secaDataMem.isValidToken(token)) 
                // Return a 403 response with an error JSON
                return res.status(403).json({msg :'unrecognized token'});
            
            const groupId = req.query.groupId;
            
            if(groupId == null){
                // Return a 400 response with an error JSON if groupId is missing
                return res.status(400).json({error:'groupId missing'});
            }
            
            if(secaDataMem.deleteGroup(groupId, token)){
                // Return a 200 response with a message JSON if the group is successfully deleted
                return res.status(200).json({msg : `group ${groupId} has been removed`});
            } else
                // Return a 404 response with an error JSON if the user is unable to delete the group
                return res.status(404).json({error : `user ${token} unable to delete group ${groupId}`});
        } catch (error) {
            console.error('Error processing the post request', error);
            
            // Return a 500 response with an error JSON
            res.status(500).json({error: error});
        }
    },
    async deleteEvent(req, res){ // Delete an event from a group
        try {
            const token = req.query.token;
            
            if(!secaDataMem.isValidToken(token))
                // Return a 403 response with an error JSON
                return res.status(403).json({msg :'unrecognized token'});
            
            const groupId = req.query.groupId;
            const eventId = req.query.eventId;
            
            if (groupId == null || eventId == null)
                // Return a 400 response with an error JSON if groupId and eventId are not specified
                return res.status(400).json({error : `groupId : ${groupId} and eventId : ${eventId} should be specified`});
            
            if (secaDataMem.deleteEvent(groupId, token, eventId)){
                // Return a 200 response with a message JSON if the event is successfully removed from the group
                return res.status(200).json({msg : `event ${eventId} has been removed from group ${groupId}`});
            } else {
                // Return a 403 response with an error JSON if the user is unable to delete the event from the group
                return res.status(403).json({error : `user ${token} unable to delete event ${eventId} from group ${groupId}`});
            }
        } catch (error) {
            console.error('Error processing the post request', error);
            
            // Return a 500 response with an error JSON
            res.status(500).json({error: error});
        }
    }
};

// Exporting the secaServices object
export default secaServices;
