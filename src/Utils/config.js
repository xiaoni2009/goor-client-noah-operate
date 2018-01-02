const LS = {
  get: (name) => {
    return JSON.parse(localStorage.getItem(name));
  },
  set: (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
  },
  remove: (name) => {
    localStorage.removeItem(name);
  },
};


module.exports = {
  LS,
  apiUrl: 'http://'+ apiUrl +'/',
  ws: 'ws://' + apiUrl + '/goor/ws'
};
