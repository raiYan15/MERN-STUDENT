import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createStudent } from '../api/students'

export default function AddStudent() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [department, setDepartment] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name || !age || !department) {
      setError('All fields are required')
      return
    }
    setLoading(true)
    try {
      await createStudent({ name, age: Number(age), department })
      navigate('/')
    } catch (err) {
      console.error(err)
      setError('Failed to create student')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Add Student</h2>
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
          <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  )
}
