import { expect } from 'chai';
import crypto from 'crypto';
//import { secaDataMem1.groupsMap } from '../seca-data-mem.mjs';
import * as secaDataMem1 from '../seca-data-mem.mjs';

describe('createGroup', () => {
  it('should create a new group successfully', () => {
    const name = 'Test Group';
    const description = 'Group for testing';
    const IdUser = 'someUserId';

    //Guarde o valor original da função randomUUID
    const originalRandomUUID = crypto.randomUUID;
    //Substitua a função randomUUID para retornar um valor fixo
    crypto.randomUUID = () => 'someGroupId';

    const groupExpected = new secaDataMem1.Group(name, description, IdUser);
    const result = secaDataMem1.default.createGroup(name, description, IdUser);   //result recebe o ID do grupo criado
    
    expect(secaDataMem1.groupsMap.get(result)).to.deep.equal(groupExpected);

    // Restaure a função randomUUID original
    crypto.randomUUID = originalRandomUUID;
    secaDataMem1.groupsMap.clear();
  });
  it('should handle creating duplicate groups by the same user', () => {
    const name = 'Test Group';
    const description = 'Group for testing';
    const IdUser = 'someUserId';

    // Guarde o valor original da função randomUUID
    const originalRandomUUID = crypto.randomUUID;
    // Substitua a função randomUUID para retornar um valor fixo
    crypto.randomUUID = () => 'someGroupId';

    const group1 = new secaDataMem1.Group(name, description, IdUser);
    secaDataMem1.groupsMap.set('someGroupId', group1)

    const result = secaDataMem1.default.createGroup(name, description, IdUser); //recebe null porque já existe um grupo igual

    expect(result).to.be.null;

    crypto.randomUUID = originalRandomUUID;
    secaDataMem1.groupsMap.clear();
  });
});

describe('allGroups', () => {
    it('should retrieve all groups associated to an user', () => {
      const name = 'Test Group';
      const description = 'Group for testing';
      const IdUser = 'someUserId';

      const group1 =new secaDataMem1.Group(name, description, IdUser);
      secaDataMem1.groupsMap.set("IDgroup1", group1);
      const group2 =new secaDataMem1.Group('name1', 'description1', IdUser);
      secaDataMem1.groupsMap.set("IDgroup2", group2);
      const group3 =new secaDataMem1.Group('name2', 'description2', 'OtherIdUser');
      secaDataMem1.groupsMap.set("IDgroup3", group3);

      const result = secaDataMem1.default.allGroups(IdUser);   //array com todos os grupos associados a IdUser
      const arrayExpected = [secaDataMem1.groupsMap.get("IDgroup1"), secaDataMem1.groupsMap.get("IDgroup2")];

      expect(arrayExpected).to.deep.equal(result);
      secaDataMem1.groupsMap.clear();
    });
});

describe('getGroup', () => {
    it('should retrieve a specified group successfully', () => {
      const name = 'Test Group';
      const description = 'Group for testing';
      const IdUser = 'someUserId';
      const groupId = 'someGroupId';

      const groupExpected =new secaDataMem1.Group(name, description, IdUser);
      secaDataMem1.groupsMap.set(groupId, groupExpected);

      const result = secaDataMem1.default.getGroup(groupId, IdUser);
  
      expect(groupExpected).to.deep.equal(result);
      secaDataMem1.groupsMap.clear();
    });
    it('should return null due incorrect token', () => {
      const name = 'groupName';
      const description = 'description';
      const IdUser = 'someIdUser';
      const groupId = 'someGroupId';
  
      const group =new secaDataMem1.Group(name, description, IdUser);
      secaDataMem1.groupsMap.set(groupId, group);
  
      const result = secaDataMem1.default.getGroup(groupId, 'incorrectIdUser');
    
      expect(result).to.be.null;
      secaDataMem1.groupsMap.clear()
    });
    it('should return null due undefined group', () => {
      const name = 'groupName';
      const description = 'description';
      const IdUser = 'someIdUser';
      const groupId = 'someGroupId';
  
      const group =new secaDataMem1.Group(name, description, IdUser);
      secaDataMem1.groupsMap.set(groupId, group);
  
      const result = secaDataMem1.default.getGroup("incorrectGroupId", IdUser);
    
      expect(result).to.be.null;
      secaDataMem1.groupsMap.clear()
    });
});

