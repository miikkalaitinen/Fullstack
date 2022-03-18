const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)



beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.insertMany(helper.initialUsers)
})

// ADDING USERS

describe('Testing adding users', () => {

    test('Add good user and return 201', async () => {
        const user = helper.goodUser

        await api.post('/api/users').send(user).expect(201)

        const users = await User.find({})
        expect(users).toHaveLength(helper.initialUsers.length + 1)
    })

    test('Add user with no password and return 400', async () => {
        const user = helper.badUsers.addUserWOpass

        await api.post('/api/users').send(user).expect(400)
    })

    test('Add user with no username and return 400', async () => {
        const user = helper.badUsers.addUserNousername

        await api.post('/api/users').send(user).expect(400)
    })

    test('Add user with same username and return 400', async () => {
        const user = helper.badUsers.addUsersameuser

        const response = await api.post('/api/users').send(user).expect(400)
        expect(response.body.error).toBe('Username is not unique')
    })

    test('Add user with no name and return 400', async () => {
        const user = helper.badUsers.addUserNoname

        await api.post('/api/users').send(user).expect(400)
    })

    test('Add user with short password and return 400', async () => {
        const user = helper.badUsers.addUserShortpass

        const response = await api.post('/api/users').send(user).expect(400)
        expect(response.body.error).toBe('Invalid password')
    })

})

// GETTING BLOGS

describe('Test getting blogs', () => {

    test('Return correct amount of blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('Json id is "id"', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})


// ADDING BLOGS

describe('Test adding blogs', () => {

    test('Add blog with valid token', async () => {

        const blog = helper.blogs.goodBlog
        const token = await helper.getToken()
    
        const response = await api.post('/api/blogs').set({'authorization' : token }).send(blog).expect(201)
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('Add blog with invalid token, return 401 invalid token', async () => {

        const blog = helper.blogs.goodBlog
    
        const response = await api.post('/api/blogs').set({'authorization' : helper.badUsers }).send(blog).expect(401)
        expect(response.body.error).toBe('invalid token')
    })

    test('Add blog without likes and check that likes default to 0', async () => {

        const blog = helper.blogs.goodBlog
        const token = await helper.getToken()
    
        await api.post('/api/blogs').set({'authorization' : token }).send(blog)

        const addedblog = await Blog.findById(blog._id)
        expect(addedblog.likes).toBe(0)
    })

    test('Add blog without title, return 400 failed validation', async () => {

        const blog = helper.blogs.addBlogWithoutTitle
        const token = await helper.getToken()
    
        await api.post('/api/blogs').set({'authorization' : token }).send(blog).expect(400)
    })
})

// DELETING BLOGS

describe('Test deleting blogs', () => {

    test('Test delete with valid token', async () => {

        const blogId = helper.initialBlogs[0]._id
        const token = await helper.getToken()
    
        await api.delete(`/api/blogs/${blogId}`).set({'authorization' : token }).expect(200)
    
        const response = await api.get('/api/blogs')
        const deleted = response.body.filter((a) => a.id === blogId).length
        expect(deleted).toBe(0)
    })

    
    test('Test delete with invalid token', async () => {

        const blogId = helper.initialBlogs[0]._id

        await api.delete(`/api/blogs/${blogId}`).set({'authorization' : helper.badtoken }).expect(401)
    
        const response = await api.get('/api/blogs')
        const deleted = response.body.filter((a) => a.id === blogId).length
        expect(deleted).toBe(1)
    })
})

// UPDATING BLOGS

describe('Test updating blogs', () => {

    test('Test update with valid token', async () => {

        const token = await helper.getToken()

        const blogId = helper.initialBlogs[0]._id
    
        const response = await api.put(`/api/blogs/${blogId}`).set({'authorization' : token }).send(helper.blogs.udpatedBlog)
        const updated = response.body.find((a) => a.id === blogId)
        expect(updated.title).toBe(helper.blogs.udpatedBlog.title)
    })

    test('Test update with invalid token', async () => {

        const blogId = helper.initialBlogs[0]._id
    
        await api.put(`/api/blogs/${blogId}`).set({'authorization' : helper.badtoken }).send(helper.blogs.udpatedBlog).expect(401)
        
        const blog = Blog.findById(blogId)
        expect(helper.blogs.udpatedBlog.title !== blog.title)
    })

})

afterAll(() => {
    mongoose.connection.close()
})