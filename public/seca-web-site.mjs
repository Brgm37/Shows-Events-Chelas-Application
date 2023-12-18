//seca-web-site.mjs
/* import express from 'express';
import crypto from 'crypto';
import secaServices from './seca-services.mjs';
import { groups, users} from './seca-server.mjs'; */

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
    showEvent,
    addEvent,
    deleteEvent,
    dummy,
    showEvents,
    showCss,

  }

  async function dummy(req, res){
    try{
      const id = await secaServices.dummy();
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
      res.render('error', {code: errors.INTERNAL_SERVER_ERROR, description:'Internal Server Error'});
    }
  }

  async function singIn(req, res){
    try{
      const userName = req.query.userName;
      const password = req.query.password;
      const userId = await secaServices.isValid(userName, password);
      if(userId){
        res.redirect(`/site/allGroups?userId=${userId}`);
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
      const userId = req.query.userId;
      console.log(userId);
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
        res.redirect(`/site/allGroups?userId=${newUserId}`);
      }
    }catch(error){
      console.log(error);
      res.render('error', {code: error.code, description: error.description});
    }
  }

  async function createGroup(req, res){
    try{
      const userId = req.query.userId;
      const name = req.body.name;
      const description = req.body.description;
      await secaServices.createGroup(name, description, userId);
      res.redirect(`/site/allGroups?userId=${userId}`);
    }catch(error){
      console.log(error);
      res.render('error', {code: error.code, description: error.description});
    }
  }

  async function showDetails(req, res){
    try{
      const groupId = req.params.groupId;
      const userId = req.params.userId;
      const group = await secaServices.getGroup(groupId, userId);
      console.log(group);
      res.render('details', {group: group, userId: userId})
    }catch(error){
      res.render('error', {code: error.code, description: error.description});
    }
  }

  async function updateGroup(req, res){
    try{
      const userId = req.params.userId;
      const groupId = req.params.groupId;
      const name = req.body.groupName;
      const description = req.body.groupDescription;
      await secaServices.editGroup(groupId, name, description, userId);
      res.redirect(`/site/details/${userId}/${groupId}`);
    }catch(error){
      res.render('error', {code: error.code, description: error.description});
    }
  }
  
  async function deleteGroup(req, res){
    try{
      const userId = req.params.userId;
      const groupId = req.params.groupId;
      await secaServices.deleteGroup(groupId, userId);
      res.redirect(`/site/allGroups?userId=${userId}`)
    }catch(error){
      res.render('error', {code: error.code, description: error.description});
    }
  }

  async function showEvent(req, res){
    try{
      const userId = req.params.userId;
      const groupId = req.params.groupId;
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

  async function showEvents(req, res){
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
      console.log();
      const userId = req.params.userId;
      const groupId = req.params.groupId;
      const eventId = req.params.eventId;
      console.log(`userId: ${userId}`);
      console.log(`groupId: ${groupId}`);
      console.log(`eventId: ${eventId}`);
      await secaServices.addEvent(groupId, userId, eventId);
      res.redirect(`/site/events/${userId}/${groupId}`);
    }catch(error){
      console.log(error);
      res.render('error', {code: error.code, description: error.description});
    }
  }

  async function deleteEvent(req, res){
    try{
      const userId = req.params.userId;
      const groupId = req.params.groupId;
      const eventId = req.params.eventId;
      await secaServices.deleteEvent(groupId, eventId, userId);
      res.redirect(`/site/details/${userId}/${groupId}`);
    }catch(error){
      res.render('error', {code: error.code, description: error.description});
    }
  }
}
