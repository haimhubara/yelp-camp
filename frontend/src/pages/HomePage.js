import { AlertMessage } from "../components";

export const HomePage = () => {
    return (
        <main>
            <AlertMessage
                text="The campground was added successfully!"
                type="danger"
            />

        </main>
    );
};