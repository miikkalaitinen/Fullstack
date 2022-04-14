const BlogForm = ({ handleSubmit, newBlog, handleBlogChange }) => (
    <form onSubmit={handleSubmit}>
      <p>title: 
        <input
        value={newBlog.title}
        onChange={({ target }) => handleBlogChange('title',target.value)}
      /></p>
        <p>author: <input
        value={newBlog.author}
        onChange={({ target }) => handleBlogChange('author',target.value)}
      />
      </p>
      <p> url:
        <input
        value={newBlog.url}
        onChange={({ target }) => handleBlogChange('url',target.value)}
      /></p>
      <button type="submit">save</button>
    </form>  
)

export default BlogForm