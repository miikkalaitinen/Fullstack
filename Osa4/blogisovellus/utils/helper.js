const jwt = require('jsonwebtoken')

const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user: '62344983956b97244de00431'
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        user: '623449a8956b97244de00437'
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        user: '6234499e956b97244de00434'
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 0,
        user: '62344983956b97244de00431'
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        user: '6234499e956b97244de00434'
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        user: '623449a8956b97244de00437'
    }  
]

const initialUsers = [
    {
        _id: '62344983956b97244de00431',
        username: 'Tester1',
        name: 'Jarkko Testimies',
        passwordHash: '$2b$08$PQ.HS2ZF0gfDyqosZGFBv.vXS4cZjCuXcw0vivqAs/.w9Ay28oSUy'
    },
    {
        _id: '6234499e956b97244de00434',
        username: 'Tester2',
        name: 'Pekka Testimies',
        passwordHash: '$2b$08$PQ.HS2ZF0gfDyqosZGFBv.vXS4cZjCuXcw0vivqAs/.w9Ay28oSUy'
    },
    {
        _id: '623449a8956b97244de00437',
        username: 'Tester3',
        name: 'Tiina Testimies',
        passwordHash: '$2b$08$PQ.HS2ZF0gfDyqosZGFBv.vXS4cZjCuXcw0vivqAs/.w9Ay28oSUy'
    },
]

const blogs = {
    goodBlog : {
        _id: '622ce0caeecfdab7ab3a268a',
        title: 'Test Blog',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    },
    addBlogWithoutTitle : {
        _id: '622ce0caeecfdab7ab3a268a',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 0,
        __v: 0
    },
    addBlogWithoutURL : {
        _id: '622ce0caeecfdab7ab3a268a',
        title: 'Test Blog',
        author: 'Robert C. Martin',
        likes: 0,
        __v: 0
    },
    udpatedBlog : {
        _id: '5a422a851b54a676234d17f7',
        title: 'Updated patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    }
}

const badUsers = {
    addUserWOpass : {
        username: 'Tester4',
        name: 'Pentti Testimies',
    },
    addUserShortpass : {
        username: 'Tester4',
        name: 'Pentti Testimies',
        password: 'te'
    },
    addUsersameuser : {
        username: 'Tester1',
        name: 'Pentti Testimies',
        password: 'testi1'
    },
    addUserNoname : {
        username: 'Tester4',
        password: 'testi'
    },
    addUserNousername : {
        name: 'Pentti Testimies',
        password: 'testi'
    }
}

const goodUser = {
    username: 'Tester4',
    password: 'sekretyeah',
    name: 'Pentti Testimies'
}

const getToken = () => {

    const userForToken = {
        username: initialUsers[0].username,
        id: initialUsers[0]._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    return `bearer ${token}`
}

const badtoken = 'bearer thisisnotarealtoken'

module.exports = {
    initialBlogs, blogs, initialUsers, badUsers, goodUser, getToken, badtoken
}