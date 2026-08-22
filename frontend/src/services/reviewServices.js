

export const addReview = async (rating, comment,id) => {
    const requestOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            review: {
                rating,
                body: comment,
            },
        }),
    };
    const response = await fetch(
        `${process.env.REACT_APP_HOST}/campgrounds/${id}/review`,
        requestOption
    );

   return response;
}

export const deleteReview = async (campgroundId,reviewId) => {
       const requestOption = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`${process.env.REACT_APP_HOST}/campgrounds/${campgroundId}/review/${reviewId}`, requestOption);

    if (!response.ok) {
        const error = new Error(response.statusText);
        error.status = response.status;
        throw error;
    }
    return response;
}