const express = require('express')
const morgan = require('morgan')
const app = express()
const PersonDB = require('./models/person')

app.use(express.static('build'))
app.use(express.json())

//app.use(cors())

app.use(morgan(function (tokens, req, res) {

  if(tokens.method(req, res) === 'POST') {

    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  }
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

// GET

app.get('/api/persons', (req, res, next) => {
  PersonDB.find({})
    .then(data => {
      res.json(data)
    })
    .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  PersonDB.findById(req.params.id)
    .then(data => {
      if (data) {
        res.json(data)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

app.get('/info', (req, res) => {
  PersonDB.find({})
    .then(data => {
      res.send(`<p>Phonebook has numbers for ${data.length} people</p><p>${new Date()}</p>`)
    })
    .catch((err) => res.status(500).json({ err: err }))
})

// DELETE

app.delete('/api/persons/:id', (req, res, next) => {

  PersonDB.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

// POST

app.post('/api/persons', (req, res, next) => {

  const { name, number } = req.body
  console.log('Adding ', { name, number })


  PersonDB.create({ name, number })
    .then(data => {
      console.log('Saved: ',data)
      res.json(data)
    })
    .catch(err => next(err))
})

//PUT

app.put('/api/persons/:id', (req, res, next) => {

  const { name, number } = req.body

  PersonDB.findByIdAndUpdate(req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(data => {
      res.json(data)
    })
    .catch(err => next(err))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ err: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    return res.status(400).json({ err: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ err: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}/ and Api running on http://localhost:${PORT}/api/persons`)
})