import tmEventsData from "./tm-events-data.mjs";
import secaDataMem from "./seca-data-mem.mjs";

const apiKey = '1VzEYuN3kBDwTrV7yQGRuRngZdfkmhKH';

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
            const eventName = req.query.name;
            if (!eventName)
                return res.status(400).json({error: 'Name parameter is required for event search'});
            const popularEventData = await tmEventsData.fetchEventByName();
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
    }
};

export default  secaServices;