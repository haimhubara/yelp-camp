
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
        credentials: "include",
        body: campgroundData
    };

    const response = await fetch(
        `${process.env.REACT_APP_HOST}/campgrounds/new`,
        requestOption
    );

    if (!response.ok) {
        const data = await response.json();

        const error = new Error(
            data.error || data.message || response.statusText
        );

        error.status = response.status;
        throw error;
    }

    const data = await response.json();
    return data;
};

export const editCampgrounds = async (newCampground, id) => {
    const requestOption = {
        method: "PUT",
        credentials: "include",
        body: newCampground
    };

    const response = await fetch(
        `${process.env.REACT_APP_HOST}/campgrounds/${id}/edit`,
        requestOption
    );

    const data = await response.json();

    if (!response.ok) {
        const error = new Error(
            data.error || data.message || response.statusText
        );

        error.status = response.status;
        throw error;
    }

    return data;
};

export const deleteCampground = async (id) => {
    const requestOption = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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