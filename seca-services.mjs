import tmEventsData from './tm-events-data.mjs';
import * as secaDataMem1 from './seca-data-mem.mjs';

const secaServices = {
    async getPopularEvents(req, res){
       try{
        const s = req.query.s;
        const p = req.query.p;
        let popularEventData = await tmEventsData.fetchPopularEvent(s, p);   //string .json com a response
        return res.status(200).json(popularEventData);                       //retorna uma resposta com o código 200, e com a string .json ao cliente
       }catch(error){
        console.error('Error fetching popular events:', error);
        return res.status(500).json({error: 'Internal server Error'})
       }
    },
    async searchEvents(req, res){
        try{
            const eventName = req.query.eventName;          //extrai o parâmetro eventName do URL passado em req
            const s = req.query.s;
            const p = req.query.p;
            if (!eventName){
                return res.status(400).json({error: 'Name parameter is required for event search'});
            }else{
                const popularEventData = await tmEventsData.fetchEventByName(eventName, s, p);        //string .json com a response
                return res.status(200).json(popularEventData);                                  //retorna uma resposta com o código 200, e com a string .json ao cliente
            }
       }catch(error){
        console.error('Error fetching popular events:', error);
        return res.status(500).json({error: 'Internal server Error'});
       }
    },
    async getGroups(req, res){
        try{
            const allGroups = await secaDataMem1.secaDataMem.allGroups();        //map with all groups
            return res.status(200).json(allGroups);
        }catch(error){
            console.error('Error getting the groups:', error);
            return res.status(500).json({error: 'Internal server Error'})
        }
    },
    async getGroup(req, res){
        try{
            const groupId = req.params.groupId;               //extrai o parâmetro groupId do URL passado em req
            console.log(groupId)
            if (!groupId){
                return res.status(400).json({error: 'Name parameter is required for group search'});
            }else{
                const group = await secaDataMem1.secaDataMem.getGroup(groupId);
                return res.status(200).json(group);
            }
        }catch(error){
            console.error('Error getting the group:', error);
            return res.status(500).json({error: 'Internal server Error'})
        }
    },
    async postGroup(req, res){
        try{
            const {name , description, IdUser} = req.body
            if (!name || !description){
                return res.status(400).json({error: 'Name parameter and description are required'});
            }

            const postGroup = secaDataMem1.secaDataMem.createGroup(name, description, IdUser);
            return res.status(201).json({ message: 'Group created successfully.', group: postGroup });
        }catch(error){
            console.error('Error processing the post request', error);
            return res.status(500).json({error: 'Interna server error'});
        }
    },
    async postUser(req, res){
        try{
            const userName = req.query.userName;

            const newUser = secaDataMem1.secaDataMem.createUser(userName);

            if(newUser == null){
                return res.status(409).json({error: 'user already exists', user: userName});
            }
            else{
                return res.status(201).json({message: 'user created successfully', user: newUser.userName, userId: newUser.userId});
            }
        }catch(error){
            console.error('Error processing the post request', error);
            return res.status(500).json({error: 'Interna server error'});
        }
    }
};

export default secaServices;