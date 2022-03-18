const app = require('./app')
const { info } = require('./utils/logger')
const config = require('./utils/config')
const http = require('http')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    info(`Server running on port http://localhost:${config.PORT}/api/blogs`)
})