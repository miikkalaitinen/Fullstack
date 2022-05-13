import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, updateBlog} from '../reducers/blogReducer'
import { setNotifications } from '../reducers/notificationReducer'

const Blogs = () => {

  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const handleDeleteBlog = async (blog) => {
    try {
      dispatch(deleteBlog(blog.id))
      dispatch(setNotifications(`Deleted blog ${blog.title} by ${blog.author}`, true))
    } catch (err) {
      dispatch(setNotifications(`Failed to delete blog, ${err}`, false))
    }
  }

  const handleLikeBlog = async ({user, ...likedBlog}) => {
    const newBlog = {
      ...likedBlog,
      likes: likedBlog.likes + 1,
    };

    console.log()
    try {
      dispatch(updateBlog(newBlog))
      dispatch(setNotifications(`Liked blog ${newBlog.title} by ${newBlog.author}`, true))
    } catch (err) {
      dispatch(setNotifications(`Failed to like blog ${err}`, false))
    }
  };

  function sortBlogs() {
    const sortedData = [...blogs].sort((a, b) => {
      if (a.likes > b.likes) return -1
      if (a.likes < b.likes) return 1
      return 0
    })

    return sortedData
  }

  return (
    <>
      <h2>Blogs</h2>
      {sortBlogs().map(blog =>
        <Blog key={blog.id} id={blog.id} blog={blog} likeBlog={handleLikeBlog} deleteBlog={handleDeleteBlog}/>
      )}
    </>
  )
}

export default Blogs