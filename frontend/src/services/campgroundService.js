
export const getAllCampgrounds = async () => {
    const response = await fetch("http://localhost:5000/campgrounds")
    if (!response.ok) {
        const error = new Error(response.statusText);
        error.status = response.status;
        throw error;
    }
    const data = await response.json()
    return data
}

export const getCampground = async (id) => {
    const response = await fetch(`http://localhost:5000/campgrounds/${id}`)
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
    const response = await fetch(`http://localhost:5000/campgrounds/new`,requestOption)
    if (!response.ok) {
        const error = new Error(response.statusText);
        error.status = response.status;
        throw error;
    }
    const data = await response.json();
    return data
};