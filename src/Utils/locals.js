const locals = {
    get: (name) => {
        try {
            return JSON.parse(localStorage.getItem(name));
        } catch (error) {
            return localStorage.getItem(name);
        }
    },
    set: (name, data) => {
        localStorage.setItem(name, JSON.stringify(data));
    },
    remove: (name) => {
        localStorage.removeItem(name);
    },
};
export default locals;