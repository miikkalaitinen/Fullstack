import { useState, useEffect } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'
import { BOOK_ADDED, allBooks } from './querys'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const user = localStorage.getItem('usertoken')
    if (user) setToken(user)
  }, [])

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('usertoken')
  }

  const updateCache = (cache, query, addedBook) => {
    const uniqByName = (a) => {
      let seen = new Set()
      return a.filter((item) => {
        let k = item.author
        return seen.has(k) ? false : seen.add(k)
      })
    }

    cache.updateQuery(query, ({ allBooks }) => {
      return {
        allBooks: uniqByName(allBooks.concat(addedBook)),
      }
    })
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCache(client.cache, { query: allBooks }, addedBook)
      window.alert(`New book ${addedBook.title} appeared!`)
    },
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <button onClick={() => setPage('add')}>add book</button>
        ) : null}
        {token ? (
          <button onClick={() => setPage('recommended')}>recommended</button>
        ) : null}
        {token ? (
          <button onClick={() => handleLogout()}>logout</button>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      {token ? <NewBook show={page === 'add'} /> : null}
      {token ? <Recommended show={page === 'recommended'} /> : null}
      {!token ? (
        <LoginForm
          setToken={setToken}
          show={page === 'login'}
          setPage={setPage}
        />
      ) : null}
    </div>
  )
}

export default App
