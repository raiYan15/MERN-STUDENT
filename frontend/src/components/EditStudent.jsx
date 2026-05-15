import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchStudents, updateStudent } from '../api/students'

export default function EditStudent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const initialStudent = location.state?.student

  const [name, setName] = useState(initialStudent?.name || '')
  const [age, setAge] = useState(initialStudent?.age?.toString() || '')
  const [department, setDepartment] = useState(initialStudent?.department || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadedFromServer, setLoadedFromServer] = useState(!!initialStudent)

  useEffect(() => {
    async function load() {
      try {
        if (!initialStudent) {
          const all = await fetchStudents()
          const found = all.find((s) => s._id === id)
          if (found) {
            setName(found.name)
            setAge(String(found.age))
            setDepartment(found.department)
          } else {
            setError('Student not found')
          }
        }
      } catch (err) {
        console.error(err)
        setError('Failed to load student')
      } finally {
        setLoadedFromServer(true)
      }
    }
    load()
  }, [id, initialStudent])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name || !age || !department) {
      setError('All fields are required')
      return
    }
    setLoading(true)
    try {
      await updateStudent(id, { name, age: Number(age), department })
      navigate('/')
    } catch (err) {
      console.error(err)
      setError('Failed to update student')
    } finally {
      setLoading(false)
    }
  }

  if (!loadedFromServer) return <p>Loading...</p>

  return (
    <div>
      <h2>Edit Student</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
        </label>
        <label>
          Age
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter age" />
        </label>
        <label>
          Department
          <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Enter department" />
        </label>
        <div>
          <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save changes'}</button>
        </div>
      </form>
    </div>
  )
}
