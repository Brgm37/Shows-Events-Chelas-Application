import fetch from 'node-fetch';

const apiKey = '1VzEYuN3kBDwTrV7yQGRuRngZdfkmhKH';

const tmEventsData = {
    async fetchPopularEvent(){
        const apiURL = `https://app.ticketmaster.com/discovery/v2/events/?sort=relevance,desc&size=30&page=1&apikey=${apiKey}`;
        try{
            const response = await fetch(apiURL);
            if (response.ok){
                return filter(await response.json());
            }
            else{
                throw new Error('Internal server error') 
            }
        }catch(error){
            throw error;
        }
    },

    async fetchEventByName(eventName){
        const apiURL = `https://app.ticketmaster.com/discovery/v2/events/?keyword=${eventName}&size=30&page=1&apikey=${apiKey}`;
        try{
            const response = await fetch(apiURL);
            if(!response.ok){
                throw new Error('Error fetching event with the name ', eventName);
            }
            else{
                return filter(await response.json())
            }
        }catch(error){
            throw error;
        }
    }
}

function filter(response){
    let event = [];
    response._embedded.events.forEach(element => {
        let obj = {
            id : element.id,
            name : element.name,
            date : element.date,
            segment : element.classifications[0].segment || 'N/A',
            genre : element.classifications[0].genre || 'N/A',
        }
        event.push(obj);
    });
    return event;
}

export default tmEventsData;
