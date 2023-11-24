import crypto from 'crypto'


// Initialize a Map to store groups in memory
const groupsMap = new Map();

const secaDataMem = {
    createGroup: (name, description, IdUser) => {
        // Generate a unique ID 
        const id = crypto.randomUUID();
        // Create a new group object
        const newGroup = { id, name, description, IdUser, events: [] };

        return newGroup;
    },

    storeGroup: (group) => {
        // Store the group in the Map with the group's ID as the key
        groupsMap.set(group.id, group);
    },

    allGroups: (user) => {
        // Return an array of all groups in the Map
        return [...groupsMap.values()];
    },
    getGroup: (name) => {
        return groupsMap.get(name)
    },
};

export default secaDataMem;

function main(){ //teste
    let name = 'antonio' 
    let description = null
    let IdUser = 'e5ab7d81-f7df-4d76-9acf-0d3c0c73649a'
    let group = secaDataMem.createGroup(name, description, IdUser)
    console.log(group)

}
main()