describe('createUser', () => {
    it('should create a user successfully', () => {
      const userName = 'userName1';
      const userId = 'someUserId';

      const newUserExpected = new secaDataMem1.User(userId, userName);

      const originalRandomUUID = crypto.randomUUID;
      crypto.randomUUID = () => userId;

      const result = secaDataMem1.default.createUser(userName);
  
      expect(newUserExpected).to.deep.equal(result);
      crypto.randomUUID = originalRandomUUID;
      secaDataMem1.usersMap.clear();
    });
    it('should return null due userName already exists', () => {
        const userName = 'userName1';
        const userId = 'someUserId';
  
        const newUserExpected = new secaDataMem1.User(userId, userName);
        secaDataMem1.usersMap.set(userId, userName);
        
        const originalRandomUUID = crypto.randomUUID;
        crypto.randomUUID = () => userId;

        const result = secaDataMem1.default.createUser(userName);
    
        expect(result).to.be.null;
        secaDataMem1.usersMap.clear();
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

    const oldGroup = new secaDataMem1.Group('oldName', 'oldDescription', userId);
    secaDataMem1.groupsMap.set(groupId, oldGroup);

    const result = secaDataMem1.default.editGroup(groupId, newGroupName, newDescription, newEvent, userId);

    const newGroupExpected = new secaDataMem1.Group(newGroupName, newDescription, userId);
    newGroupExpected.addEvent(newEvent);

    expect(newGroupExpected).to.deep.equal(result);
    secaDataMem1.groupsMap.clear();
  });
  it('should return null due to incorrect Token', () => {
    const newGroupName = 'newGroupName';
    const newDescription = 'newDescription';
    const newEvent = 'newEvent';
    const userId = 'someUserId';
    const groupId = 'groupId';

    const oldGroup = new secaDataMem1.Group('oldName', 'oldDescription', userId);
    secaDataMem1.groupsMap.set(groupId, oldGroup);

    const result = secaDataMem1.default.editGroup(groupId, newGroupName, newDescription, newEvent, 'incorrectToken');

    expect(result).to.be.null;
    secaDataMem1.groupsMap.clear();
  });
  it('should return null due to not exist group', () => {
    const newGroupName = 'newGroupName';
    const newDescription = 'newDescription';
    const newEvent = 'newEvent';
    const userId = 'someUserId';
    const groupId = 'groupId';

    const oldGroup = new secaDataMem1.Group('oldName', 'oldDescription', userId);
    //nao adicionamos ao groupsMap

    const result = secaDataMem1.default.editGroup(groupId, newGroupName, newDescription, newEvent, userId);

    expect(result).to.be.null;
    secaDataMem1.groupsMap.clear();
  });
  it('should edit a group successfully (edit only the name)', () => {
    const newGroupName = 'newGroupName';
    const newDescription = 'newDescription';
    const newEvent = 'newEvent';
    const userId = 'someUserId';
    const groupId = 'groupId';

    const oldGroup = new secaDataMem1.Group('oldName', 'oldDescription', userId);
    secaDataMem1.groupsMap.set(groupId, oldGroup);

    const result = secaDataMem1.default.editGroup(groupId, newGroupName, null, null, userId);

    const newGroupExpected =new secaDataMem1.Group(newGroupName, 'oldDescription', userId);

    expect(newGroupExpected).to.deep.equal(result);
    secaDataMem1.groupsMap.clear();
  });
  it('should edit a group successfully (edit only the description)', () => {
    const newGroupName = 'newGroupName';
    const newDescription = 'newDescription';
    const newEvent = 'newEvent';
    const userId = 'someUserId';
    const groupId = 'groupId';

    const oldGroup = new secaDataMem1.Group('oldName', 'oldDescription', userId);
    secaDataMem1.groupsMap.set(groupId, oldGroup);

    const result = secaDataMem1.default.editGroup(groupId, null, newDescription, null, userId);

    const newGroupExpected =new secaDataMem1.Group('oldName', newDescription, userId);

    expect(newGroupExpected).to.deep.equal(result);
    secaDataMem1.groupsMap.clear();
  });
  it('should edit a group successfully (edit only the events)', () => {
    const newGroupName = 'newGroupName';
    const newDescription = 'newDescription';
    const newEvent = 'newEvent';
    const userId = 'someUserId';
    const groupId = 'groupId';

    const oldGroup = new secaDataMem1.Group('oldName', 'oldDescription', userId);
    secaDataMem1.groupsMap.set(groupId, oldGroup);

    const result = secaDataMem1.default.editGroup(groupId, null, null, newEvent, userId);

    const newGroupExpected =new secaDataMem1.Group('oldName', 'oldDescription', userId);
    newGroupExpected.addEvent(newEvent);

    expect(newGroupExpected).to.deep.equal(result);
    secaDataMem1.groupsMap.clear();   
});
});