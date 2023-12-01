import crypto from 'crypto'

//classe Group com propriedades e métodos para manipularmos cada group
class Group {
    constructor(groupId, name, description, IdUser) {
        this.groupId = groupId;
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
        this.events = this.events.filter(event => event.eventId !== eventId);
    }

    getGroupDetails() {
        // Obtém os detalhes do grupo, incluindo eventos
        return {
            groupId: this.groupId,
            name: this.name,
            description: this.description,
            events: this.events
        };
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
    createGroup: (name, description, userName) => {
        const IdUser = getUserId(userName);
        for(const group of groupsMap.values()){
            if(group.name == name && group.IdUser == IdUser){
                //significa que o memso user está a tentar criar dois grupos com nomes iguais
                return null
            }
        }
        // Generate a unique ID 
        const GroupId = crypto.randomUUID();
        //create a new group and add it to the map
        const newGroup = new Group(GroupId, name, description, IdUser);
        groupsMap.set(GroupId, newGroup);
        return newGroup;
    },
    allGroups: (user) => {
        // Return an array of all groups associated to the user
        return [...groupsMap.values()]
        /*const array = []
        for(const group of groupsMap.values()){
            if(group.IdUser === user.userId){
                array.push(group)
            }
        }
        return array*/
    },
    getGroup: (groupId) => {
        for(const group of groupsMap.values()){
            if(group.groupId === groupId){
                return group
            }
        }
        return null
    },
    createUser(userName){
        for(const username of usersMap.values()){
            if(username == userName){
                return null
            }
        }
        // Generate a unique ID 
        const userId = crypto.randomUUID();
        //create a new user and set it in the map
        const newUser = new User(userId, userName)
        usersMap.set(userId, userName);
        return newUser
    },
    editGroup(userName, groupName, newGroupName, newDescription){
        const user_Id = getUserId(userName);
        const groupId = getGroupId(groupName, user_Id);
        if(newGroupName != null){
            for(const group of groupsMap.values()){
                if(group.groupId === groupId){
                    group.name = newGroupName
                }
            }
        }
        if(newDescription != null){
            for(const group of groupsMap.values()){
                if(group.groupId === groupId){
                    group.description = newDescription
                }
            }
        }
    }
};
function getUserId(userName){
    for(const [id, name] of usersMap.entries()){
        if(name === userName){
            return id
        }
    }
    return null
}

function getGroupId(groupName, user_Id){ 
    for(const [id, group] of groupsMap.entries()){
        if(group.name === groupName && group.IdUser === user_Id){
            return id
        }
    }
    return null
}

function isValidName(userName){
    for(const name of usersMap.values()){
        if(name === userName){
            return true
        }
    }
    return false
}

function isValidGroup(groupName){
    for(const group of groupsMap.values()){
        if(group.name === groupName){
            return true
        }
    }
    return false
}

//export default secaDataMem;
export { User, usersMap, groupsMap, secaDataMem, isValidName, isValidGroup };

function main(){ //teste
    //createUserTest()
    //createGroupTest()
    //getGroupTest()
    //allGroupsTest()
}
main()

function createUserTest(){
    secaDataMem.createUser('user1');
    secaDataMem.createUser('user1');
    secaDataMem.createUser('user2');
    console.log(usersMap);
}

function createGroupTest(){
    const user1 = secaDataMem.createUser('user1');
    const user2 = secaDataMem.createUser('user2');
    secaDataMem.createGroup('group1', 'fav musics', user1);
    secaDataMem.createGroup('group1', 'fav musics', user1);
    secaDataMem.createGroup('group1', 'fav musics', user2);

    console.log(groupsMap);
}

function getGroupTest(){
    secaDataMem.createUser('user1');

    console.log(secaDataMem.getGroup('group1'));
    console.log(secaDataMem.getGroup('non-exist-group'));
}

function allGroupsTest(){
    const user1 = secaDataMem.createUser('user1');
    const user2 = secaDataMem.createUser('user2');
    secaDataMem.createGroup('group1', 'fav musics', user1);
    secaDataMem.createGroup('group2', 'fav musics', user1);
    secaDataMem.createGroup('group3', 'fav musics', user1);
    secaDataMem.createGroup('group1', 'fav musics', user2);

    console.log(secaDataMem.allGroups())
}