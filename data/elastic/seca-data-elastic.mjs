import {get, post, del, put} from './fetch-wrapper.mjs';
import uriManager from './uri-manager.mjs';

const INDEX_GROUPS = 'groups';
//const INDEX_USERS = 'users';

export default function (indexName = INDEX_GROUPS){
    const URI_MANAGER = uriManager(indexName)

    return {
        getGroups,
        getGroup,
        updateGroup,
        insertGroup,
        insertUser,
        deleteGroup,
        isValid
    }

    async function getGroups(userId){
        const query = {
            query: {
                match: {
                    "userId": userId
                }
            }
        };
        return post(URI_MANAGER.getAll(), query).then(body => body.hits.hits.map(createGroupFromElastic));
    }

    async function getGroup(groupId){
        return get(URI_MANAGER.get(groupId)).then(createGroupFromElastic);
    }

    async function updateGroup(groupUpdate){
        return put(URI_MANAGER.update(groupUpdate.groupId), groupUpdate);
    }

    async function insertGroup(newGroup){
        return post(URI_MANAGER.create(), newGroup).then(body => {newGroup.groupId = body._id; return newGroup});
    }

    async function insertUser(newUser){
        return post(URI_MANAGER.create(), newUser).then(body => {newUser.token = body._id; return newUser});
    }

    async function deleteGroup(groupId){
        return del(URI_MANAGER.delete(groupId)).then(body => body._id);
    }

    async function isValid(userName, password){
        let user = {
            userName: userName,
            password: password
        }
        const query ={
            query:{
                bool: {
                    must:[
                        {
                            match:{
                                "userName":userName
                            }
                        },
                        {
                            match:{
                                "password":password
                            }
                        }

                    ]
                }
            }
        };
       return post(URI_MANAGER.getAll(), query).then(body => {
        const usert = body.hits.hits;
        if (usert.length == 0){
            user.token = undefined;
            return user;
        }else{
        user.token = usert[0]._id; 
        return user;
        }
    });
    }

    function createGroupFromElastic(groupElastic){
        return Object.assign(groupElastic._source, {groupId: groupElastic._id},);
    }

}