export const saveData = async (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const loadData = async (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

export const removeData = async (key) => {
    localStorage.removeItem(key);
};

export const clearAllData = async () => {
    localStorage.clear();
};
