import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import xss from 'xss-clean'
import mongoose from 'mongoose'
import mongoSanitize from 'express-mongo-sanitize'
import dbConnection from './dbConfig/dbConnection.js'
import router from './routes/index.js'
import errorMiddleware from './middlewares/errorMiddleware.js'
dotenv.config()

const app = express()

const PORT = process.env.PORT || 8800;

dbConnection()

app.use(cors())
app.use(xss())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(mongoSanitize())
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))
app.use(router)
app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

