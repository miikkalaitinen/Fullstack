import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/loginService'
import blogService from './services/blogsService'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })

  const noteFormRef = useRef()
  const newBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('bloguser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type, seconds = 3) => {
    setNotification({ message: message, type: type })
    setTimeout(() => setNotification({ message: null, type: null }),seconds*1000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'bloguser', JSON.stringify(response)
      )

      setUser(response)
      setUsername('')
      setPassword('')
      notify(`Logged in as ${response.username}`, true)
    } catch (err) {
      notify('Failed to log in', false, 5)
    }
  }

  const handlePostBlog = async (noteObject) => {

    const newBlog = noteObject

    try {
      const newBlogs = await blogService.postNew(newBlog)
      notify(`Added your new blog ${newBlog.title}  by ${newBlog.author}`, true)
      setBlogs(newBlogs)
      noteFormRef.current.toggleVisibility()
    } catch (err) {
      notify(`Failed to add blog ${err}`, false)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('bloguser')
    setUser(null)
    notify('Logged out', true)
  }

  const handleLikeBlog = async (likedBlog) => {
    const newBlog = {
      ...likedBlog,
      likes: likedBlog.likes + 1
    }

    try {
      const newBlogs = await blogService.updateBlog(newBlog.id,newBlog)
      notify(`Liked blog ${newBlog.title} by ${newBlog.author}`, true)
      setBlogs(newBlogs)
    } catch (err) {
      notify(`Failed to like blog ${err}`, false)
    }
  }

  const handleDeleteBlog = async (blog) => {
    try {
      const newBlogs = await blogService.deleteBlog(blog.id,)
      notify(`Deleted blog ${blog.title} by ${blog.author}`, true)
      setBlogs(newBlogs)
    } catch (err) {
      notify(`Failed to delete blog, ${err}`, false)
    }
  }

  return (
    <div>
      <Notification notification={notification} />
      {!user ?
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}/>:
        <>
          <p>Logged in as {user.username} <button onClick={handleLogout}> Logout </button> </p>
          <Blogs blogs={blogs} likeBlog={handleLikeBlog} deleteBlog={handleDeleteBlog}/>
          <Togglable buttonLabel={'New note'} ref={noteFormRef}>
            <BlogForm handlePostBlog={handlePostBlog} ref={newBlogRef}/>
          </Togglable>
        </>
      }
    </div>
  )
}

export default App
