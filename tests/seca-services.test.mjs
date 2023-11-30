import { expect } from 'chai';
import secaServices1 from '../seca-services.mjs';
import { usersMap, groupsMap, secaDataMem } from '../seca-data-mem.mjs';

describe('postUser', () => {
  it('should create a new user successfully', async () => {
    const req = { params: { userName: 'newUser' } };
    const res = {
      status: (code) => ({ json: (data) => ({ code, data }) }),
    };

    const result = await secaServices1.postUser(req, res);

    expect(result.code).to.equal(201);
    expect(result.data.message).to.equal('user created successfully');
    expect(result.data.user).to.equal('newUser');
    usersMap.clear()
  });

  it('should handle user already exists', async () => {
    // Implement a scenario where the user already exists in secaDataMem
    const req = { params: { userName: 'existingUser' } };
    const res = {
      status: (code) => ({ json: (data) => ({ code, data }) }),
    };

    usersMap.set('someUserId', req.params.userName)
    const result = await secaServices1.postUser(req, res);

    expect(result.code).to.equal(409);
    expect(result.data.error).to.equal('user already exists');
    expect(result.data.user).to.equal('existingUser');
    usersMap.clear()
  });
});

describe('postGroup', () => {
    it('should create a new group successfully', async () => {
      const req = { body: { name: 'group1', description: 'favourites', IdUser: '27102003'} };
      const res = {
        status: (code) => ({ json: (data) => ({ code, data }) }),
      };
  
      const result = await secaServices1.postGroup(req, res);

      expect(result.code).to.equal(201);
      expect(result.data.message).to.equal('Group created successfully.');
      expect(result.data.group.name).to.equal('group1');
      expect(result.data.group.description).to.equal('favourites');
      expect(result.data.group.IdUser).to.equal('27102003');
    });
  
    it('should handle missing parameters', async () => {
        const req = { body: {} };
        const res = {
          status: (code) => ({ json: (data) => ({ code, data }) }),
        };
    
        const result = await secaServices1.postGroup(req, res);
    
        expect(result.code).to.equal(400);
        expect(result.data.error).to.equal('Name parameter and description are required');
      });
});

describe('getGroup', () => {
    it('should retrieve group details successfully', async () => {
      const req = { params: { groupId: '27102003'} };
      const res = {
        status: (code) => ({ json: (data) => ({ code, data }) }),
      };
      const group = {
        groupId: req.params.groupId,
        name: 'group',
        description: 'testing',
        IdUser: 'some-ID',
        events: []
      }
      groupsMap.set(req.params.groupId, group)
      const result = await secaServices1.getGroup(req, res);
  
      expect(result.code).to.equal(200);
      expect(result.data.groupId).to.equal(req.params.groupId);
      groupsMap.delete(req.params.groupId);
    });
  
    it('should handle missing group name parameters', async () => {
        const req = { params: {} };
        const res = {
          status: (code) => ({ json: (data) => ({ code, data }) }),
        };
    
        const result = await secaServices1.getGroup(req, res);
    
        expect(result.code).to.equal(400);
        expect(result.data.error).to.equal('Name parameter is required for group search');
      });
});

describe('getGroups', () => {
    it('should retrieve all the groups successfully', async () => {
        const req = {};
        const res = {
        status: (code) => ({ json: (data) => ({ code, data }) }),
      };
  
      const result = await secaServices1.getGroups(req, res);
  
      expect(result.code).to.equal(200);
      expect(result.data).to.be.an('array');            //é um mapa
    });
});

describe('searchEvents', () => {
    it('should retrieve an array with events with this name successfully', async () => {
        const req = { query: {
           eventName: 'U2:UV Achtung Baby Live At Sphere - General Admission Floor',
           s: null,
           p: null } };
        const res = {
        status: (code) => ({ json: (data) => ({ code, data }) }),
      };
      const result = await secaServices1.searchEvents(req, res);
  
      expect(result.code).to.equal(200);
      result.data.forEach(element => {
        expect(element.name).to.equal(req.query.eventName);})
        
    });
    it('should handle missing event name parameter', async () => {
        // Simula uma requisição sem um nome de evento
        const req = { query: {} };
        const res = {
          status: (code) => ({ json: (data) => ({ code, data }) }),
        };
    
        const result = await secaServices1.searchEvents(req, res);
    
        expect(result.code).to.equal(400);
        expect(result.data.error).to.equal('Name parameter is required for event search');
      });
});

describe('getPopularEvents', () => {
    it('should retrieve popular events successfully', async () => {
      const req = { query: { s: 10, p: 2 } };
  
      // Crie um objeto res simulado
      const res = {
        status: (code) => ({ json: (data) => ({ code, data }) }),
      };
  
      const result = await secaServices1.getPopularEvents(req, res);
    
        expect(result.code).to.equal(200);
        expect(result.data).to.be.an('array');
        expect(result.data[0]).to.be.an('object');
    });
});