import tmEventsData from './tm-events-data.mjs';
import secaDataMem, { usersMap } from './seca-data-mem.mjs';

const secaServices = {
    async getPopularEvents(req, res){
       try{
        /*
        if (!secaDataMem.isValidToken(req.query.token)){
            return res.status(403).json({msg : 'unreconized token'});
        }
        */
        const s = req.query.s || 30;
        const p = req.query.p || 1;
        let popularEventData = await tmEventsData.fetchPopularEvent(s, p);   //string .json com a response
        return res.status(200).json({msg : popularEventData});               //retorna uma resposta com o código 200, e com a string .json ao cliente
       }catch(error){
        console.error('Error fetching popular events:', error);
        return res.status(404).json({error : error})
       }
    },
    async searchEvents(req, res){
        try{
            /*
            if (!secaDataMem.isValidToken(req.query.token)){
                return res.status(403).json({msg : 'unreconized token'});
            }
            */
            const eventName = req.query.eventName;          //extrai o parâmetro eventName do URL passado em req
            const s = req.query.s || 30;
            const p = req.query.p || 1;
            if (!eventName){
                return res.status(400).json({error: 'eventName parameter is required for event search'});
            }else{
                const popularEventData = await tmEventsData.fetchEventByName(eventName, s, p);        //string .json com a response
                return res.status(200).json(popularEventData);                                  //retorna uma resposta com o código 200, e com a string .json ao cliente
            }
       }catch(error){
        console.error('Error fetching popular events:', error);
        return res.status(404).json({error : error});
       }
    },
    async getGroups(req, res){
        try{
            const token = req.query.token
            if (!secaDataMem.isValidToken(token)){
                return res.status(403).json({msg : 'unreconized token'});
            }
            const allGroups = secaDataMem.allGroups(token);        //map with all groups
            return res.status(200).json(allGroups);
        }catch(error){
            console.error('Error getting the groups:', error);
            return res.status(500).json({error: 'Internal server Error'});
        }
    },
    async getGroup(req, res){
        try{
            const token = req.query.token
            if (!secaDataMem.isValidToken(token)){
                return res.status(403).json({msg :'unreconized token'});
            }
            const groupId = req.query.groupId;               //extrai o parâmetro groupId do URL passado em req
            if (!groupId){
                return res.status(400).json({error: 'GroupId parameter is required for group search'});
            }else{
                const group = secaDataMem.getGroup(groupId, token);
                if (group != null)
                    return res.status(200).json(group);
                else 
                    return res.status(404).json({msg : "Group not found for the user ", token});
            }
        }catch(error){
            console.error('Error getting the group:', error);
            return res.status(500).json({error: 'Internal server Error'})
        }
    },
    async postGroup(req, res){
        try{
            const token = req.query.IdUser
            if (!secaDataMem.isValidToken(token)){
                return res.status(403).json({msg :'unreconized token'});
            }
            const name = req.query.name;
            const description = req.query.description;
            if (!name || !description){
                return res.status(400).json({error:'Name parameter and description are required'});
            }
            const postGroup = secaDataMem.createGroup(name, description, token);
            if(postGroup == null) return res.status(409).json({ message:'Group already exists.'});
            return res.status(201).json({ message:'Group created successfully.', groupId: postGroup, userId: token });
        }catch(error){
            console.error('Error processing the post request', error);
            return res.status(500).json({error: error});
        }
    },
    async postUser(req, res){
        try{
            const userName = req.query.userName;
            if (userName == null)
                return res.status(400).json({error: 'userName parameter is required'});
            const newUser = secaDataMem.createUser(userName);

            if(newUser == null) return res.status(409).json({error: 'userName already exists'});
            return res.status(201).json({msg: 'user created successfully', user: newUser.userName, userId: newUser.userId});
        }catch(error){
            console.error('Error processing the post request', error);
            return res.status(500).json({error: error});
        }
    },
    async editGroup(req, res){
        try{

            const token = req.query.token;
            if (!secaDataMem.isValidToken(token)){
                return res.status(403).json({msg :'unreconized token'});
            }

            const groupId = req.query.groupId;
            const newGroupName = req.query.newGroupName || null;
            const newDescription = req.query.newDescription || null;
            const newEventId = req.query.eventId || null;

            if(groupId == null){
                return res.status(400).json({error:'groupId missing'});
            }
            /*
            if(!secaDataMem1.isValidName(userName) || !secaDataMem1.isValidGroup(groupName)){
                return res.status(422).json({error: 'invalid userName or groupName'});
            }
            */
            let newEvent;
            if (newEventId != null) newEvent = await tmEventsData.fetchEventById(newEventId); else newEvent = null;
            const change = secaDataMem.editGroup(groupId, newGroupName, newDescription, newEvent, token);
            if(change == null) return res.status(403).json({error: 'no such group found'})
            return res.status(201).json({
                msg: 'group updated successfully',
                groupId: groupId,
                groupNewName: change.name,
                groupNewDescription: change.description,
                groupEvent : change.events
            });
 
        }catch(error){
            console.error('Error processing the post request', error);
            res.status(500).json({error: error});
        }
    },
    async deleteGroup(req, res){
        try{
            const token = req.query.token;
            if(!secaDataMem.isValidToken(token)) 
                return res.status(403).json({msg :'unreconized token'});
            const groupId = req.query.groupId;
            if(groupId == null){
                return res.status(400).json({error:'groupId missing'});
            }
            if(secaDataMem.deleteGroup(groupId, token)){
                return res.status(200).json({msg : `group ${groupId} has been removed`});
            }else
                return res.status(404).json({error : `user ${token} unnable to delete group ${groupId}`});
        }catch(error){
            console.error('Error processing the post request', error);
            res.status(500).json({error: error});
        }
    },
    async deleteEvent(req, res){
        try{
            const token = req.query.token;
            if(!secaDataMem.isValidToken(token))
                return res.status(403).json({msg :'unreconized token'});
            const groupId = req.query.groupId;
            const eventId = req.query.eventId;
            if (groupId == null || eventId == null)
                return res.status(400).json({error : `groupId : ${groupId} and eventId : ${eventId} should be especified`});
            if (secaDataMem.deleteEvent(groupId, token, eventId)){
                return res.status(200).json({msg : `event ${eventId} has been removed from group ${groupId}`});
            }else{
                return res.status(403).json({error : `user ${token} unnable to delete event ${eventId} from group ${groupId}`})
            }
        }catch(error){
            console.error('Error processing the post request', error);
            res.status(500).json({error: error});
        }
    }
};

export default secaServices;