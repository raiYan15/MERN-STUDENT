const { query } = require('../config/db');

function mapStudent(row) {
  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    age: row.age,
    department: row.department,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function validateStudentInput(student) {
  const name = String(student.name || '').trim();
  const department = String(student.department || '').trim();
  const age = Number(student.age);

  if (!name) {
    throw new Error('Name is required');
  }
  if (name.length < 2) {
    throw new Error('Name must be at least 2 characters long');
  }
  if (!Number.isFinite(age) || age < 1) {
    throw new Error('Age must be a positive number');
  }
  if (!department) {
    throw new Error('Department is required');
  }

  return { name, age, department };
}

async function fetchAllStudents() {
  const [rows] = await query(
    `
      SELECT
        id,
        name,
        age,
        department,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM students
      ORDER BY created_at DESC, id DESC
    `
  );

  return rows.map(mapStudent);
}

async function fetchStudentById(id) {
  const [rows] = await query(
    `
      SELECT
        id,
        name,
        age,
        department,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM students
      WHERE id = ?
      LIMIT 1
    `,
    [id]
  );

  return rows.length ? mapStudent(rows[0]) : null;
}

async function insertStudent(student) {
  const data = validateStudentInput(student);
  const [result] = await query(
    'INSERT INTO students (name, age, department) VALUES (?, ?, ?)',
    [data.name, data.age, data.department]
  );

  return fetchStudentById(result.insertId);
}

async function updateStudentById(id, updates) {
  const existing = await fetchStudentById(id);
  if (!existing) {
    return null;
  }

  const merged = validateStudentInput({
    name: updates.name ?? existing.name,
    age: updates.age ?? existing.age,
    department: updates.department ?? existing.department,
  });

  await query(
    'UPDATE students SET name = ?, age = ?, department = ? WHERE id = ?',
    [merged.name, merged.age, merged.department, id]
  );

  return fetchStudentById(id);
}

async function deleteStudentById(id) {
  const existing = await fetchStudentById(id);
  if (!existing) {
    return null;
  }

  await query('DELETE FROM students WHERE id = ?', [id]);
  return existing;
}

async function countDocuments() {
  const [rows] = await query('SELECT COUNT(*) AS count FROM students');
  return Number(rows[0]?.count || 0);
}

async function insertMany(students) {
  if (!Array.isArray(students) || students.length === 0) {
    return [];
  }

  for (const student of students) {
    await insertStudent(student);
  }

  return fetchAllStudents();
}

module.exports = {
  find: fetchAllStudents,
  create: insertStudent,
  findByIdAndUpdate: updateStudentById,
  findByIdAndDelete: deleteStudentById,
  countDocuments,
  insertMany,
};
