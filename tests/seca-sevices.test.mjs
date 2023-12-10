import { expect } from 'chai';
import crypto from 'crypto';
//import { secaDataMem1.groupsMap } from '../seca-data-mem.mjs';
import * as secaServices from '../seca-services.mjs';
import { User, Group } from '../seca-services.mjs';
import { usersMap, groupsMap } from '../seca-data-mem.mjs';

describe('createGroup', () => {
  it('should create a new group successfully', () => {
    const name = 'Test Group';
    const description = 'Group for testing';
    const IdUser = 'someUserId';

    //Guarde o valor original da função randomUUID
    const originalRandomUUID = crypto.randomUUID;
    //Substitua a função randomUUID para retornar um valor fixo
    crypto.randomUUID = () => 'someGroupId';

    const groupExpected = new Group(name, description, IdUser);
    const result = secaServices.default.createGroup(name, description, IdUser);   //result recebe o ID do grupo criado
    
    expect(groupsMap.get(result)).to.deep.equal(groupExpected);

    // Restaure a função randomUUID original
    crypto.randomUUID = originalRandomUUID;
    groupsMap.clear();
  });
  it('should handle creating duplicate groups by the same user', () => {
    const name = 'Test Group';
    const description = 'Group for testing';
    const IdUser = 'someUserId';

    // Guarde o valor original da função randomUUID
    const originalRandomUUID = crypto.randomUUID;
    // Substitua a função randomUUID para retornar um valor fixo
    crypto.randomUUID = () => 'someGroupId';

    const group1 = new Group(name, description, IdUser);
    groupsMap.set('someGroupId', group1)

    const result = secaServices.default.createGroup(name, description, IdUser); //recebe null porque já existe um grupo igual

    expect(result).to.be.null;

    crypto.randomUUID = originalRandomUUID;
    groupsMap.clear();
  });
});

describe('allGroups', () => {
    it('should retrieve all groups associated to an user', () => {
      const name = 'Test Group';
      const description = 'Group for testing';
      const IdUser = 'someUserId';

      const group1 =new Group(name, description, IdUser);
      groupsMap.set("IDgroup1", group1);
      const group2 =new Group('name1', 'description1', IdUser);
      groupsMap.set("IDgroup2", group2);
      const group3 =new Group('name2', 'description2', 'OtherIdUser');
      groupsMap.set("IDgroup3", group3);

      const result = secaServices.default.allGroups(IdUser);   //array com todos os grupos associados a IdUser
      const arrayExpected = [groupsMap.get("IDgroup1"), groupsMap.get("IDgroup2")];

      expect(arrayExpected).to.deep.equal(result);
      groupsMap.clear();
    });
});

describe('getGroup', () => {
    it('should retrieve a specified group successfully', () => {
      const name = 'Test Group';
      const description = 'Group for testing';
      const IdUser = 'someUserId';
      const groupId = 'someGroupId';

      const groupExpected =new Group(name, description, IdUser);
      groupsMap.set(groupId, groupExpected);

      const result = secaServices.default.getGroup(groupId, IdUser);
  
      expect(groupExpected).to.deep.equal(result);
      groupsMap.clear();
    });
    it('should return null due incorrect token', () => {
      const name = 'groupName';
      const description = 'description';
      const IdUser = 'someIdUser';
      const groupId = 'someGroupId';
  
      const group =new Group(name, description, IdUser);
      groupsMap.set(groupId, group);
  
      const result = secaServices.default.getGroup(groupId, 'incorrectIdUser');
    
      expect(result).to.be.null;
      groupsMap.clear()
    });
    it('should return null due undefined group', () => {
      const name = 'groupName';
      const description = 'description';
      const IdUser = 'someIdUser';
      const groupId = 'someGroupId';
  
      const group =new Group(name, description, IdUser);
      groupsMap.set(groupId, group);
  
      const result = secaServices.default.getGroup("incorrectGroupId", IdUser);
    
      expect(result).to.be.null;
      groupsMap.clear()
    });
});

