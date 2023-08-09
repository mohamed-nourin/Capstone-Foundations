require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { SERVER_PORT } = process.env
const { User } = require("./models.js");
const { seed, createUser, getUsers, getCategories, getTasks, addTask, deleteTask, loginUser } = require('./controller.js')

app.use(express.json())
app.use(cors())

app.post('/seed', seed)

app.get('/users', getUsers)
app.post("/signup", createUser);
app.post("/login", loginUser)
app.get('/categories', getCategories)
app.post('/tasks', addTask)
app.get('/tasks', getTasks)
app.delete('/tasks/:id', deleteTask)

app.listen(SERVER_PORT, () => console.log(`Server up on port ${SERVER_PORT}`))
