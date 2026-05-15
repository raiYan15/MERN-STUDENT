const Student = require('../models/studentModel');

// GET /api/students - list all students
async function getStudents(req, res) {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err.message);
    res.status(500).json({ message: 'Server error while fetching students' });
  }
}

// POST /api/students - create a student
async function createStudent(req, res) {
  try {
    const { name, age, department } = req.body;
    if (!name || !age || !department) {
      return res.status(400).json({ message: 'name, age and department are required' });
    }
    const student = await Student.create({ name, age, department });
    res.status(201).json(student);
  } catch (err) {
    console.error('Error creating student:', err.message);
    if (err.message && /^(Name|Age|Department)/.test(err.message)) {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error while creating student' });
  }
}

// PUT /api/students/:id - update a student
async function updateStudent(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const student = await Student.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (err) {
    console.error('Error updating student:', err.message);
    if (err.message && /^(Name|Age|Department)/.test(err.message)) {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error while updating student' });
  }
}

// DELETE /api/students/:id - delete a student
async function deleteStudent(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error('Error deleting student:', err.message);
    res.status(500).json({ message: 'Server error while deleting student' });
  }
}

module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};
