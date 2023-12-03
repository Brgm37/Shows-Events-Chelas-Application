import { expect } from 'chai';
import secaServices from '../seca-services.mjs';
import * as secaDataMem from '../seca-data-mem.mjs';
import { groupsMap, usersMap } from '../seca-data-mem.mjs';
import crypto from 'crypto';

describe('postUser', () => {
  it('should create a new user successfully', async () => {
    const req = { query: { userName: 'newUser' } };
    const res = {
      status: (code) => ({ json: (data) => ({ code, data }) }),
    };

    const result = await secaServices.postUser(req, res);

    expect(result.code).to.equal(201);
    expect(result.data.msg).to.equal('user created successfully');
    expect(result.data.user).to.equal('newUser');
    usersMap.clear()
  });

  it('should handle user already exists', async () => {
    // Implement a scenario where the user already exists in secaDataMem
    const req = { query: { userName: 'existingUser' } };
    const res = {
      status: (code) => ({ json: (data) => ({ code, data }) }),
    };

    usersMap.set('someUserId', req.query.userName)
    const result = await secaServices.postUser(req, res);

    expect(result.code).to.equal(409);
    expect(result.data.error).to.equal('userName already exists');
    usersMap.clear()
  });
});

describe('postGroup', () => {
    it('should create a new group successfully', async () => {
      const req = { query: { name: 'group1', description: 'favourites', IdUser: '27102003'} };
      const res = {
        status: (code) => ({ json: (data) => ({ code, data }) }),
      };
      
      const originalRandomUUID = crypto.randomUUID;
      crypto.randomUUID = () => 'groupId';

      usersMap.set(req.query.IdUser, "someUser");
      const result = await secaServices.postGroup(req, res);

      expect(result.code).to.equal(201);
      expect(result.data.message).to.equal('Group created successfully.');
      expect(result.data.groupId).to.equal('groupId');
      expect(result.data.userId).to.equal(req.query.IdUser);
      usersMap.clear();
      crypto.randomUUID = originalRandomUUID;
    });
  
    it('should handle missing parameters (non-token)', async () => {
        const req = { query: {IdUser: 'non-exist-token'} };
        const res = {
          status: (code) => ({ json: (data) => ({ code, data }) }),
        };
    
        const result = await secaServices.postGroup(req, res);
    
        expect(result.code).to.equal(403);
        expect(result.data.msg).to.equal('unreconized token');
    });
    it('should handle missing parameters (exist-token)', async () => {
      const req = { query: { IdUser:'some-token'} };
      const res = {
        status: (code) => ({ json: (data) => ({ code, data }) }),
      };
      usersMap.set(req.query.IdUser, 'someUser');
      const result = await secaServices.postGroup(req, res);
  
      expect(result.code).to.equal(400);
      expect(result.data.error).to.equal('Name parameter and description are required');
      usersMap.clear();
    });
});

describe('getGroup', () => {
    it('should retrieve group details successfully', async () => {
      const req = { query: { token: '27102003', groupId: 'some group id'} };
      const res = {
        status: (code) => ({ json: (data) => ({ code, data }) }),
      };

      usersMap.set(req.query.token, 'someUser');
      const group = new secaDataMem.Group('name', 'description', req.query.token);
      groupsMap.set(req.query.groupId, group);

      const result = await secaServices.getGroup(req, res);
  
      expect(result.code).to.equal(200);
      expect(result.data).to.equal(group);
      groupsMap.clear();
      usersMap.clear();
    });
  
    it('should handle missing group name parameters', async () => {
        const req = { query: {} };
        const res = {
          status: (code) => ({ json: (data) => ({ code, data }) }),
        };
        usersMap.set(req.query.token, 'someUser');
        const result = await secaServices.getGroup(req, res);
    
        expect(result.code).to.equal(400);
        expect(result.data.error).to.equal('GroupId parameter is required for group search');
        usersMap.clear();
      });
});

describe('getGroups', () => {
    it('should retrieve all the groups successfully', async () => {
        const req = { query:{ token: '290404' }};
        const res = {
        status: (code) => ({ json: (data) => ({ code, data }) }),
      };
      
      usersMap.set(req.query.token, 'MariaLuzPedro');
      const group1 = new secaDataMem.Group('group1', 'desTest', req.query.token);
      groupsMap.set('group1Id', group1);
      const result = await secaServices.getGroups(req, res);
  
      expect(result.code).to.equal(200);
      expect(result.data).to.be.an('array');            //é um mapa
      usersMap.clear();
      groupsMap.clear();
    });
});

describe('searchEvents', () => {
    it('should retrieve an array with events with this name successfully', async () => {
        const req = { query: {
           eventName: 'bad bunny',
           s: null,
           p: null } };
        const res = {
        status: (code) => ({ json: (data) => ({ code, data }) }),
      };
      const result = await secaServices.searchEvents(req, res);
  
      expect(result.code).to.equal(200);
      result.data.forEach(element => {
        expect(element.name.toUpperCase()).contains(req.query.eventName.toUpperCase())}); //.to.equal(req.query.eventName);})
        
    });
    it('should handle missing event name parameter', async () => {
        // Simula uma requisição sem um nome de evento
        const req = { query: {} };
        const res = {
          status: (code) => ({ json: (data) => ({ code, data }) }),
        };
    
        const result = await secaServices.searchEvents(req, res);
    
        expect(result.code).to.equal(400);
        expect(result.data.error).to.equal('eventName parameter is required for event search');
      });
});

describe('getPopularEvents', () => {
    it('should retrieve popular events successfully', async () => {
      const req = { query: { s: 10, p: 2 } };
  
      // Crie um objeto res simulado
      const res = {
        status: (code) => ({ json: (data) => ({ code, data }) }),
      };
  
      const result = await secaServices.getPopularEvents(req, res);
    
        expect(result.code).to.equal(200);
        expect(result.data.msg).to.be.an('array');
        expect(result.data.msg[0]).to.be.an('object');
    });
});