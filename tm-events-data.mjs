import fetch from 'node-fetch';

const apiKey = '1VzEYuN3kBDwTrV7yQGRuRngZdfkmhKH';

const tmEventsData = {
    async fetchPopularEvent(s, p){
        const apiURL = `https://app.ticketmaster.com/discovery/v2/events/?sort=relevance,desc&size=${s}&page=${p}&apikey=${apiKey}`;
        try{
            const response = await fetch(apiURL);
            if (response.ok){
                return filter(await response.json());
            }
            else{
                throw new Error('Internal server error'); 
            }
        }catch(error){
            throw error;
        }
    },

    async fetchEventByName(eventName, s, p){
        const apiURL = `https://app.ticketmaster.com/discovery/v2/events/?keyword=${eventName}&size=${s}&page=${p}&apikey=${apiKey}`;
        try{
            const response = await fetch(apiURL);
            if(!response.ok){
                throw new Error('Error fetching event with the name ', eventName);
            }
            else{
                //return (await response.json());
                return filter(await response.json());
            }
        }catch(error){
            throw error;
        }
    },
    async fetchEventById(eventId){
        const apiURL = `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${apiKey}`;
        try{
            const response = await fetch(apiURL);
            if (!response.ok){
                throw new Error('Error fetching event with ID', eventId);
            }
            else{
                return formatData(await response.json());
            }
        }catch(error){
            throw error;
        }
    }
}

function formatData(data){
    return {
        id : data.id,
        name : data.name,
        date : data.date,
        segment : data.classifications[0].segment || 'N/A',
        genre : data.classifications[0].genre || 'N/A',
    }
}

function filter(response){
    console.log(response._embedded.events[1])
    return response._embedded.events.map(element => {
        return {
            id : element.id,
            name : element.name,
            date : element.dates.start.localDate,
            //segment : element.classifications[0].segment || 'N/A',
            //genre : element.classifications[0].genre || 'N/A',
        };
    });
}

export default tmEventsData;
