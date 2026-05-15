import client from './client'

export async function fetchStudents() {
  const { data } = await client.get('/students')
  return data
}

export async function createStudent(payload) {
  const { data } = await client.post('/students', payload)
  return data
}

export async function updateStudent(id, payload) {
  const { data } = await client.put(`/students/${id}`, payload)
  return data
}

export async function deleteStudent(id) {
  const { data } = await client.delete(`/students/${id}`)
  return data
}
