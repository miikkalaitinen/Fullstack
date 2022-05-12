import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [largeBlog, setLargeBlog ] = useState()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const tryDelete = (delblog) => {
    if(window.confirm(`Delete ${delblog.title}`)) deleteBlog(delblog)
  }

  if(!largeBlog) {
    return(
      <div className='blog' style={blogStyle}>
        {blog.title} by {blog.author} &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => setLargeBlog(!largeBlog)}>View</button>
      </div>
    )
  }
  else {
    return (
      <div  className='blog' style={blogStyle}>
        {blog.title} &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => setLargeBlog(!largeBlog)}>hide</button>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <button onClick={() => likeBlog(blog)}>Like</button></p>
        <p>author: {blog.author}</p>
        <button onClick={() => tryDelete(blog)}>Remove</button>
      </div>
    )
  }
}

export default Blog