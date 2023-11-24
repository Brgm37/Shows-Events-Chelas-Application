import tmEventsData from './tm-events-data.mjs';
import secaDataMem from './seca-data-mem.mjs';

const secaServices = {
    async getPopularEvents(req, res){
       try{
        let popularEventData = await tmEventsData.fetchPopularEvent();       //string .json com a response
        return res.status(200).json(popularEventData);                       //retorna uma resposta com o código 200, e com a string .json ao cliente
       }catch(error){
        console.error('Error fetching popular events:', error);
        return res.status(500).json({error: 'Internal server Error'})
       }
    },
    async searchEvents(req, res){
        try{
            const eventName = req.query.eventName;          //extrai o parâmetro eventName do URL passado em req
            if (!eventName){
                return res.status(400).json({error: 'Name parameter is required for event search'});
            }else{
                const popularEventData = await tmEventsData.fetchEventByName(eventName);        //string .json com a response
                return res.status(200).json(popularEventData);                                  //retorna uma resposta com o código 200, e com a string .json ao cliente
            }
       }catch(error){
        console.error('Error fetching popular events:', error);
        return res.status(500).json({error: 'Internal server Error'});
       }
    },
    async getGroups(req, res){
        try{
            const allGroups = await secaDataMem.allGroups();            //array with all groups
            return res.status(200).json(allGroups);
        }catch(error){
            console.error('Error geting the groups:', error);
            return res.status(500).json({error: 'Internal server Error'})
        }
    },
    async getGroup(req, res){
        try{
            const groupName = req.params.groupId;       //extrai o parâmetro groupId do URL passado em req
            if (!groupName){
                return res.status(400).json({error: 'Name parameter is required for group search'});
            }else{
                const group = await secaDataMem.getGroup(groupName);
                return res.status(200).json(group);
            }
        }catch(error){
            console.error('Error geting the group:', error);
            return res.status(500).json({error: 'Internal server Error'})
        }
    },
    async postGroup(req, res){
        try{
            const {name , description} = req.body

            if (!name || !description){
                return res.status(400).json({error: 'Name parameter and description are required'});
            }

            const postGroup = secaDataMem.createGroup(name, description);

            secaDataMem.storeGroup(postGroup);

            res.status(201).json({ message: 'Group created successfully.', group: postGroup });
        }catch(error){
            console.error('Error processing the post request', error);
        res.status(500).json({error: 'Interna server error'});
        }
    }
};

export default  secaServices;