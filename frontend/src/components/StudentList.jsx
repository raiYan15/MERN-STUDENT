import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchStudents, deleteStudent } from '../api/students'

export default function StudentList() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await fetchStudents()
      setStudents(data)
    } catch (err) {
      console.error(err)
      setError('Failed to load students')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onDelete = async (id) => {
    if (!confirm('Delete this student?')) return
    try {
      await deleteStudent(id)
      setStudents((prev) => prev.filter((s) => s._id !== id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete student')
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Students</h2>
        <Link to="/add" className="btn">+ Add Student</Link>
      </div>
      {students.length === 0 ? (
        <p>No students yet</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={th}>Name</th>
                <th style={th}>Age</th>
                <th style={th}>Department</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td style={td}>{s.name}</td>
                  <td style={td}>{s.age}</td>
                  <td style={td}>{s.department}</td>
                  <td style={td}>
                    <Link to={`/edit/${s._id}`} state={{ student: s }} style={{ marginRight: 8 }}>Edit</Link>
                    <button onClick={() => onDelete(s._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const th = { textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }
const td = { borderBottom: '1px solid #eee', padding: '8px' }
