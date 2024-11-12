const studentSchemas = require('../Models/studentSchema');

const welcome = async (req, res) => {
    res.status(200).send({ success: true, message: 'Welcome to Our Login!' });
};


const addStudent = async (req, res) => {
    try {
      console.log("Request body:", req.body);
      const { name, email, standard } = req.body;
  
      // Validate the required fields
      if (!name || !email || !standard) {
        return res.status(400).send({ success: false, message: 'Missing required fields' });
      }
  
      // Check if the student already exists by name or email
      const studentInfo = await studentSchemas.findOne({  email });
      if (studentInfo) {
        return res.status(400).send({ success: false, message: 'Student already exists' });
      }
  
      // Create the new student record
      const studentCreate = await studentSchemas.create({
        name,
        email, 
        standard
      });
  
      res.status(201).send({
        success: true,
        message: 'Student added successfully',
        student: studentCreate
      });
    } catch (error) {
      console.error('Error adding student:', error);  // More detailed error logging
      res.status(500).send({ success: false, message: 'Internal server error', error: error.message });
    }
  };

const getAllStudents = async (req, res) => {
    try {
      // Get the page and limit from query parameters (default to 1 and 10)
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      // Calculate the number of students to skip based on the page number
      const skip = (page - 1) * limit;
  
      // Get the total count of students
      const totalStudents = await studentSchemas.countDocuments();
  
      // Retrieve the students with pagination
      const students = await studentSchemas.find()
        .skip(skip)  // Skip the records based on the page number
        .limit(limit)  // Limit the number of records per page
        .exec();
  
      if (students.length > 0) {
        res.status(200).send({
          success: true,
          message: 'Students retrieved successfully',
          students: students,
          totalCount: totalStudents,
          totalPages: Math.ceil(totalStudents / limit), // Calculate total number of pages
          currentPage: page,
          perPage: limit
        });
      } else {
        res.status(404).send({ success: false, message: 'No student records found' });
      }
    } catch (error) {
      console.error('Error retrieving students:', error);
      res.status(500).send({ success: false, message: 'Internal server error' });
    }
  };
  

const deleteStudent = async (req, res) => { 
    try {
        const { id } = req.params;
        const studentInfo = await studentSchemas.findByIdAndDelete(id);
        if (studentInfo) {
            res.status(200).send({ success: true, message: 'Student deleted successfully' });
        } else {
            res.status(404).send({ success: false, message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
};

const getStudentById = async (req, res) => {
  try {
      const student = await studentSchemas.findById(req.params.id)
          .populate('marks') // Populate marks to retrieve associated Mark documents
          .exec();

      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }

      res.json(student);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


const updateStudent = async (req, res) => {
    try {
        const { _id, name, email, standard } = req.body;
        const studentInfo = await studentSchemas.findByIdAndUpdate(
            _id,
            { name, email, standard },
            { new: true, runValidators: true }
        );

        if (studentInfo) {
            res.status(200).send({
                success: true,
                message: 'Student updated successfully',
                student: studentInfo
            });
        } else {
            res.status(404).send({ success: false, message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
};

module.exports = { welcome, addStudent, getAllStudents, deleteStudent, updateStudent, getStudentById };
