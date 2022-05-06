import Blog from './Blog'

const Blogs = ({ blogs, likeBlog, deleteBlog }) => {

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
        <Blog key={blog.id} id={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog}/>
      )}
    </>
  )
}

export default Blogs