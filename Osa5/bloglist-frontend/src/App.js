import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/loginService'
import blogService from './services/blogsService'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({title : '', author : '', url : ''})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({message: null, type: null})

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
    setNotification({message: message, type: type})
    setTimeout(() => setNotification({message: null, type: null}),seconds*1000)
  }

  const handleBlogChange = (target, data) => {

    if(target === 'title') setNewBlog({...newBlog, title : data})
    if(target === 'author') setNewBlog({...newBlog, author : data})
    if(target === 'url') setNewBlog({...newBlog, url : data})

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
      notify(`Failed to log in`, false, 5)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await blogService.postNew(newBlog)
      notify(`Added your new blog ${newBlog.title}  by ${newBlog.author}`, true)
      setNewBlog({title : '', author : '', url : ''})
      setBlogs(blogs.concat(newBlog))
    } catch (err) {
      notify(`Failed to add blog`, false)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('bloguser')
    setUser(null)
    notify('Logged out', true)
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
          <Blogs blogs={blogs} />
          <BlogForm handleSubmit={handleSubmit} newBlog={newBlog} handleBlogChange={handleBlogChange}/>
        </>
      }
    </div>
  )
}

export default App
