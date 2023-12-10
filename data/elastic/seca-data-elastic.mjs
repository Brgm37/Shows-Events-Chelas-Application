
import uriManager from './uri-manager.mjs';
const { Client } = require('@elastic/elasticsearch');
const esClient = new Client({ node: 'http://localhost:9200'});

async function search(index, query){
    try{
        const response = await esClient.search({
            index: index,
            q: query,
        });
        console.log('Search results:', response.hits.hits);
        return response.hits.hits
    } catch(error){
        console.error('Error searching documents:', error);
        throw error;
    }
}

async function indexDocument(index, doc){
    try{
        const response = await esClient.index({
            index: index,
            body: doc,
        });
        console.log('Document indexed:', response);
    }catch(error){
        console.error('Error adding document:', error);
        throw error;
    }
}


await esClient.deleteByQuery({
    index: 'Groups',
    body: {
        query: {
            bool: {
                must: [
                    { term: { userId: userId } },
                    { term: { groupId: groupId } },
                ],
            },
        },
    },
});

async function deleteDocumentByQuery(index, token, groupId){
    try{
        const groupAndUser = {
            IdGroup: groupId,
            IdUser: token,
        };
        const query = JSON.parse(groupAndUser);
        const response = await esClient.deleteByQuery({
            index: index,
            body: {
                query: {
                    match: query,
                },
            },
        });
        return response;
    }catch(error){
        console.error('Error deleting documents by query:', error);
        throw error;
    }
}

async function createIndex(index, body){
    try {
        await esClient.indices.create({
          index: index,
          body: body
        });
        console.log('Index created successfully');
      } catch (error) {
        console.error('Error creating index:', error);
      }
}


export default function (indexName = 'seca'){

    const URI_MANAGER = uriManager(indexName)

    return {
        getGroups,
        getGroup,
        updateGroup,
        insertGroup,
        deleteGroup
    }

    async function getGroups(userId){
        const user = {
            userId: userId
        }
        const query = JSON.stringify(user)
        return await search('Groups', query);
    }
    
    async function getGroup(userId, groupId){
        const userAndGroup = {
            IdUser: userId,
            Idgroup: groupId,
        };
        const query = JSON.stringify(userAndGroup);
        return await search('Groups', query);
    }

    async function isValidToken(userId){
        const user = {
            token: userId
        };
        const query = JSON.stringify(user);
        const response = await search('Users', query);
        return response.length == 1;
    }

    async function addGroup(name, description, IdUser){
        const group = {
            name: name,
            description: description,
            IdUser: IdUser
        };
        const body = JSON.stringify(group);
        return await indexDocument('Groups', body);
    }

    async function addUser(userName, IdUser){
        const user = {
            userName: userName,
            IdUser: IdUser
        };
        const body = JSON.stringify(user);
        return await indexDocument('Users', body);
    }
    
    async function deleteGroup(groupId){
       return await deleteDocumentByQuery('Group', groupId)
    }

    async function deleteUser(IdUser){
        
    }
}