import fetch from 'node-fetch';

// API key for Ticketmaster API
const apiKey = '1VzEYuN3kBDwTrV7yQGRuRngZdfkmhKH';

// Object containing functions to fetch events from the Ticketmaster API
const tmEventsData = {
    // Function to fetch popular events
    async fetchPopularEvent(s, p) {
        const apiURL = `https://app.ticketmaster.com/discovery/v2/events/?sort=relevance,desc&size=${s}&page=${p}&apikey=${apiKey}`;
        try {
            const response = await fetch(apiURL);
            if (response.ok) {
                return filter(await response.json());
            } else {
                throw new Error('Internal server error');
            }
        } catch (error) {
            throw error;
        }
    },

    // Function to fetch events by name
    async fetchEventByName(eventName, s, p) {
        const apiURL = `https://app.ticketmaster.com/discovery/v2/events/?keyword=${eventName}&size=${s}&page=${p}&apikey=${apiKey}`;
        try {
            const response = await fetch(apiURL);
            if (!response.ok) {
                throw new Error('Error fetching event with the name ', eventName);
            } else {
                const reply = await response.json();
                if(reply._embedded && reply._embedded.events.length > 0){
                    return filter(reply);
                }else{
                    return {};
                }
                
            }
        } catch (error) {
            throw error;
        }
    },

    // Function to fetch event by ID
    async fetchEventById(eventId) {
        const apiURL = `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${apiKey}`;
        try {
            const response = await fetch(apiURL);
            if (!response.ok) {
                throw new Error('Error fetching event with ID', eventId);
            } else {
                return formatData(await response.json());
            }
        } catch (error) {
            throw error;
        }
    }
}

// Function to format data received from the Ticketmaster API
function formatData(data) {
    return {
        id: data.id,
        name: data.name,
        date: data.dates.start.dateTime,
        segment: data.classifications[0].segment || 'N/A',
        genre: data.classifications[0].genre || 'N/A',
    }
}

function filter(response){
    // let e = 0;
    // for(let i = 0; i < 100; i++){
    //     console.log(i)
    //     console.log(response._embedded.events[i].sales.public)
    //     e++
    // }
    // console.log(response._embedded.events[0].images)
    return response._embedded.events.map(element => {
        return {
            id: element.id, 
            name: element.name,
            image: element.images && element.images.length > 0 ? element.images[0] : null,
            sales: element.sales && element.sales.public && element.sales.public.startDateTime && element.sales.public.endDateTime
            ? `${element.sales.public.startDateTime} - ${element.sales.public.endDateTime}`
            : 'N/A',
            date: element.dates.start.dateTime,
            segment: element.classifications && element.classifications.length > 0
                ? element.classifications[0].segment.name
                : 'N/A',
            genre: element.classifications && element.classifications.length > 0
                ? element.classifications[0].genre.name
                : 'N/A',
            subGenre: element.classifications && element.classifications.length > 0 && element.classifications[0].subGenre
                ? element.classifications[0].subGenre.name
                : 'N/A',
        };
    });
}

// Export the object containing Ticketmaster event-related functions
export default tmEventsData;