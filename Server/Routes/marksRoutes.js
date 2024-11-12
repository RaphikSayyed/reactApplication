const express = require('express');
const { addMarks, getMarksByStudentId, updateMarks, deleteMarks, welcomeMarks } = require('../Controllers/marksController');
const router = express.Router();

router.get('/welcomeMarks', welcomeMarks);
router.post('/addMarks', addMarks);
router.get('/getMarksByStudentID/:studentId', getMarksByStudentId);
router.put('/updateMarksByStudentID', updateMarks);
router.delete('/deleteMarksByStudentID/:id', deleteMarks);

module.exports = router;
