const express = require('express');
const router = express.Router();
const todos = require('../controllers/taskController');
const validateUser = require('../middleware/authMiddleware');
// Create a new todo
router.post('/addTodos', validateUser, todos.addTodos);

// Retrieve all todos
router.get('/getTodos', validateUser, todos.getTodos);

// Update a Todo with id
router.put('/updateTodos', validateUser, todos.updateTodos);

// Delete a Todo by id
router.delete('/deleteTodos', validateUser, todos.deleteTodos);

//Completing a Todo
router.post('/completeTodos', validateUser, todos.completeTodos);

// Showing Completed Todo
router.post('/showCompleted', validateUser, todos.showCompleted);

let taskRoutes = router;
module.exports = taskRoutes;