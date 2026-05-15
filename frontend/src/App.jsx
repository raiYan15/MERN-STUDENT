import { Link, Route, Routes, useLocation } from 'react-router-dom'
import StudentList from './components/StudentList'
import AddStudent from './components/AddStudent'
import EditStudent from './components/EditStudent'

function Navbar() {
  const location = useLocation()
  return (
    <nav style={{ padding: '12px 16px', background: '#0d6efd', color: 'white', display: 'flex', gap: 12 }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}>MERN Students</Link>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
        <Link to="/" style={{ color: 'white' }}>Home</Link>
        {location.pathname !== '/add' && (
          <Link to="/add" style={{ color: 'white' }}>Add Student</Link>
        )}
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 960, margin: '20px auto', padding: '0 16px' }}>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/edit/:id" element={<EditStudent />} />
        </Routes>
      </div>
    </div>
  )
}
