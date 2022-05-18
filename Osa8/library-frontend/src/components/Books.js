import { useQuery } from '@apollo/client'
import { allBooks } from '../querys'

const Books = (props) => {
  const books = useQuery(allBooks)

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.loading ? (
            <p>Loading...</p>
          ) : (
            books.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books
