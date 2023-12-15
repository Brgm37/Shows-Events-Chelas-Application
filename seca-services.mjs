import tmEventsData from './tm-events-data.mjs';
import secaElastic from './data/elastic/seca-data-elastic.mjs';
import errors from './common/errors.mjs';
//classe Group com propriedades e métodos para manipularmos cada group
class Group {
    constructor(name, description, userId, groupId = null) {
        this.groupId = groupId;
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

//const INDEX_GROUPS = 'groups';
const INDEX_USERS = 'users';

export default function() {
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
        logIn,
        signIn
    }

    async function fetchEventById(eventId){
        try{
            return tmEventsData.fetchEventById(eventId);
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
            return await secaElastic().insertGroup(newGroup);           //POR DEFAULT JÁ TEM O INDEXGROUP
        }catch(erro){
            throw errors.INTERNAL_SERVER_ERROR("createGroup", erro);
        }     
    }

    async function allGroups(userId){
        try{
            return await secaElastic().getGroups(userId);;
        }catch(erro){
            throw errors.INTERNAL_SERVER_ERROR("allGroups", erro);
        }
    }

    async function getGroup(groupId, userId){
        try{
            console.log(userId);
            const group = await secaElastic().getGroup(groupId);
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
            return await secaElastic(INDEX_USERS).insertUser(newUser);
        }catch(erro){
            throw errors.INTERNAL_SERVER_ERROR("createUser", erro);
        }
    }

    async function editGroup(groupId, newGroupName, newDescription, userId){
        try{
            const groupUpdate = await secaElastic().getGroup(groupId);
            if (groupUpdate.userId != userId)
                throw errors.NOT_AUTHORIZED(userId, groupId);
            if (newGroupName != null)
            groupUpdate.name = newGroupName;
            if (newDescription != null)
            groupUpdate.description = newDescription;
            return await secaElastic().updateGroup(groupUpdate);
        }catch(erro){
            throw errors.NOT_FOUND(groupId);
        }
    }

    async function isValid(userId) {
        return await secaElastic(INDEX_USERS).isValid(userId);
    }

    async function deleteGroup(groupId, userId){
        try{
            const group = await secaElastic().getGroup(groupId);
            if (group.userId != userId)
                throw errors.NOT_AUTHORIZED(userId, groupId);
        return await secaElastic().deleteGroup(group.groupId);
        }catch(erro){
            throw errors.NOT_FOUND(groupId);
        }
    }

    async function deleteEvent(groupID, eventId, userId){
        try{
            const groupUpdate = await secaElastic().getGroup(groupID);
            if (groupUpdate.userId != userId)
                throw errors.NOT_AUTHORIZED(userId, groupID);
            if (!groupUpdate.events.map(it => it.id).includes(eventId))
                throw errors.NOT_FOUND(eventId);
            groupUpdate.events = groupUpdate.events.filter(event => event.id != eventId);
            return await secaElastic().updateGroup(groupUpdate);
        }catch(error){
            throw error.NOT_FOUND(groupID);
        }
    }

    async function addEvent(token, userId, eventId){
        try{
            const event = await fetchEventById(eventId);
            const groupUpdate = await secaElastic().getGroup(token);
            if(groupUpdate.userId != userId)
                throw errors.NOT_AUTHORIZED(eventId, token);
            groupUpdate.events.push(event);
            return await secaElastic().updateGroup(groupUpdate);
        }catch(erro){
            throw errors.NOT_FOUND(token);
        }
    }

    async function logIn(userName, password){
        try{
            const user = await secaElastic(INDEX_USERS).isValid(userName, password);

            if (user.token == undefined)
                return false;
            else
                return user;
        }catch(erro){
            throw errors.NOT_FOUND(userName);
        }
    }

    async function signIn(userName, password){
        try{
            const user = await secaElastic(INDEX_USERS).isValid(userName, password);
            if (user.token == undefined)
                return await secaElastic(INDEX_USERS).insertUser(new User(userName, password));
            else
                return false;
        }catch(erro){
            throw errors.INTERNAL_SERVER_ERROR(erro);
        }
    }
};
