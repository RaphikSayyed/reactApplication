const express = require('express')
const {addStudent, welcome, getAllStudents, deleteStudent, updateStudent, getStudentById} = require('../Controllers/studentController')
const router = express.Router()


router.get('/welcome',welcome)
router.post('/addStudent',addStudent)
router.get('/getAllStudents',getAllStudents)
router.get('/getStudentById/:id',getStudentById)
router.delete('/deleteStudent/:id',deleteStudent)
router.put('/updateStudent',updateStudent)


module.exports = router