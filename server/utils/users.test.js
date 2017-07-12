const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;
  
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id:'1',
      name: 'Edwardo',
      room: 'Test 1'
    }, {
      id:'2',
      name: 'Andrew',
      room: 'Movies'
    }, {
      id:'3',
      name: 'Jen',
      room: 'Test 1'
    }];
  });
  
  it('should add a user', () => {
    var users = new Users();
    var user = {
      id: "123",
      name: "Ed",
      room: "Test"
    };
    var res = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
    expect(res).toInclude(user);
  });
  
  it('should return users for Test 1', () => {
    var userList = users.getUserList('Test 1');
    expect(userList).toEqual(['Edwardo', 'Jen']);
  });
  
  it('should return users for Movies', () => {
    var userList = users.getUserList('Movies');
    expect(userList).toEqual(['Andrew']);
  });
  
  it('should remove a user', () => {
    var id = '2';
    var res = users.removeUser(id);
    expect(res.id).toBe(id);
    expect(users.users.length).toBe(2);
  });
  
  it('should not remove user', () => {
    var id = 123;
    var res = users.removeUser(id);
    expect(res).toBe(undefined);
    expect(users.users.length).toBe(3);
  });
  
  it('should find user', () => {
    var id = '3';
    var res = users.getUser(id);
    expect(res.id).toBe(id);
  });
  
  it('should not find user', () => {
    var id = 123;
    var res = users.getUser(id);
    expect(res).toBe(undefined);
  });
})