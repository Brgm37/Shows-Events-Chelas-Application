import CODE from './common/code.mjs';
import errors from './common/errors.mjs';

function readErrorCode(code){
    return (code != undefined) ? code : ERROR_CODES.INTERNAL_SERVER_ERROR;
}

function readErrorDesc(erro){
    return (erro.description != undefined) ? erro.description : "Internal Server Error";
}


export default function(secaServices){
    if(!secaServices){
        throw errors.INVALID_ARGUMENT("secaServices");
    }

    return{
        getPopularEvents,
        searchEvents,
        getGroups,
        getGroup,
        postGroup,
        postUser,
        editGroup,
        deleteGroup,
        deleteEvent
    }

    async function getPopularEvents(req, res){
        try{
            const s = req.query.s || 30;
            const p = req.query.p || 1;
            let popularEventData = await secaServices.fetchPopularEvents(s, p);
            return res.status(CODE.SUCCESS).json({msg : popularEventData});
           }catch(error){
            console.error('Error fetching popular events:', error);
            return res.status(readErrorCode(error.code)).json({error : readErrorDesc(error)});
           }
    }

    async function searchEvents(req, res){
        try{
            const eventName = req.query.eventName;          //extrai o parâmetro eventName do URL passado em req
            const s = req.query.s || 30;
            const p = req.query.p || 1;
            if (!eventName){
                return res.status(ERROR_CODES.INVALID_ARGUMENT).json({error: 'eventName parameter is required for event search'});
            }else{
                const popularEventData = await secaServices.fetchEventByName(eventName, s, p);        //string .json com a response
                return res.status(CODE.SUCCESS).json(popularEventData);                                  //retorna uma resposta com o código 200, e com a string .json ao cliente
            }
       }catch(error){
        console.error('Error fetching events by name:', error);
        return res.status(readErrorCode(error.code)).json({error : readErrorDesc(error)});
       }
    }

    async function getGroups(req, res){
        try{
            const userId = req.query.userId
            if (!await secaServices.isValidToken(userId)){
                const error = UNAUTORIZED(userId);
                return res.status(error.code).json({error: error.description});
            }
            const allGroups =  await secaServices.allGroups(userId);        //map with all groups
            return res.status(CODE.SUCCESS).json(allGroups);
        }catch(error){
            console.error('Error getting the groups:', error);
            return res.status(readErrorCode(error.code)).json({error : readErrorDesc(error)});
        }
    }

    async function getGroup(req, res){
        try{
            const userId = req.query.userId
            if (!await secaServices.isValidToken(userId)){
                const error = UNAUTORIZED(userId);
                return res.status(error.code).json({error: error.description});
            }
            const groupId = req.query.groupId;               //extrai o parâmetro groupId do URL passado em req
            if (!groupId){
                return res.status(ERROR_CODES.MISSING_PARAMETER).json({error: 'GroupId parameter is required for group search'});
            }else{
                const group = await secaServices.getGroup(groupId, userId);
                return res.status(CODE.SUCCESS).json({msg: group});
            }
        }catch(error){
            console.error('Error getting the group:', error);
            return res.status(readErrorCode(error.code)).json({error : readErrorDesc(error)});
        }
    }

    async function postGroup(req, res){
        try{
            const userId = req.query.userId;
            if (!await secaServices.isValidToken(userId)){
                const error = UNAUTORIZED(userId);
                return res.status(error.code).json({error: error.description});
            }
            const name = req.query.name;
            const description = req.query.description;
            if (!name || !description){
                return res.status(ERROR_CODES.INVALID_ARGUMENT).json({error:'Name parameter and description are required'});
            }
            const postGroup = await secaServices.createGroup(name, description, userId);
            return res.status(CODE.CREATED).json({ message:'Group created successfully.', group: postGroup });
        }catch(error){
            console.error('Error processing the post request', error);
            return res.status(readErrorCode(error.code)).json({error : readErrorDesc(error)});
        }
    }

    async function postUser(req, res){
        try{
            const userName = req.query.userName;
            if (userName == null)
                return res.status(ERROR_CODES.INVALID_ARGUMENT).json({error: 'userName parameter is required'});
            const newUser = await secaServices.createUser(userName);
            return res.status(CODE.CREATED).json({msg: 'user created successfully', user: newUser});
        }catch(error){
            console.error('Error processing the post request', error);
            return res.status(readErrorCode(error.code)).json({error : readErrorDesc(error)});
        }
    }

    async function editGroup(req, res){
        try{
            
            const userId = req.query.userId;
            if (!await secaServices.isValidToken(userId)){
                const error = UNAUTORIZED(userId);
                return res.status(error.code).json({error: error.description});
            }

            const groupId = req.query.groupId;
            const newGroupName = req.query.newGroupName || null;
            const newDescription = req.query.newDescription || null;
            const newEventId = req.query.eventId || null;

            if(groupId == null){
                return res.status(ERROR_CODES.INVALID_ARGUMENT).json({error:'groupId missing'});
            }
            let change = null;
            if (newGroupName != null || newDescription != null)
                change = await secaServices.editGroup(groupId, newGroupName, newDescription, userId);
            if (newEventId != null)
                change = await secaServices.addEvent(groupId, userId, newEventId);
            if (change != null)
                return res.status(CODE.SUCCESS).json(change);
            else
                return res.status(CODE.NOT_MODIFIED);
 
        }catch(error){
            console.error('Error processing the post request', error);
            return res.status(readErrorCode(error.code)).json({error : readErrorDesc(error)});
        }
    }

    async function deleteGroup(req, res){
        try{
            const userId = req.query.userId;
            if(!await secaServices.isValidToken(userId)){
                const error = UNAUTORIZED(userId);
                return res.status(error.code).json({error: error.description});
            }
            const groupId = req.query.groupId;
            if(groupId == null){
                return res.status(ERROR_CODES.INVALID_ARGUMENT).json({error:'groupId missing'});
            }
            const response = await secaServices.deleteGroup(groupId, userId);
            return res.status(CODE.SUCCESS).json(response);
            }catch(error){
            console.error('Error processing the post request', error);
            return res.status(readErrorCode(error.code)).json({error : readErrorDesc(error)});
        }
    }

    async function deleteEvent(req, res){
        try{
            const userId = req.query.userId;
            if(!await secaServices.isValidToken(userId)){
                const error = UNAUTORIZED(userId);
                return res.status(error.code).json({error: error.description});
            }
            const groupId = req.query.groupId;
            const eventId = req.query.eventId;
            if (groupId == null || eventId == null)
                return res.status(ERROR_CODES.INVALID_ARGUMENT).json({error : `groupId : ${groupId} and eventId : ${eventId} should be especified`});
            const response = await secaServices.deleteEvent(groupId, eventId, userId);
            return res.status(CODE.SUCCESS).json(response);
        }catch(error){
            console.error('Error processing the post request', error);
            return res.status(readErrorCode(error.code)).json({error : readErrorDesc(error)});
        }
    }

}

