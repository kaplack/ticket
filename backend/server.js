const express = require('express')
const path = require('path');
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

//connect to database
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req,res)=>{
    res.status(200).json({message:'Welcome como el tapete'})
})

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/works', require('./routes/workRoutes'))
app.use('/api/allworks', require('./routes/allWorksRoutes'))
app.use('/api/profile', require('./routes/profileRoutes'))


app.use(errorHandler)

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))