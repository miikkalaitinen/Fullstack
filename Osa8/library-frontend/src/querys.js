import { gql } from '@apollo/client'

export const allAuthors = gql`
  query getAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const allBooks = gql`
  query getBooks {
    allBooks {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`

export const addBook = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`

export const editAuthor = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query Me {
    me {
      username
      favoriteGenre
    }
  }
`
