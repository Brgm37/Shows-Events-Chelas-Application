import crypto from 'crypto';

// Class representing a group with name, description, IdUser, and a list of events
class Group {
    constructor(name, description, IdUser) {
        this.name = name;
        this.description = description;
        this.IdUser = IdUser;
        this.events = []; // List to store events associated with the group
    }

    // Method to add an event to the group
    addEvent(event) {
        this.events.push(event);
    }

    // Method to remove an event from the group by eventId
    removeEvent(eventId) {
        this.events = this.events.filter(event => event.id !== eventId);
    }
}

// Class representing a user with userId and userName
class User {
    constructor(userId, userName) {
        this.userId = userId;
        this.userName = userName;
    }
}

// Map objects to store groups and users
const groupsMap = new Map();
const usersMap = new Map();

// Object containing functions for managing groups, users, and events in memory
const secaDataMem = {
    // Function to create a new group
    createGroup: (name, description, IdUser) => {
        let flag = 1;
        // Check if a group with the same name, IdUser, and description already exists
        Array.from(groupsMap.values()).forEach(it => {
            if (it.name == name && it.IdUser == IdUser && it.description == description)
                flag = null;
        });
        if (flag == null) {
            return null; // Return null if a group with the same properties already exists
        } 
        const GroupId = crypto.randomUUID();
        const newGroup = new Group(name, description, IdUser);
        groupsMap.set(GroupId, newGroup);
        return GroupId;
    },  

    // Function to retrieve all groups for a specific user
    allGroups: (user) => {
        return Array.from(groupsMap.values()).filter(it => it.IdUser == user);
    },

    // Function to get details of a specific group based on groupId and user token
    getGroup: (groupId, token) => {
        const group = groupsMap.get(groupId);
        if (group == undefined || group.IdUser != token)
            return null; // Return null if the group does not exist or the user does not have access
        return group;
    },

    // Function to create a new user
    createUser(userName) {                                  
        let flag = 1;
        // Check if a user with the same name already exists
        Array.from(usersMap.values()).forEach(existingUserName => {
            if (existingUserName == userName)
                flag = null;
        });
        if (flag == null) {
            return null; // Return null if a user with the same name already exists
        } 
        const userId = crypto.randomUUID();
        const newUser = new User(userId, userName);
        usersMap.set(userId, userName);
        return newUser;
    },

    // Function to edit group details and add events
    editGroup(groupId, newGroupName, newDescription, newEvent, token) {
        const group = groupsMap.get(groupId);
        if (group == undefined || group.IdUser != token) {
            return null; // Return null if the group does not exist or the user does not have access
        } else {
            // Check if any updates are requested, and apply them
            if (newGroupName == null && newDescription == null && newEvent == null)
                return group; // Return the group if no updates are requested
            if (newGroupName != null)
                group.name = newGroupName;
            if (newDescription != null)
                group.description = newDescription;
            if (newEvent != null) 
                group.addEvent(newEvent);
            return group;
        }
    },

    // Function to check the validity of a user token
    isValidToken(token) {
        return usersMap.has(token);
    },

    // Function to delete a group based on groupId and user token
    deleteGroup(groupId, token) {
        const group = groupsMap.get(groupId);
        if (group == undefined)
            throw new Error('Group non-existent'); // Throw an error if the group does not exist
        if (group.IdUser == token) {
            groupsMap.delete(groupId);
            return true; // Return true if the group is deleted successfully
        } else
            return false; // Return false if the user does not have permission to delete the group
    }, 

    // Function to delete an event from a group based on groupId, user token, and eventId
    deleteEvent(groupId, token, eventId) {
        const group = groupsMap.get(groupId);
        if (group == undefined)
            return false; // Return false if the group does not exist
        if (group.IdUser == token) {
            for (const event of group.events) {
                if (event.id == eventId) {
                    group.removeEvent(eventId);
                    return true; // Return true if the event is deleted successfully
                }
            }
            return false; // Return false if the event with the specified ID is not found
        } else {
            return false; // Return false if the user does not have permission to delete the event
        }
    }
};

// Export the secaDataMem object and additional classes and maps for external use
export default secaDataMem;
export { User, Group, usersMap, groupsMap };