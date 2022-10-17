import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_BORN } from "../queries";

const Authors = (props) => {
    const [name, setName] = useState("");
    const [born, setBorn] = useState("");
    const result = useQuery(ALL_AUTHORS, {
        pollInterval: 2000,
    });
    const [editBorn] = useMutation(EDIT_BORN, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    });
    if (!props.show) {
        return null;
    }

    if (result.loading) {
        return <div>loading...</div>;
    }
    const authors = [...result.data.allAuthors];

    const editBornYear = async (e) => {
        e.preventDefault();
        console.log("edit born year...");
        await editBorn({ variables: { name, born: parseInt(born) } });
        setName("");
        setBorn("");
    };

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Set birthyear</h3>
            <form onSubmit={editBornYear}>
                <div>
                    select author:
                    <select
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    >
                        {authors.map((author) => (
                            <option key={author.name} value={author.name}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    born
                    <input
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
    );
};

export default Authors;
