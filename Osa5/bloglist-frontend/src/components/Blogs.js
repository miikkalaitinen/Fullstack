const Blog = ({blog}) => (
    <div>
      {blog.title} by {blog.author}
    </div>  
  )

const Blogs = ({ blogs }) => {
    return (
        <>
        <h2>Blogs</h2>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )} 
        </>
    )
}

export default Blogs