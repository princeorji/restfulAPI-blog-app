const express = require('express')
const routeLoader = require('./routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(cookieParser())

routeLoader(app)

app.listen(port, () => {
    console.log(`🚀  Server listening on port: ${port}`)
})