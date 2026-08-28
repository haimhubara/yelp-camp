
export const getAllCampgrounds = async () => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/campgrounds`)
    if (!response.ok) {
        const error = new Error(response.statusText);
        error.status = response.status;
        throw error;
    }
    const data = await response.json()
    return data
}

export const getCampground = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/campgrounds/${id}`)
    if (!response.ok) {
        const error = new Error(response.statusText);
        error.status = response.status;
        throw error;
    }
    const data = await response.json()
    return data
}


export const addCampground = async (campgroundData) => {
    const requestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campgroundData)
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/campgrounds/new`, requestOption)
    if (!response.ok) {
        const error = new Error(response.statusText);
        error.status = response.status;
        throw error;
    }
    const data = await response.json();
    return data
};

export const editCampgrounds = async (newCampground, id) => {
    const requestOption = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCampground)
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/campgrounds/${id}/edit`, requestOption)
    if (!response.ok) {
        const error = new Error(response.statusText);
        error.status = response.status;
        throw error;

    }
    const data = await response.json();
    return data
}


export const deleteCampground = async (id) => {
    const requestOption = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`${process.env.REACT_APP_HOST}/campgrounds/${id}`, requestOption);

    if (!response.ok) {
        const error = new Error(response.statusText);
        error.status = response.status;
        throw error;
    }

    const data = await response.json();
    return data;
};