describe('createUser', () => {
    it('should create a user successfully', () => {
      const userName = 'userName1';
      const userId = 'someUserId';

      const newUserExpected = new User(userId, userName);

      const originalRandomUUID = crypto.randomUUID;
      crypto.randomUUID = () => userId;

      const result = secaServices.default.createUser(userName);
  
      expect(newUserExpected).to.deep.equal(result);
      crypto.randomUUID = originalRandomUUID;
      usersMap.clear();
    });
    it('should return null due userName already exists', () => {
        const userName = 'userName1';
        const userId = 'someUserId';
  
        const newUserExpected = new User(userId, userName);
        usersMap.set(userId, userName);
        
        const originalRandomUUID = crypto.randomUUID;
        crypto.randomUUID = () => userId;

        const result = secaServices.default.createUser(userName);
    
        expect(result).to.be.null;
        usersMap.clear();
        crypto.randomUUID = originalRandomUUID;
      });   
});

describe('editGroup', () => {
  it('should edit a group successfully', () => {
    const newGroupName = 'newGroupName';
    const newDescription = 'newDescription';
    const newEvent = 'newEvent';
    const userId = 'someUserId';
    const groupId = 'groupId';

    const oldGroup = new Group('oldName', 'oldDescription', userId);
    groupsMap.set(groupId, oldGroup);

    const result = secaServices.default.editGroup(groupId, newGroupName, newDescription, newEvent, userId);

    const newGroupExpected = new Group(newGroupName, newDescription, userId);
    newGroupExpected.addEvent(newEvent);

    expect(newGroupExpected).to.deep.equal(result);
    groupsMap.clear();
  });
  it('should return null due to incorrect Token', () => {
    const newGroupName = 'newGroupName';
    const newDescription = 'newDescription';
    const newEvent = 'newEvent';
    const userId = 'someUserId';
    const groupId = 'groupId';

    const oldGroup = new Group('oldName', 'oldDescription', userId);
    groupsMap.set(groupId, oldGroup);

    const result = secaServices.default.editGroup(groupId, newGroupName, newDescription, newEvent, 'incorrectToken');

    expect(result).to.be.null;
    groupsMap.clear();
  });
  it('should return null due to not exist group', () => {
    const newGroupName = 'newGroupName';
    const newDescription = 'newDescription';
    const newEvent = 'newEvent';
    const userId = 'someUserId';
    const groupId = 'groupId';

    const oldGroup = new Group('oldName', 'oldDescription', userId);
    //nao adicionamos ao groupsMap

    const result = secaServices.default.editGroup(groupId, newGroupName, newDescription, newEvent, userId);

    expect(result).to.be.null;
    groupsMap.clear();
  });
  it('should edit a group successfully (edit only the name)', () => {
    const newGroupName = 'newGroupName';
    const newDescription = 'newDescription';
    const newEvent = 'newEvent';
    const userId = 'someUserId';
    const groupId = 'groupId';

    const oldGroup = new Group('oldName', 'oldDescription', userId);
    groupsMap.set(groupId, oldGroup);

    const result = secaServices.default.editGroup(groupId, newGroupName, null, null, userId);

    const newGroupExpected =new Group(newGroupName, 'oldDescription', userId);

    expect(newGroupExpected).to.deep.equal(result);
    groupsMap.clear();
  });
  it('should edit a group successfully (edit only the description)', () => {
    const newGroupName = 'newGroupName';
    const newDescription = 'newDescription';
    const newEvent = 'newEvent';
    const userId = 'someUserId';
    const groupId = 'groupId';

    const oldGroup = new Group('oldName', 'oldDescription', userId);
    groupsMap.set(groupId, oldGroup);

    const result = secaServices.default.editGroup(groupId, null, newDescription, null, userId);

    const newGroupExpected =new Group('oldName', newDescription, userId);

    expect(newGroupExpected).to.deep.equal(result);
    groupsMap.clear();
  });
  it('should edit a group successfully (edit only the events)', () => {
    const newGroupName = 'newGroupName';
    const newDescription = 'newDescription';
    const newEvent = 'newEvent';
    const userId = 'someUserId';
    const groupId = 'groupId';

    const oldGroup = new Group('oldName', 'oldDescription', userId);
    groupsMap.set(groupId, oldGroup);

    const result = secaServices.default.editGroup(groupId, null, null, newEvent, userId);

    const newGroupExpected =new Group('oldName', 'oldDescription', userId);
    newGroupExpected.addEvent(newEvent);

    expect(newGroupExpected).to.deep.equal(result);
    groupsMap.clear();   
});
});

