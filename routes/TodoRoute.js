const express = require('express')
const {
  createTodo,
  getAllTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  todoTask,
  ongoingTask,
  doneTask
} = require('../controllers/TodoController.js')

// const { JWTMiddleware } = require('../middleware/JWTMiddleware.js')

const router = express.Router()

router.post('/', createTodo)
router.get('/', getAllTodo)
router.get('/:id', getTodoById)
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)
router.put('/to-do/:id', todoTask)
router.put('/ongoing/:id', ongoingTask)
router.put('/done/:id', doneTask)

module.exports = router
