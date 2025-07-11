const users = require('./user')

module.exports = (app) => {
    app.use('/api/v1', users)
}