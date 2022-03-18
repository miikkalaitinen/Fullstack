const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body

    const l = String(password).length

    const existingUser = await User.findOne({ username })
    const badpassfor = !password || l < 3

    console.log(badpassfor)

    if (existingUser) {
        return res.status(400).json({
            error: 'Username is not unique'
        })
    }
    else if (badpassfor) {
        return res.status(400).json({error: 'Invalid password'})
    }

    else {
        const saltRounds = 8
        const passwordHash = await bcrypt.hash(password, saltRounds)
    
        const user = new User({
            username,
            name,
            passwordHash,
        })
    
        const savedUser = await user.save()
    
        res.status(201).json(savedUser)
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users)
})

module.exports = usersRouter