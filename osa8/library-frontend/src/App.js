import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { ME } from "./queries";
import Recommendations from "./components/Recommendations";
import { BOOK_ADDED } from "./queries";

const App = () => {
    const [page, setPage] = useState("authors");
    const [token, setToken] = useState(null);
    const client = useApolloClient();
    const user = useQuery(ME);

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded;
            window.alert(`${addedBook.title} was added`);
        },
    });

    const logOut = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
    };

    if (token) {
        return (
            <div>
                <div>
                    <button onClick={() => setPage("authors")}>authors</button>
                    <button onClick={() => setPage("books")}>books</button>
                    <button onClick={() => setPage("add")}>add book</button>
                    <button onClick={() => setPage("recommend")}>
                        recommend
                    </button>
                    <button onClick={logOut}>log out</button>
                </div>

                <Authors show={page === "authors"} />

                <Books show={page === "books"} />

                <NewBook show={page === "add"} />

                <Recommendations show={page === "recommend"} user={user} />
            </div>
        );
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>
                <button onClick={() => setPage("login")}>login</button>
            </div>

            <Authors show={page === "authors"} />

            <Books show={page === "books"} />

            <Login show={page === "login"} setToken={setToken} />
        </div>
    );
};

export default App;
