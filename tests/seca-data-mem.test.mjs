import { expect } from 'chai';
import crypto from 'crypto';
import { groupsMap } from '../seca-data-mem.mjs';
import * as secaDataMem1 from '../seca-data-mem.mjs';

describe('createGroup', () => {
  it('should create a new group successfully', () => {

    const IdUser = 'someUserId';
    const name = 'Test Group';
    const description = 'Group for testing';

    // Guarde o valor original da função randomUUID
    const originalRandomUUID = crypto.randomUUID;

    // Substitua a função randomUUID para retornar um valor fixo
    crypto.randomUUID = () => 'someGroupId';

    // Chame a função sendo testada
    const result = secaDataMem1.secaDataMem.createGroup(name, description, IdUser);
    // Verifique se o novo grupo foi adicionado ao mapa de grupos
    expect(groupsMap.get('someGroupId')).to.eql({
      groupId: 'someGroupId',
      name: 'Test Group',
      description: 'Group for testing',
      IdUser: 'someUserId',
      events: [],
    });

    // Restaure a função randomUUID original
    crypto.randomUUID = originalRandomUUID;
    groupsMap.delete(result.groupId);
  });
  it('should handle creating duplicate groups by the same user', () => {
    const IdUser = 'someUserId';
    const name = 'Test Group';
    const description = 'Group for testing';

    // Guarde o valor original da função randomUUID
    const originalRandomUUID = crypto.randomUUID;

    // Substitua a função randomUUID para retornar um valor fixo
    crypto.randomUUID = () => 'someGroupId';

    // Adicione um grupo simulado ao mapa de grupos
    groupsMap.set('someGroupId', {
      groupId: 'someGroupId',
      name: 'Test Group',
      description: 'Group for testing',
      IdUser: 'someUserId',
      events: [],
    });

    const result = secaDataMem1.secaDataMem.createGroup(name, description, IdUser);

    expect(result).to.be.null;

    crypto.randomUUID = originalRandomUUID;
    groupsMap.delete('someGroupId');
  });
});

describe('allGroups', () => {
    it('should retrieve all groups successfully', () => {

      const result = secaDataMem1.secaDataMem.allGroups();   //array com todos os grupos
      const arrayExpected = [...groupsMap.values()];

      expect(arrayExpected).to.deep.equal(result);
    });
});

describe('getGroup', () => {
    it('should retrieve a specified group successfully', () => {
      const name = 'groupName1';
      const groupId = 'someGroupId';

      const group = {
        groupId: groupId,
        name: name,
        description: 'Group for testing',
        IdUser: 'someUserId',
        events: [],
      }
      groupsMap.set(groupId, group)

      const result = secaDataMem1.secaDataMem.getGroup(groupId);

      const groupExpected = {
        groupId: groupId,
        name: name,
        description: 'Group for testing',
        IdUser: 'someUserId',
        events: [],
      }
  
      expect(groupExpected).to.deep.equal(result);
      groupsMap.delete(groupId)
    });
    it('should return null', () => {
        const name = 'groupName1';
        const groupId = 'someGroupId';
  
        const group = {
          groupId: groupId,
          name: name,
          description: 'Group for testing',
          IdUser: 'someUserId',
          events: [],
        }
        groupsMap.set(groupId, group)
  
        const result = secaDataMem1.secaDataMem.getGroup('non-existent-group');
    
        expect(result).to.be.null;
        groupsMap.delete(groupId)
    });
});

describe('createUser', () => {
    it('should create a user successfully', () => {
      const userName = 'userName1';
      const userId = 'someUserId';

      const newUserExpected = new secaDataMem1.User(userId, userName);

      const originalRandomUUID = crypto.randomUUID;
      crypto.randomUUID = () => 'someUserId';

      const result = secaDataMem1.secaDataMem.createUser(userName);
  
      expect(newUserExpected).to.deep.equal(result);
      crypto.randomUUID = originalRandomUUID;
      secaDataMem1.usersMap.delete(userId);
    });
    it('should return null', () => {
        const userName = 'userName1';
        const userId = 'someUserId';
  
        const newUserExpected = new secaDataMem1.User(userId,userName);
        secaDataMem1.usersMap.set(userId, userName)
        
        const originalRandomUUID = crypto.randomUUID;
        crypto.randomUUID = () => 'someUserId';

        const result = secaDataMem1.secaDataMem.createUser(userName);
    
        expect(result).to.be.null;
        secaDataMem1.usersMap.delete(userId);
        crypto.randomUUID = originalRandomUUID;
      });   
});