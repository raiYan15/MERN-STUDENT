const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const Student = require('./models/studentModel');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;

async function seedIfEmpty() {
  const count = await Student.countDocuments();
  if (count === 0) {
    const sample = [
      { name: 'John Doe', age: 20, department: 'Computer Science' },
      { name: 'Jane Smith', age: 22, department: 'Electronics' },
      { name: 'Arun Kumar', age: 21, department: 'Mechanical' },
    ];
    await Student.insertMany(sample);
    console.log('Seeded sample students');
  }
}

(async () => {
  await connectDB();
  await seedIfEmpty();
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})();
