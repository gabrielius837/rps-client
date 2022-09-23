const getLocalStorageItemKeys = (prefix: string) => {
    const { localStorage } = window;
    const result = [];
    for (let i = 0; i < localStorage.length; i++) {
        const value = localStorage.key(i);
        if (!value)
            continue;
        if (value.startsWith(prefix))
            result.push(localStorage.key(i));
    }
    return result;
}

export default getLocalStorageItemKeys;
