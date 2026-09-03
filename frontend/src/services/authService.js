
export const register = async (authData) => {
    const requestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        redentials: 'include',
        body: JSON.stringify(authData)
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/register`, requestOption)
    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data.error || response.statusText);
        error.status = response.status;
        throw error;
    }
    return data
};

export const login = async (authData) => {
    const requestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(authData)
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/login`, requestOption)
    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data.error || response.statusText);
        error.status = response.status;
        throw error;
    }
    return data
};

export const logout = async () => {
    const requestOption = {
        method: 'POST',
        credentials: 'include'
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/logout`, requestOption)
    return await response.json();
};

export const getCurrentUser = async () => {
    const response = await fetch(
        `${process.env.REACT_APP_HOST}/current-user`,
        {
            credentials: "include"
        }
    );

    return await response.json();
};