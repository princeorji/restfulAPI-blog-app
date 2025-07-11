const users = require('./user')
const posts = require('./post')

module.exports = (app) => {
    app.use('/api/v1', users)
    app.use('/api/v1/posts', posts)
}