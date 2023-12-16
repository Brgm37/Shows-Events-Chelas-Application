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
    return {
        fetchEventByName,
        fetchPopularEvents,
        createGroup,
        allGroups,
        getGroup,
        createUser,
        editGroup,
        isValid,
        deleteGroup,
        deleteEvent,
        addEvent,
        signIn,
    }

    async function fetchEventById(eventId){
        try{
            return await tmEventsData.fetchEventById(eventId);
        }catch(erro){
            throw errors.INTERNAL_SERVER_ERROR("fetchEventById", erro);
        }
    }

    async function fetchPopularEvents(s, p){
        try{
            return await tmEventsData.fetchPopularEvent(s, p)
        }catch(erro){
            throw errors.INTERNAL_SERVER_ERROR("fetchPopularEvents", erro);
        }
    }

    async function fetchEventByName(eventName, s, p){
        try{
            return await tmEventsData.fetchEventByName(eventName, s, p);
        }catch(erro){
            throw errors.INTERNAL_SERVER_ERROR("fetchEventByName", erro);
        }
    }    
    
    async function createGroup(name, description, userId){
        try{
            const newGroup = new Group(name, description, userId);
            return await groupsTable.insertGroup(newGroup);           //POR DEFAULT JÁ TEM O INDEXGROUP
        }catch(erro){
            throw errors.INTERNAL_SERVER_ERROR("createGroup", erro);
        }     
    }

    async function allGroups(userId){
        try{
            return await groupsTable.getGroups(userId);;
        }catch(erro){
            throw errors.INTERNAL_SERVER_ERROR("allGroups", erro);
        }
    }

    async function getGroup(groupId, userId){
        try{
            console.log(userId);
            const group = await groupsTable.getGroup(groupId);
            console.log(group);
            if (group.userId == userId)
                return group;
            else
                throw errors.NOT_AUTHORIZED(userId, groupId);
        }catch(error){
            console.log(error)
            throw errors.NOT_FOUND(groupId);
        }
    }

    async function createUser(userName){
        try{
            const newUser = new User(userName)
            return await usersTable.insertUser(newUser);
        }catch(erro){
            throw errors.INTERNAL_SERVER_ERROR("createUser", erro);
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
        }catch(erro){
            throw errors.NOT_FOUND(groupId);
        }
    }

    async function isValid(userId) {
        return await usersTable.isValid(userId);
    }

    async function deleteGroup(groupId, userId){
        try{
            const group = await groupsTable.getGroup(groupId);
            if (group.userId != userId)
                throw errors.NOT_AUTHORIZED(userId, groupId);
        return await groupsTable.deleteGroup(group.groupId);
        }catch(erro){
            throw errors.NOT_FOUND(groupId);
        }
    }

    async function deleteEvent(groupID, eventId, userId){
        try{
            const groupUpdate = await groupsTable.getGroup(groupID);
            if (groupUpdate.userId != userId)
                throw errors.NOT_AUTHORIZED(userId, groupID);
            if (!groupUpdate.events.map(it => it.id).includes(eventId))
                throw errors.NOT_FOUND(eventId);
            groupUpdate.events = groupUpdate.events.filter(event => event.id != eventId);
            return await groupsTable.updateGroup(groupUpdate);
        }catch(error){
            throw error.NOT_FOUND(groupID);
        }
    }

    async function addEvent(token, userId, eventId){
        try{
            const event = await fetchEventById(eventId);
            const groupUpdate = await groupsTable.getGroup(token);
            if(groupUpdate.userId != userId)
                throw errors.NOT_AUTHORIZED(eventId, token);
            groupUpdate.events.push(event);
            return await groupsTable.updateGroup(groupUpdate);
        }catch(erro){
            throw errors.NOT_FOUND(token);
        }
    }

    async function signIn(userName, password){
        try{
            const user = await usersTable.isValid(userName, password);

            if (user.token == undefined)
                return false;
            else
                return user;
        }catch(erro){
            throw errors.NOT_FOUND(userName);
        }
    }

    async function signUp(userName, password){
        try{
            const user = await usersTable.isValid(userName, password);
            if (user.token == undefined)
                return await usersTable.insertUser(new User(userName, password));
            else
                return false;
        }catch(erro){
            throw errors.INTERNAL_SERVER_ERROR(erro);
        }
    }
};
