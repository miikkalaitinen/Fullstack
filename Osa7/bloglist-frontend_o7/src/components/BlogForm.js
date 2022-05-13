import { useState } from 'react'
import { setNotifications } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { toggle } from '../reducers/toggableReducer'
import { useDispatch } from 'react-redux'

const BlogForm = () => {

  const dispatch = useDispatch()

  const [newBlog, setNewBlog] = useState({ title : '', author : '', url : '' })

  const handleBlogChange = (target, data) => {
    if(target === 'title') setNewBlog({ ...newBlog, title : data })
    if(target === 'author') setNewBlog({ ...newBlog, author : data })
    if(target === 'url') setNewBlog({ ...newBlog, url : data })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handlePostBlog(newBlog)
    clearForm()
  }

  const handlePostBlog = async (noteObject) => {
    const newBlog = noteObject;

    try {
      dispatch(setNotifications(`Added your new blog ${newBlog.title}  by ${newBlog.author}`,true))
      dispatch(createBlog(newBlog))
      dispatch(toggle())
    } catch (err) {
      dispatch(setNotifications(`Failed to add blog ${err}`, false))
    }
  };

  const clearForm = () => {
    setNewBlog({ title : '', author : '', url : '' })
  }


  return (
    <form onSubmit={handleSubmit}>
      <p>title:
        <input
          id="titleinput"
          value={newBlog.title}
          onChange={({ target }) => handleBlogChange('title',target.value)}
        />
      </p>
      <p>author:
        <input
          id="authorinput"
          value={newBlog.author}
          onChange={({ target }) => handleBlogChange('author',target.value)}
        />
      </p>
      <p> url:
        <input
          id="urlinput"
          value={newBlog.url}
          onChange={({ target }) => handleBlogChange('url',target.value)}
        /></p>
      <button type="submit">save</button>
    </form>
  )
}


export default BlogForm