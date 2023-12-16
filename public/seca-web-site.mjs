//seca-web-site.mjs
/* import express from 'express';
import crypto from 'crypto';
import secaServices from './seca-services.mjs';
import { groups, users} from './seca-server.mjs'; */

import errors from "../common/errors.mjs";

export default function(secaServices){
  if(!secaServices){
    throw errors.INVALID_ARGUMENT("secaServices");
  }
  return {
    makeHomePage,
  }

  async function makeHomePage(req, res){
    try{
      res.render('home');
    }catch(error){
      res.render('error', {code: errors.INTERNAL_SERVER_ERROR, description:'Internal Server Error'});
    }
  }
}

export const secaWeb = {
    async _getHome(req, res){
      res.render('home');
    }
}

/* 
const secaSite = {

  async homePage(req, res){
    try{
      res.render('home', {title: 'home', style: 'home.css'});
    }catch(error){
      console.error(error);
    }
  },

  async signIn(req, res){
    try{
      const userName = req.query.userName;
      const password = req.query.password;

      const userLogged = await secaServices().signIn(userName, password);

    }catch(erro){

    }
  }

  /* async logIn(req, res){
    try{
      const userName = req.query.userName;
      const password = req.query.password;

      const userLogged = await secaServices().logIn(userName, password);

      if(!userLogged){
        return res.redirect('/home');
      }else{
        const groups = await secaServices().allGroups(userLogged.token);
        console.log(groups);
        //return res.redirect(`/allGroups/${userLogged.token}/${groups}`)
        return res.render('allGroups', { groups: groups, token: userLogged.token, style: 'allGroups.css'});
    }
    }catch(error){
      console.log(error)
    }
}, */

  /* async searchEventsName(req, res){
    try{
        const eventName = req.params.eventName;          //extrai o parâmetro eventName do URL passado em req
        const s = req.params.s || 30;
        const p = req.params.p || 1;
        if (!eventName){
            return res.status(400).json({error: 'eventName parameter is required for event search'});
        }else{
            const popularEventData = await tmEventsData.fetchEventByName(eventName, s, p);        //string .json com a response
            return res.render('addEvent', {events: popularEventData, style: 'addEvent.css'});                                  //retorna uma resposta com o código 200, e com a string .json ao cliente
        }
   }catch(error){
    console.error('Error fetching popular events:', error);
    return res.status(404).json({error : error});
   }
},

  async getPopularEvents(req, res){
    try{
     const s = req.query.s || 30;
     const p = req.query.p || 1;
     let popularEventData = await tmEventsData.fetchPopularEvent(s, p);   
     return res.render('addEvent', {events: popularEventData})               
    }catch(error){
     console.error('Error fetching popular events:', error);
     return res.redirect('/addEvent')
    }
 },
  async renderDetails(req, res){
    try{
      const groupPassed = await secaServices().getGroup(req.params.groupId, req.params.token);
  res.render('details', { group: groupPassed, token: req.params.token, style: 'details.css'});
  }catch(erro){
      console.log(erro)
  }
  },
  async getAllGroups(req, res){

  },
  async logIn(req, res){
      try{
        const userName = req.query.userName;
        const password = req.query.password;

        const userLogged = await secaServices().logIn(userName, password);

        if(!userLogged){
          return res.redirect('/home');
        }else{
          const groups = await secaServices().allGroups(userLogged.token);
          console.log(groups);
          //return res.redirect(`/allGroups/${userLogged.token}/${groups}`)
          return res.render('allGroups', { groups: groups, token: userLogged.token, style: 'allGroups.css'});
      }
      }catch(error){
        console.log(error)
      }
  },
  async signIn(req, res){
    const userName = req.body.userName;
    const password = req.body.password;

    const userSigned = await secaServices().signIn(userName, password);

    if(!userSigned){
      return res.redirect('/home');
    }else{
      return res.redirect(`/allGroups/${userSigned.token}`)
    }
    
  },
  async getGroup(req, res){
  },
  async insertGroup(req, res){
    try{
      await secaServices().createGroup(req.body.name, req.body.description, req.params.token);
      const groups = await secaServices().allGroups(req.params.token);
      return res.render('allGroups', { groups: groups, token: req.params.token, style: 'allGroups.css'});
    }catch(erro){
      console.log(erro);
    }
  },
  async updateGroupForm(req, res){

  },
  async updateGroup(req, res){
    const newGroup = {
      name: req.body.name,
      description: req.body.description
    }

    secaServices().editGroup()
    res.redirect("site/home")
  },
  async deleteGroup(req, res){
    try{
      const groupId = req.params.groupId
      const token = req.params.token
      await secaServices().deleteGroup(groupId, token);
      const groups = await secaServices().allGroups(token);
      res.render('allGroups', { groups: groups, token: req.params.token, style: 'allGroups.css'});
    }catch(erro){
      console.log(erro)
    }
  },
  async addEvent(req, res){
    const eventId = req.params.eventId;
    const groupId = req.params.groupId;
    const token = req.params.token

    const event = {
      id: req.body.eventId, 
      name: req.body.eventName,
      image: req.body.image,
      sales: req.body.eventSales,
      date: req.body.eventDate,
      genre: req.body.eventGenre,
      subGenre: req.body.eventSubGenre,
    }

    for(const user of users){
        if(user.token == token){
            for(const group of user.groups){
                if(group.groupId == groupId){
                    group.push(event)
                }
            }
        }
    }
    
  } 
}

export default secaSite 
*/