describe('deleteGroup', () => {
  it('should delete a group successfully when provided with a valid group ID and token', () => {
    const groupId = 'someGroupId';
    const token = 'someToken';
    
    // Adicione um grupo simulado ao mapa de grupos
    const fakeGroup = new Group('group', 'description', token);
    groupsMap.set(groupId, fakeGroup);

    const result = secaServices.default.deleteGroup(groupId, token);

    expect(result).to.be.true;
    expect(groupsMap.has(groupId)).to.be.false;
    groupsMap.clear();
  });
  it('should not delete a group because the token passes is incorrect', () => {
    const groupId = 'someGroupId';
    const token = 'someToken';
    
    // Adicione um grupo simulado ao mapa de grupos
    const fakeGroup = new Group('group', 'description', token);
    groupsMap.set(groupId, fakeGroup);

    const result = secaServices.default.deleteGroup(groupId, 'incorrect');

    expect(result).to.be.false;
    expect(groupsMap.has(groupId)).to.be.true;
    groupsMap.clear();
  });
});

describe('deleteEvent', () => {
  it('should delete an event successfully when provided with a valid group ID, token, and event ID', () => {
    const groupId = 'someGroupId';
    const token = 'someToken';
    const eventId = 'someEventId';

    // Adicione um grupo simulado ao mapa de grupos com um evento
    const fakeGroup = new Group('group', 'description', token);
    fakeGroup.addEvent({
      id: eventId,
      name: 'eventoTeste'
    });
    groupsMap.set(groupId, fakeGroup);

    const result = secaServices.default.deleteEvent(groupId, token, eventId);

    expect(result).to.be.true;
    expect(groupsMap.get('someGroupId').events.length).to.equal(0);
    groupsMap.clear();
  });
  it('should not delete an event when provided with an invalid group ID', () => {
    const groupId = 'nonExistentGroupId';
    const token = 'someToken';
    const eventId = 'someEventId';

    const result = secaServices.default.deleteEvent(groupId, token, eventId);

    expect(result).to.be.false;
    groupsMap.clear();
  });
  it('should not delete an event when the user token is invalid', () => {
    const groupId = 'someGroupId';
    const token = 'invalidToken';
    const eventId = 'someEventId';

    // Adicione um grupo simulado ao mapa de grupos com um evento
    const fakeGroup = new Group('group', 'description', token);
    fakeGroup.addEvent({
      id: eventId,
      name: 'eventoTeste'
    });
    groupsMap.set('someGroupId', fakeGroup);

    const result = secaServices.default.deleteEvent(groupId, 'invalid', eventId);

    expect(result).to.be.false;
    expect(groupsMap.get('someGroupId').events.length).to.equal(1);
    groupsMap.clear();
  });
  it('should not delete an event when provided with an invalid event ID', () => {
    const groupId = 'someGroupId';
    const token = 'someToken';
    const eventId = 'nonExistentEventId';

    // Adicione um grupo simulado ao mapa de grupos com um evento
    const fakeGroup = new Group('group', 'description', token);
    fakeGroup.addEvent({
      id: eventId,
      name: 'eventoTeste'
    });
    groupsMap.set(groupId, fakeGroup);

    const result = secaServices.default.deleteEvent(groupId, token, 'invalid');

    expect(result).to.be.false;
    expect(groupsMap.get('someGroupId').events.length).to.equal(1);
    groupsMap.clear();
  });
});