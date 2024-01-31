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

const router = express.Router()

router.post('/', createTodo)
router.get('/:userId', getAllTodo)
router.get('/:id', getTodoById)
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)
router.put('/todo/:id', todoTask)
router.put('/ongoing/:id', ongoingTask)
router.put('/done/:id', doneTask)

module.exports = router
