import errors from "../common/errors.mjs";
import url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
export default function(secaServices){
  if(!secaServices){
    throw errors.INVALID_ARGUMENT("secaServices");
  }
  return {
    makeHomePage,
    singIn,
    allGroups,
    signUp,
    createGroup,
    showDetails,
    updateGroup,
    deleteGroup,
    showEvents,
    addEvent,
    deleteEvent,
    dummy,
    showEventsWithOutUser,
    showCss,
    verifyAuthenticated,
    signOut
  }

  async function signOut(req, res){
    req.logout((err) => res.redirect('/site/home'));
  }

  async function verifyAuthenticated(req, res, next){
      if(req.user)
        return next();
      else
        res.redirect('/site/home');
  }
  async function dummy(req, res){
    try{
      const id = secaServices.dummy();
      res.status(200).json(id);
    }catch(error){
      console.log(error)
      res.status(500).json(error)
    }
  }

  async function makeHomePage(req, res){
    try{
      res.render('home');
    }catch(error){
      res.render('error', {code: errors.INTERNAL_SERVER_ERROR(error).code, description:'Internal Server Error'});
    }
  }
  async function singIn(req, res){
    try{
      const userName = req.body.userName;
      const password = req.body.password;
      const userId = await secaServices.isValid(userName, password);
      if(userId){
        req.login(userId, () => res.redirect(`/site/auth/home`));
        // res.redirect(`/site/allGroups?userId=${userId}`);
      }else{
        res.redirect('/site/home');
      }
    }catch(error){
      res.render('error', {code: error.code, description: error.description});
    }
  }

  async function showCss(req, res){
      const filePath = __dirname + 'style.css';
      res.sendFile(filePath);
  }

  async function allGroups(req, res){
    try{
      const userId = req.user;
      const groups = await secaServices.allGroups(userId);
      res.render('allGroups', {groups: groups, userId: userId});
    }catch(error){
      res.render('error', {code: error.code, description: error.description});
    }
  }

  async function signUp(req, res){
    try{
      const newUserName = req.body.userName;
      const newPassword = req.body.password;
      const userId = await secaServices.isValid(newUserName, newPassword);
      if(userId){
        res.redirect('/site/home');
      }else{
        const newUserId = await secaServices.createUser(newUserName, newPassword);
        req.login(newUserId, () => res.redirect(`/site/auth/home`));
        // res.redirect(`/site/allGroups?userId=${newUserId}`);
      }
    }catch(error){
      console.log(error);
      res.render('error', {code: error.code, description: error.description});
    }
  }

  async function createGroup(req, res){
    try{
      const userId = req.user;
      const name = req.body.name;
      const description = req.body.description;
      await secaServices.createGroup(name, description, userId);
      res.redirect(`/site/auth/home`);
    }catch(error){
      console.log(error);
      res.render('error', {code: error.code, description: error.description});
    }
  }

  async function showDetails(req, res){
    try{
      const groupId = req.query.groupId;
      const userId = req.user;
      const group = await secaServices.getGroup(groupId, userId);
      res.render('details', {group: group, userId: userId})
    }catch(error){
      res.render('error', {code: error.code, description: error.description});
    }
  }

  async function updateGroup(req, res){
    try{
      const userId = req.user;
      const groupId = req.body.groupId;
      const name = req.body.groupName;
      const description = req.body.groupDescription;
      await secaServices.editGroup(groupId, name, description, userId);
      res.redirect(`/site/auth/home/showDetails?groupId=${groupId}`);
    }catch(error){
      res.render('error', {code: error.code, description: error.description});
    }
  }
  
  async function deleteGroup(req, res){
    try{
      const userId = req.user;
      const groupId = req.body.groupId;
      await secaServices.deleteGroup(groupId, userId);
      res.redirect('/site/auth/home')
    }catch(error){
      res.render('error', {code: error.code, description: error.description});
    }
  }

  async function showEvents(req, res){
    try{
      const userId = req.user;
      const groupId = req.query.groupId;
      const eventName = req.query.eventName;
      const p = req.query.p || 0;
      let events;
      if(!eventName)
        events = await secaServices.fetchPopularEvents(30, p);
      else
        events = await secaServices.fetchEventByName(eventName, 30, p);
      res.render('addEvent', {groupId: groupId, userId: userId, events: events, p:p, eventName: eventName});
    }catch(error){
      res.render('error', {code: error.code, description: error.description});
    }
  }

  async function showEventsWithOutUser(req, res){
    try{
      const eventName = req.query.eventName;
      const p = req.query.p || 0;
      let events;
      if(!eventName)
        events = await secaServices.fetchPopularEvents(30, p);
      else
        events = await secaServices.fetchEventByName(eventName, 30, p);
      res.render('showEvent', {events: events, p:p, eventName: eventName});
    }catch(error){
      console.error(error);
      res.render('error', {code: error.code, description: error.description});
    }
  }

  async function addEvent(req, res){
    try{
      const userId = req.user;
      const groupId = req.body.groupId;
      const eventId = req.body.eventId;
      const p = req.body.p;
      const eventName = req.body.eventName;
      secaServices.addEvent(groupId, userId, eventId);
      res.redirect(`/site/auth/home/showEvents?groupId=${groupId}&p=${p}&eventName=${eventName}`);
    }catch(error){
      console.log(error);
      res.render('error', {code: error.code, description: error.description});
    }
  }

  async function deleteEvent(req, res){
    try{
      const userId = req.user;
      const groupId = req.body.groupId;
      const eventId = req.body.eventId;
      await secaServices.deleteEvent(groupId, eventId, userId);
      await res.redirect(`/site/auth/home/showDetails?groupId=${groupId}`);
    }catch(error){
      res.render('error', {code: error.code, description: error.description});
    }
  }
}
