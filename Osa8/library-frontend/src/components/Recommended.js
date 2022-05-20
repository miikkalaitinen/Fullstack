import { useQuery } from '@apollo/client'
import { ME, allBooks } from '../querys'

const Recommended = ({ show }) => {
  const user = useQuery(ME)
  const books = useQuery(allBooks)

  if (!show) {
    return null
  }

  return (
    <>
      <h2>Recommendations</h2>
      {user.loading ? (
        <p>..Loading Recommendations</p>
      ) : (
        <p>
          In your favorite genre <b>{user.data.me.favoriteGenre}</b>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {user.loading
            ? null
            : books.data.allBooks
                .filter((b) => b.genres.includes(user.data.me.favoriteGenre))
                .map((a) => (
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                ))}
        </tbody>
      </table>
    </>
  )
}

export default Recommended
