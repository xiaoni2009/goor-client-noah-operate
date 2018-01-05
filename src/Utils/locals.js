const locals = {
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
export default locals;