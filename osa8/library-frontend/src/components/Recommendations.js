import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_BOOKS } from "../queries";

const Recommendations = ({ user, show }) => {
    const result = useQuery(ALL_BOOKS, {
        pollInterval: 2000,
    });

    if (result.loading) {
        return <div>loading...</div>;
    }
    if (!show) {
        return null;
    }
    const books = [...result.data.allBooks];
    console.log(user.data);
    return (
        <div>
            <h2>Recommendations</h2>
            <p>books in your favorite genre {user.data.me.favoriteGenre}</p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books
                        .filter((book) =>
                            book.genres.includes(user.data.me.favoriteGenre)
                        )
                        .map((a) => (
                            <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Recommendations;
