import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { allAuthors, editAuthor } from '../querys'

const Authors = (props) => {
  const authors = useQuery(allAuthors)
  const [updateAuthors] = useMutation(editAuthor, {
    refetchQueries: [{ query: allAuthors }],
  })
  const [targetAuthor, setTargetAuthor] = useState('')
  const [targetYear, setTargetYear] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    updateAuthors({
      variables: { name: targetAuthor, setBornTo: Number(targetYear) },
    })
    setTargetAuthor('')
    setTargetYear('')
  }

  if (!props.show) {
    return null
  }

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
          {authors.loading ? (
            <tr>
              <th>Loading...</th>
            </tr>
          ) : (
            authors.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <br />
      {props.token ? (
        <form onSubmit={handleSubmit}>
          name
          <select
            value={targetAuthor}
            onChange={({ target }) => setTargetAuthor(target.value)}
          >
            <option value="">Choose author</option>
            {authors.loading ? (
              <option value="">Loading...</option>
            ) : (
              authors.data.allAuthors.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))
            )}
          </select>
          <br />
          born
          <input
            value={targetYear}
            onChange={({ target }) => setTargetYear(target.value)}
          ></input>
          <br />
          <button type="submit">Set Birthyear</button>
        </form>
      ) : null}
    </div>
  )
}

export default Authors
