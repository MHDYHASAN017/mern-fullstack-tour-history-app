const express = require('express')
const cors = require('cors')
const ConnectDB = require('./config/db')
const path = require('path') 
const app = express()


//Middlewares 
app.use(express.json({extended: false}))
app.use(cors()) 

///connect database 
ConnectDB()

///Routes 
const createPost = require('./routers/createPostRoute')
const userRoutes = require('./routers/userRoutes')
const placeRoutes = require('./routers/placeRoutes')
const uploadRoutes = require('./routers/uploadRoutes')
const { errorHandler } = require('./middlewares/errorMiddleware')


///initing routes
app.use('/api/user' , userRoutes)
app.use('/api/place' , placeRoutes)
app.use('/api/uploads' , uploadRoutes)

app.use('/uploads', express.static(path.join( path.resolve(), '/uploads')))


// error handler middleware 
app.use(errorHandler)


///port 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})