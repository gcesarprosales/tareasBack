const express = require('express')
const router = express.Router()
const { getTareas, setTarea, updateTarea, deleteTarea } = require('../controllers/tareasControllers')
const { protect } = require ('../middleware/authMiddleware')


//router.route('/').get(getTareas).post(setTarea)
router.get('/', protect, getTareas)
router.post('/', protect, setTarea)

//router.route('/:id').delete(deleteTarea).put(updateTarea)
router.put('/:id', protect, updateTarea)
router.delete('/:id', protect, deleteTarea)

module.exports = router