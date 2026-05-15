Here's a comprehensive *README.md* file for your *CRM for Workflow Management System* built using *Flask and MySQL*, based on the database structure and features you've implemented:

---

markdown
# CRM for Workflow Management System

A web-based CRM (Customer Relationship Management) system designed to streamline task workflows between administrators, faculty, and students. This platform is useful for managing assignments, tracking progress, and enabling real-time updates within an academic or organizational setup.

## 🛠 Tech Stack

- **Backend**: Python (Flask)
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MySQL
- **Authentication**: JWT
- **Visualization**: Chart.js (for progress visualization), ReportLab (for PDF generation)
- **Automation**: pywhatkit, pyautogui (for WhatsApp task reminders)

---

## 📁 Database Schema

### Tables:

- **admin**
  - `adminid`, `adminname`, `adminemail`, `adminpass`

- **faculty**
  - `facultyid`, `facultyname`, `facultyemail`, `facultypassword`

- **student**
  - `studentid`, `studentname`, `studentmail`, `studentpassword`, `studentphn`, `facultyid`

- **todo_list**
  - `serial_number`, `facultyid`, `studentid`, `task_description`, `dead_line`

- **student_progress**
  - `student_id`, `date`, `status`

---

## 👤 User Roles and Features

### 🔐 Admin
- Login: `/adminlogin`
- Add/Edit/Delete:
  - Faculty: `/add_faculty`, `/edit_faculty/<id>`, `/delete_faculty/<id>`
  - Student: `/add_student`, `/edit_student/<id>`, `/delete_student/<id>`

### 👨‍🏫 Faculty
- Login: `/facultylogin`
- View Assigned Students
- Manage Tasks:
  - Add Task: `/add_todo`
  - View Tasks: `/get_todo`
- Track Progress:
  - Add: `/add_progress`
  - Update: `/update_progress`
  - Visualize: `/student_progress_chart/<studentid>`

### 👨‍🎓 Student
- Login: `/studentlogin`
- View Tasks: `/get_todo/<studentid>`
- Update Progress: `/update_progress`

---

## 📦 Extra Features

- **Report Download**: PDF reports via `/download_report/<studentid>`
- **WhatsApp Reminders**:
  - Message students 30 minutes before task deadlines using `pywhatkit` and `pyautogui`
  - Scheduled using task deadline from `todo_list` and student's `studentphn`

---

## 📩 How to Test Using Postman

### 1. Admin Login



POST /adminlogin
{
"adminemail": "[admin@example.com](mailto:admin@example.com)",
"adminpass": "admin123"
}



### 2. Add Student



POST /add\_student
{
"studentname": "John Doe",
"studentmail": "[john@example.com](mailto:john@example.com)",
"studentpassword": "123456",
"studentphn": "9876543210",
"facultyid": 1
}



### 3. Add ToDo



POST /add\_todo
{
"facultyid": 1,
"studentid": 2,
"task\_description": "Submit assignment",
"dead\_line": "2025-06-01 10:00:00"
}



### 4. Update Progress



PUT /update\_progress
{
"student\_id": 2,
"date": "2025-06-01",
"status": "Completed"
}



---

## 📂 Project Structure



/project-root
│
├── Frontend/            # HTML, CSS, JavaScript, and UI config files
│   ├── index.html
│   ├── home.html
│   ├── styles.css
│   ├── script.js
│   └── ...
├── Backend/             # Flask app, SQL, and backend utilities
│   ├── app.py
│   ├── DATABASE FOR WORKFLOW.sql
│   ├── PyWhatKit_DB.txt
│   └── submit request.php
└── README.md            # Project documentation

`

---

## ⚙ Setup Instructions

1. Clone the repository
2. Set up your MySQL database:
   sql
   CREATE DATABASE todo;
   USE todo;
   -- Run table creation SQL
`

3. Install Python dependencies:

   
   pip install -r requirements.txt
   
4. Run the Flask server from the `Backend` folder:

   
   python app.py
   
5. Open Postman or frontend UI to test APIs.

---

## 📈 Visualizations

* Pie charts for student progress per task
* PDF downloadable reports
* Real-time messaging integration for reminders

---

## 🔒 Security Notes

* JWT token-based authentication
* Admin access is required for critical endpoints (student/faculty management)

---

## 📞 WhatsApp Notification Sample

Automatically sends message to student’s phone number 30 minutes before the deadline using:

python
pwk.sendwhatmsg(phone_number, message, hour, minute)


---

## 🙌 Contribution

This project created under API design and devolopment hackathon

---

## 📃 License

This Project is only for Education purposes



---


```