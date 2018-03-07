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
    getSession:(name) => {
        try {
            return JSON.parse(sessionStorage.getItem(name));
        } catch (error) {
            return sessionStorage.getItem(name);
        }
    },
    setSession:(name, data) => {
        sessionStorage.setItem(name, JSON.stringify(data));
    },
    removeSession: (name) => {
        sessionStorage.removeItem(name);
    },
};
export default locals;