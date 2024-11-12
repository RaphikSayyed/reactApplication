const Marks = require('../Models/marksSchema');
const Student = require('../Models/studentSchema');

const welcomeMarks = async (req, res) => {
    res.status(200).send({ success: true, message: 'Welcome to Our Marks!' });
};

const addMarks = async (req, res) => {
    try {
        const { studentId, subject, mark } = req.body;

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const existingMark = await Marks.findOne({ studentId, subject });
        if (existingMark) {
            return res.status(400).json({ message: 'Marks for this subject already exist for the student' });
        }

        const newMark = new Marks({ studentId, subject, mark });
        const savedMark = await newMark.save();

        // Add the mark to the student's marks array
        student.marks.push(savedMark._id);
        await student.save();

        res.status(201).json(savedMark);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getMarksByStudentId = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        if (!studentId) {
            return res.status(400).json({ message: "Student ID is required" });
        }

        const marks = await Marks.find({ studentId });

        if (!marks || marks.length === 0) {
            return res.status(404).json({ message: 'No marks found for this student' });
        }

        res.json(marks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMarks = async (req, res) => {
    try {
        const { studentId, subject, mark } = req.body;

        const updatedMark = await Marks.findOneAndUpdate(
            { studentId, subject },
            { mark },
            { new: true, runValidators: true }
        );

        if (!updatedMark) {
            return res.status(404).json({ message: 'Marks record not found for the student and subject' });
        }

        res.json(updatedMark);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteMarks = async (req, res) => {
    try {
        const deletedMark = await Marks.findByIdAndDelete(req.params.id);
        if (!deletedMark) return res.status(404).json({ message: 'Marks record not found' });
        res.json({ message: 'Marks record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addMarks, updateMarks, deleteMarks, getMarksByStudentId, welcomeMarks };
