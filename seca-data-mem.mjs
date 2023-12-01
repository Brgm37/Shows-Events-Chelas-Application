import crypto from 'crypto'

//classe Group com propriedades e métodos para manipularmos cada group
class Group {
    constructor(name, description, IdUser) {
        this.name = name;
        this.description = description;
        this.IdUser = IdUser;
        this.events = []; // Array para armazenar os eventos do grupo
    }

    addEvent(event) {
        // Adiciona um evento ao grupo
        this.events.push(event);
    }

    removeEvent(eventId) {
        // Remove um evento do grupo com base no ID do evento
        this.events = this.events.filter(event => event.id !== eventId);
    }
}

class User {
    constructor(userId, userName) {
        this.userId = userId;
        this.userName = userName;
    }
}
// Initialize a Map to store groups and users in memory
const groupsMap = new Map();
const usersMap = new Map();

const secaDataMem = {
    createGroup: (name, description, IdUser) => {
        let flag = 1;
        Array.from(groupsMap.values()).forEach(it => {
            if (it.name == name && it.IdUser == IdUser && it.description == description)
                flag = null
        });
        if (flag == null){
            return null;
        }
        /*
        for(const group of groupsMap.values()){
            if(group.name == name && group.IdUser == IdUser){
                //significa que o memso user está a tentar criar dois grupos com nomes iguais
                return null
            }
        }
        */
        // Generate a unique ID 
        const GroupId = crypto.randomUUID();
        //create a new group and add it to the map
        const newGroup = new Group(name, description, IdUser);
        groupsMap.set(GroupId, newGroup);
        return GroupId;
    },
    allGroups: (user) => {
        // Return an array of all groups associated to the user
        //return [...groupsMap.values()]
        /*
        const array = []
        for(const group of groupsMap.values()){
            if(group.IdUser === user){
                array.push(group)
            }
        }
        return array
        */
       return Array.from(groupsMap.values()).filter(it => it.IdUser == user);
    },
    getGroup: (groupId, token) => {
        const group = groupsMap.get(groupId);
        if (group == undefined || group.IdUser != token)
            return null
        return group;
        /*
        for(const group of groupsMap.values()){
            if(group.groupId === groupId){
                return group
            }
        }
        */
        return null
    },
    createUser(userName){
        /*
        for(const username of usersMap.values()){
            if(username == userName){
                return null
            }
        }
        */
        // Generate a unique ID 
        const userId = crypto.randomUUID();
        //create a new user and set it in the map
        const newUser = new User(userId, userName)
        usersMap.set(userId, userName);
        return newUser
    },
     editGroup(groupId, newGroupName, newDescription, newEvent, token){
        const group = groupsMap.get(groupId);
        if (group == undefined || group.IdUser != token){
            throw new Error('Unnable to access group');
        }
        else{
            if (newGroupName == null && newDescription == null && newEvent == null)
                return group;
            if(newGroupName != null)
                group.name = newGroupName;
            if(newDescription != null)
                group.description = newDescription;
            if(newEvent != null)
                group.addEvent(newEvent);
            return group;
        }
    },
    isValidToken(token) {
        return usersMap.has(token);
    },
    deleteGroup(groupId, token){
        const group = groupsMap.get(groupId);
        if (group == undefined)
            throw new Error('Group non existent');
        if (group.IdUser == token){
            groupsMap.delete(groupId);
            return true;
        }else
            return false;
    },
    deletEvent(groupId, token, eventId){
        const group = groupsMap.get(groupId)
        if (group == undefined)
            throw new Error('Group non existent')
            if (group.IdUser == token){
                group.removeEvent(eventId)
                return true;
            }else
                return false;
    }
};
/*
function getUserId(userName){
    for(const [id, name] of usersMap.entries()){
        if(name === userName){
            return id
        }
    }
    return null
}
*/
/*
function getGroupId(groupName, user_Id){ 
    for(const [id, group] of groupsMap.entries()){
        if(group.name === groupName && group.IdUser === user_Id){
            return id
        }
    }
    return null
}
*/
/*
function isValidName(userName){
    for(const name of usersMap.values()){
        if(name === userName){
            return true
        }
    }
    return false
}
*/
/*
function isValidGroup(groupName){
    for(const group of groupsMap.values()){
        if(group.name === groupName){
            return true
        }
    }
    return false
}
*/
export default secaDataMem;
//export { User, usersMap, groupsMap, secaDataMem, isValidName, isValidGroup };