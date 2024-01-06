import tmEventsData from './tm-events-data.mjs';
import errors from './common/errors.mjs';

class Group {
    constructor(name, description, userId) {
        this.name = name;
        this.description = description;
        this.userId = userId;
        this.events = []; // Array para armazenar os eventos do grupo
    }
}

class User {
    constructor(userName, password) {
        this.password = password;
        this.userName = userName;
    }
}

export default function(usersTable, groupsTable) {
    if(!usersTable && !groupsTable){
        throw errors.INVALID_ARGUMENT("secaElastic");
    }

    return {
        fetchEventByName,
        fetchPopularEvents,
        createGroup,
        allGroups,
        getGroup,
        createUser,
        editGroup,
        isValid,
        isValidToken,
        deleteGroup,
        deleteEvent,
        addEvent,
        signUp,
        dummy
    }

    async function fetchEventById(eventId){
        try{
            return await tmEventsData.fetchEventById(eventId);
        }catch(error){
            console.log(error);
            throw errors.INTERNAL_SERVER_ERROR("fetchEventById", error);
        }
    }

    async function fetchPopularEvents(s, p){
        try{
            return await tmEventsData.fetchPopularEvent(s, p)
        }catch(error){
            throw errors.INTERNAL_SERVER_ERROR("fetchPopularEvents", error);
        }
    }

    async function fetchEventByName(eventName, s, p){
        try{
            return await tmEventsData.fetchEventByName(eventName, s, p);
        }catch(error){
            throw errors.INTERNAL_SERVER_ERROR("fetchEventByName", error);
        }
    }    
    
    async function createGroup(name, description, userId){
        try{
            const newGroup = new Group(name, description, userId);
            return await groupsTable.insertGroup(newGroup);           //POR DEFAULT JÁ TEM O INDEXGROUP
        }catch(error){
            throw errors.INTERNAL_SERVER_ERROR("createGroup", error);
        }     
    }

    async function allGroups(userId){
        try{
            return await groupsTable.getGroups(userId);
        }catch(error){
            throw errors.INTERNAL_SERVER_ERROR("allGroups", error);
        }
    }

    async function getGroup(groupId, userId){
        try{
            const group = await groupsTable.getGroup(groupId);
            if (group.userId == userId)
                return group;
            else
                throw errors.NOT_AUTHORIZED(userId, groupId);
        }catch(error){
            console.log(error)
            throw errors.NOT_FOUND(groupId);
        }
    }

    async function createUser(userName, password){
        try{
            const newUser = new User(userName, password);
            return await usersTable.insertUser(newUser);
        }catch(error){
            throw errors.INTERNAL_SERVER_ERROR("createUser", error);
        }
    }

    async function editGroup(groupId, newGroupName, newDescription, userId){
        try{
            const groupUpdate = await groupsTable.getGroup(groupId);
            if (groupUpdate.userId != userId)
                throw errors.NOT_AUTHORIZED(userId, groupId);
            if (newGroupName != null);
                groupUpdate.name = newGroupName;
            if (newDescription != null);
                groupUpdate.description = newDescription;
            return await groupsTable.updateGroup(groupUpdate);
        }catch(error){
            throw errors.NOT_FOUND(groupId);
        }
    }

    async function isValidToken(userId){
        try {
            return await usersTable.isValidToken(userId);
        }catch (e) {
            throw  errors.NOT_FOUND(userId);
        }
    }

    async function isValid(userName, password) {
        try{
            return await usersTable.isValid(userName, password);
        }catch(error){
            throw error.INTERNAL_SERVER_ERROR(userName)
        }
    }

    async function deleteGroup(groupId, userId){
        try{
            const group = await groupsTable.getGroup(groupId);
            if (group.userId != userId)
                throw errors.NOT_AUTHORIZED(userId, groupId);
        return await groupsTable.deleteGroup(group.groupId);
        }catch(error){
            throw errors.NOT_FOUND(groupId);
        }
    }

    async function deleteEvent(groupId, eventId, userId) {
        try {
            const groupUpdate = await groupsTable.getGroup(groupId);
            if (groupUpdate.userId !== userId) {
                throw errors.NOT_AUTHORIZED(userId, groupId);
            }
            const eventIndex = groupUpdate.events.findIndex(event => event.id === eventId);
            if (eventIndex === -1) {
                throw errors.NOT_FOUND(eventId);
            }
            groupUpdate.events.splice(eventIndex, 1);
            return await groupsTable.updateGroup(groupUpdate);
        } catch (error) {
            throw error.NOT_FOUND(groupId);
        }
    }

    async function addEvent(groupId, userId, eventId){
        try{
            const event = await fetchEventById(eventId);
            const groupUpdate = await groupsTable.getGroup(groupId);
            if(groupUpdate.userId != userId)
                throw errors.NOT_AUTHORIZED(eventId, groupId);
            groupUpdate.events.push(event);
            console.log(groupUpdate);
            return await groupsTable.updateGroup(groupUpdate);
        }catch(error){
            throw errors.NOT_FOUND(groupId);
        }
    }

    async function signUp(userName, password){
        try{
            const user = await usersTable.isValid(userName, password);
            if (user.token == undefined)
                return await usersTable.insertUser(new User(userName, password));
            else
                return false;
        }catch(error){
            throw errors.INTERNAL_SERVER_ERROR(error);
        }
    }
    async function dummy(){
        const group = new Group('dummy', 'dummy', 'BisueIwBsZ85YzGhG47_');
        const event = await fetchEventById('G5vYZ9YBkpvBo');
        group.events.push(event);
        return await groupsTable.insertGroup(group);
    }
};
