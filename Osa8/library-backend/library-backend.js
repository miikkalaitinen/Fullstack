const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const mongourl = process.env.MONGODB_URI
const JWT_Secret = process.env.SECRET

console.log(mongourl)
mongoose
  .connect(mongourl)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => console.log('MongoDB error', error.message))

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let res = Book.find().populate('author', { name: 1, born: 1 })
      if (args.author !== undefined)
        res = Book.findOne({ title: args.title }).populate('author', {
          name: 1,
          born: 1,
        })
      if (args.genre !== undefined)
        res = Book.find({ genres: args.genre }).populate('author', {
          name: 1,
          born: 1,
        })
      return res
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find().populate('author', {
        name: 1,
        born: 1,
      })

      return books.filter((b) => b.author.name === root.name).length
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_Secret) }
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) return null

      if (!(await Author.exists({ name: args.author }))) {
        const newAuthor = await Author({ name: args.author, born: null })

        try {
          await newAuthor.save()
        } catch {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const author = await Author.findOne({ name: args.author })
      console.log(author)
      const newBook = new Book({ ...args, author: author })

      try {
        newBook.save()
      } catch {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return newBook
    },
    editAuthor: async (root, { name, setBornTo }, context) => {
      if (!context.currentUser) return null

      const author = await Author.findOne({ name: name })

      if (!author) {
        return null
      }

      author.born = setBornTo

      try {
        author.save()
      } catch {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_Secret)
      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
