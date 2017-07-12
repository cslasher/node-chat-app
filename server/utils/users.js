class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  getUser (id) {
    return this.users.find((user) => user.id == id);
  }
  getUserList (room) {
    var users = this.users.filter((user)=> user.room == room);
    var namesArray = users.map((user)=> user.name);
    return namesArray;
  }
  removeUser (id) {
    var user = this.users.find((user) => user.id == id);
    if (user) {
      this.users = this.users.filter((user) => user.id !=id);
    }
    return user;
  }
}

module.exports = {Users};