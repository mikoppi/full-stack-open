import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
    const [genre, setGenre] = useState("");
    const result = useQuery(ALL_BOOKS, {
        pollInterval: 2000,
    });

    if (result.loading) {
        return <div>loading...</div>;
    }
    if (!props.show) {
        return null;
    }

    const books = [...result.data.allBooks];

    const getAllGenres = () => {
        const genres = [];
        books.map((book) => genres.push(...book.genres));
        return [...new Set(genres)];
    };

    return (
        <div>
            <h2>books</h2>
            <h3>sorted by genre: {genre !== "" ? genre : "all"}</h3>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {genre !== ""
                        ? books
                              .filter((book) => book.genres.includes(genre))
                              .map((a) => (
                                  <tr key={a.title}>
                                      <td>{a.title}</td>
                                      <td>{a.author.name}</td>
                                      <td>{a.published}</td>
                                  </tr>
                              ))
                        : books.map((a) => (
                              <tr key={a.title}>
                                  <td>{a.title}</td>
                                  <td>{a.author.name}</td>
                                  <td>{a.published}</td>
                              </tr>
                          ))}
                </tbody>
            </table>
            {getAllGenres().map((genre) => (
                <button
                    key={genre}
                    onClick={({ target }) => setGenre(target.textContent)}
                >
                    {genre}
                </button>
            ))}
            <button onClick={() => setGenre("")}>all</button>
        </div>
    );
};

export default Books;
