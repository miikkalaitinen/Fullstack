const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
})
  
blogRouter.post('/', middleware.tokenExtractor, async (request, response) => {
    
    const body = request.body

    const user = await User.findById(request.id)

    const blog = new Blog({...body, user : user})
    const note = await blog.save()

    user.blogs = user.blogs.concat(note._id)
    await user.save()

    const blogs = await Blog.find({})

    response.status(201).json(blogs)
})

blogRouter.delete('/:id', middleware.tokenExtractor, async (request, response) => {

    const id = request.params.id

    const blog = await Blog.findById(id)

    if(!blog) return response.status(400).json({ error : 'No such blog' })
    if(blog.user.toString() !== request.id.toString()) return response.status(400).json({ error : 'Invalid Token' })

    await Blog.findByIdAndDelete(id)
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
})

blogRouter.put('/:id', middleware.tokenExtractor,async (request, response) => {

    const id = request.params.id
    const body = request.body

    const blog = await Blog.findById(id)

    if(blog.user.toString() !== request.id.toString()) return response.status(400).json({ error : 'Invalid Token' })
    
    await Blog.findByIdAndUpdate(id,body,{ new: true, runValidators: true, context: 'query' })

    const blogs = await Blog.find({})
    response.status(201).json(blogs)
})

module.exports = blogRouter