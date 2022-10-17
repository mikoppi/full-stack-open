import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`;

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author {
                name
                born
                bookCount
            }
            published
            genres
        }
    }
`;

export const ME = gql`
    query {
        me {
            favoriteGenre
        }
    }
`;

export const NEW_BOOK = gql`
    mutation createBook(
        $title: String!
        $published: Int!
        $author: String!
        $genres: [String]!
    ) {
        addBook(
            title: $title
            published: $published
            author: $author
            genres: $genres
        ) {
            title
            author {
                name
                born
                bookCount
            }
            published
            genres
        }
    }
`;

export const EDIT_BORN = gql`
    mutation editBorn($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            name
            born
        }
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title
            author {
                name
                born
                bookCount
            }
            published
            genres
        }
    }
`;
