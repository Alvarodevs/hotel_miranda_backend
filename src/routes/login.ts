import express from 'express'
import {postLogin} from '../controllers/login'

const loginRouter = express.Router()

loginRouter.post('/login', postLogin)

export default loginRouter