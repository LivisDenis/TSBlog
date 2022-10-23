import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import {registerValidation} from './validations.js'
import checkAuth from "./middleware/checkAuth.js";
import UserController from "./controllers/UserController.js";

dotenv.config()

const PORT = process.env.PORT || 5001

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('BLOG')
})
app.post('/auth/login', UserController.login)
app.post('/auth/registration', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.hehrisc.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

