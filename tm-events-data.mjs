import fetch from 'node-fetch';

const apiKey = '1VzEYuN3kBDwTrV7yQGRuRngZdfkmhKH';

const tmEventsData = {
    async fetchPopularEvent(s, p){
        let size;
        let page;
        if(s === null){size = 30} else {size = s};
        if(p === null){page = 1} else {page = p};
        const apiURL = `https://app.ticketmaster.com/discovery/v2/events/?sort=relevance,desc&size=${size}&page=${page}&apikey=${apiKey}`;
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

    async fetchEventByName(eventName, s, p){
        let size;
        let page;
        if(s === null){size = 30} else {size = s};
        if(p === null){page = 1} else {page = p};
        //const apiURL = `https://app.ticketmaster.com/discovery/v2/events.json?&size=${size}&page=${page}&apikey=${apiKey}`;
        const apiURL = `https://app.ticketmaster.com/discovery/v2/events/?keyword=${eventName}&size=${s}&page=${p}&apikey=${apiKey}`;
        try{
            const response = await fetch(apiURL);
            if(!response.ok){
                throw new Error('Error fetching event with the name ', eventName);
            }
            else{
                return filter(await response.json(), eventName)
            }
        }catch(error){
            throw error;
        }
    }
}

function filter1(response, eventName){
    let event = [];
    response._embedded.events.forEach(element => {
        if(element.name === eventName)
        event.push(element);
    });
    return event;
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
