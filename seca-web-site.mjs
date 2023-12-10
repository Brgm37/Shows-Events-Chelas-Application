//seca-web-site.mjs
import express, { response } from 'express';
import * as secaServices from './seca-services.mjs';

const secaSite = {
  async getAllGroups(req, res){

  },
  async getGroup(req, res){
  },
  async insertGroup(req, res){
    const newGroup = {
      name: req.body.name,
      description: req.body.description
    }
    await secaServices.default.createGroup(req.body.name, req.body.description, req.body.IdUser);
    res.redirect()
  },
  async updateGroupForm(req, res){

  },
  async updateGroup(req, res){
    const newGroup = {
      name: req.body.name,
      description: req.body.description
    }

    secaServices.default.editGroup()
    res.redirect("site/home")
  },
  async deleteGroup(req, res){

  }
}

export default secaSite