import {get, post, del, put} from './fetch-wrapper.mjs';
import uriManager from './uri-manager.mjs';

export default function (indexName){
    const URI_MANAGER = uriManager(indexName)

    return {
        getGroups,
        getGroup,
        updateGroup,
        insertGroup,
        insertUser,
        deleteGroup,
        isValid,
        isValidToken
    }

    async function isValidToken(userId){
        return get(URI_MANAGER.get(userId)).then(body => body.found)
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
        return post(URI_MANAGER.create(), newUser).then(body => { return body._id});
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
        if (usert.length === 0){
            return undefined;
        }else{
            return usert[0]._id; 
        }
    });
    }

    function createGroupFromElastic(groupElastic){
        return Object.assign(groupElastic._source, {groupId: groupElastic._id},);
    }

}