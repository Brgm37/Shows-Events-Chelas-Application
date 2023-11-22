import fetch from 'node-fetch';

const apiKey = '1VzEYuN3kBDwTrV7yQGRuRngZdfkmhKH';

const tmEventsData = {
    async fetchPopularEvent(){
        const apiURL = `https://app.ticketmaster.com/discovery/v2/event.json?sort&size=30&page=1&apikey=${apiKey}`;
        try{
            const response = await fetch(apiURL);
            if (!response.ok)
                throw new Error('Error fetching popular event data');
            return response.json();
        }catch(error){
            throw error;
        }
    },

    async fetchEventByName(eventName){
        const apiURL = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${eventName}&size=30&page=1&apikey=${apiKey}`;
        try{
            const response = await fetch(apiURL);
            if(!response.ok)
                throw new Error('Error fetching event whit the name ', eventName);
            return response.json()
        }catch(error){
            throw error;
        }
    }
}

export default tmEventsData;
