import tmEventsData from "./tm-events-data.mjs";
import secaDataMem from "./seca-data-mem.mjs";

const secaServices = {
    async getPopularEvents(req, res){
       try{
        const popularEventData = await tmEventsData.fetchPopularEvent();
        const formattedEvents = popularEventData.map(event => (
            {
                name: event.name,
                date: event.date,
                segment: event.segment || 'N/A',
                genre: event.genre || 'N/A',
            }
        ));

        res.json(formattedEvents);
       }catch(error){
        console.error('Error fetching popular events:', error);
        res.status(500).json({error: 'Internal server Error'})
       }
    },
    async searchEvents(req, res){
        try{
            const eventName = req.params.eventName;
            if (!eventName)
                return res.status(400).json({error: 'Name parameter is required for event search'});
            const popularEventData = await tmEventsData.fetchEventByName(eventName);
            const formattedEvents = popularEventData.map(event => (
                {
                    name: event.name,
                    date: event.date,
                    segment: event.segment || 'N/A',
                    genre: event.genre || 'N/A',
                }
            ));

            res.json(formattedEvents);
       }catch(error){
        console.error('Error fetching popular events:', error);
        res.status(500).json({error: 'Internal server Error'});
       }
    },
    async getGroups(req, res){
        try{
        const allGroups = await secaDataMem.allGroups();
        res.json(allGroups);
        }catch(error){
            console.error('Error geting the groups:', error);
            res.status(500).json({error: 'Internal server Error'})
        }
    },
    async getGroup(req, res){
        try{
            const groupName = req.params.groupId;
            if (!groupName)
                return res.status(400).json({error: 'Name parameter is required for group search'});
            const group = await secaDataMem.getGroup(req);
            res.json(group);
        }catch(error){
            console.error('Error geting the group:', error);
            res.status(500).json({error: 'Internal server Erro'})
        }
    }
};

export default  secaServices;