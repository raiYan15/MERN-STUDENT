from flask import Flask, request, jsonify, send_file, g
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from flask_bcrypt import Bcrypt
from datetime import timedelta
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os
import tempfile
import MySQLdb.cursors
import matplotlib.pyplot as plt
from flask import send_file
import io
from flask import request
import pywhatkit as pwk
import pyautogui
import time
from datetime import datetime, timedelta


app = Flask(__name__)
# Allow the development frontends (127.0.0.1 and localhost on common dev ports) to access the API
# Configure explicit origins instead of relying on defaults so browsers receive the Access-Control-Allow-Origin header
from datetime import timedelta as _dt
CORS(app, resources={r"/*": {"origins": [
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5500",
    "http://localhost:5173",
    "http://localhost:5500",
    "http://127.0.0.1:5174",
    "http://localhost:5174"
]}}, supports_credentials=False)

# MySQL Config
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_DB'] = 'todo'

mysql = MySQL(app)
bcrypt = Bcrypt(app)
app.config['JWT_SECRET_KEY'] = 'your_super_secret_key'
jwt = JWTManager(app)


def get_request_db_connection():
    """Create or reuse a request-scoped MySQL connection."""
    if 'mysql_connection' not in g:
        g.mysql_connection = MySQLdb.connect(
            host=app.config['MYSQL_HOST'],
            user=app.config['MYSQL_USER'],
            passwd=app.config['MYSQL_PASSWORD'],
            db=app.config['MYSQL_DB']
        )
    return g.mysql_connection


class _RequestConnectionProxy:
    def cursor(self, cursorclass=None):
        connection = get_request_db_connection()
        if cursorclass is not None:
            return connection.cursor(cursorclass)
        return connection.cursor()

    def commit(self):
        return get_request_db_connection().commit()

    def close(self):
        connection = g.pop('mysql_connection', None)
        if connection is not None:
            connection.close()


# Flask-MySQLdb can return a None connection in this environment, so expose a
# drop-in proxy that opens a standard MySQLdb connection per request instead.
MySQL.connection = property(lambda self: _RequestConnectionProxy())


@app.teardown_appcontext
def close_mysql_connection(exception=None):
    connection = g.pop('mysql_connection', None)
    if connection is not None:
        connection.close()


def get_db_cursor(dict_cursor=False):
    """Return a MySQL cursor or None if DB connection isn't available."""
    try:
        if dict_cursor:
            return mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        return mysql.connection.cursor()
    except Exception:
        return None

# simple landing page for the backend root URL
@app.route('/')
def index():
        return """
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Workflow Backend Dashboard</title>
            <style>
                :root {
                    color-scheme: light;
                    --bg: #0f172a;
                    --panel: rgba(15, 23, 42, 0.78);
                    --card: rgba(255, 255, 255, 0.08);
                    --text: #e2e8f0;
                    --muted: #94a3b8;
                    --accent: #38bdf8;
                    --accent-2: #22c55e;
                    --border: rgba(148, 163, 184, 0.22);
                }
                * { box-sizing: border-box; }
                body {
                    margin: 0;
                    font-family: Inter, Segoe UI, Arial, sans-serif;
                    background:
                        radial-gradient(circle at top, rgba(56, 189, 248, 0.22), transparent 35%),
                        radial-gradient(circle at bottom right, rgba(34, 197, 94, 0.18), transparent 32%),
                        linear-gradient(160deg, #020617 0%, #0f172a 50%, #111827 100%);
                    color: var(--text);
                    min-height: 100vh;
                    display: grid;
                    place-items: center;
                    padding: 24px;
                }
                .shell {
                    width: min(920px, 100%);
                    background: var(--panel);
                    border: 1px solid var(--border);
                    border-radius: 24px;
                    backdrop-filter: blur(14px);
                    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.35);
                    overflow: hidden;
                }
                .hero {
                    padding: 40px;
                    border-bottom: 1px solid var(--border);
                }
                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 14px;
                    border-radius: 999px;
                    background: rgba(56, 189, 248, 0.12);
                    color: #7dd3fc;
                    font-size: 0.9rem;
                    font-weight: 600;
                    letter-spacing: 0.02em;
                }
                h1 {
                    margin: 18px 0 10px;
                    font-size: clamp(2rem, 5vw, 3.6rem);
                    line-height: 1.05;
                }
                .lead {
                    margin: 0;
                    max-width: 58ch;
                    color: var(--muted);
                    font-size: 1.03rem;
                    line-height: 1.7;
                }
                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 16px;
                    padding: 24px 40px 40px;
                }
                .card {
                    background: var(--card);
                    border: 1px solid var(--border);
                    border-radius: 18px;
                    padding: 18px;
                }
                .card h2 {
                    margin: 0 0 10px;
                    font-size: 1.05rem;
                }
                .card p, .card a {
                    margin: 0;
                    color: var(--muted);
                    line-height: 1.65;
                    word-break: break-word;
                }
                .links {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    margin-top: 18px;
                }
                .btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 12px 18px;
                    border-radius: 12px;
                    text-decoration: none;
                    font-weight: 700;
                    transition: transform 0.15s ease, opacity 0.15s ease;
                }
                .btn:hover { transform: translateY(-1px); opacity: 0.95; }
                .primary { background: linear-gradient(135deg, var(--accent), #60a5fa); color: white; }
                .secondary { background: rgba(255, 255, 255, 0.08); color: var(--text); border: 1px solid var(--border); }
                .status {
                    color: #86efac;
                    font-weight: 700;
                }
                code {
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid var(--border);
                    padding: 2px 6px;
                    border-radius: 8px;
                    color: #e2e8f0;
                }
            </style>
        </head>
        <body>
            <main class="shell">
                <section class="hero">
                    <div class="badge">⚡ Workflow Backend Dashboard</div>
                    <h1>Backend is running smoothly.</h1>
                    <p class="lead">
                        This landing page confirms the Flask backend is alive and ready.
                        Use the links below to jump to the frontend or inspect the API routes.
                    </p>
                    <div class="links">
                        <a class="btn primary" href="http://127.0.0.1:5173/">Open Frontend</a>
                        <a class="btn secondary" href="http://127.0.0.1:5173/home.html">Open Home Page</a>
                    </div>
                </section>

                <section class="grid">
                    <article class="card">
                        <h2>Status</h2>
                        <p class="status">Healthy</p>
                        <p>Flask app is responding at <code>/</code>.</p>
                    </article>
                    <article class="card">
                        <h2>Frontend</h2>
                        <p>Open the user interface on port 5173 to access the CRM pages.</p>
                    </article>
                    <article class="card">
                        <h2>Next steps</h2>
                        <p>Connect the UI forms to the API endpoints and database actions.</p>
                    </article>
                </section>
            </main>
        </body>
        </html>
        """

#sendmessage through whatsapp

@app.route('/send_whatsapp', methods=['POST'])
def send_whatsapp():
    data = request.json
    student_id = data['student_id']
    task_id = data['task_id']

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    # Get student phone number
    cursor.execute("SELECT studentphn FROM student WHERE studentid = %s", (student_id,))
    student = cursor.fetchone()
    if not student:
        return jsonify({"message": "Student not found"}), 404

    phone_number = "+91" + str(student['studentphn'])

    # Get task description
    cursor.execute("SELECT task_description FROM todo_list WHERE serial_number = %s", (task_id,))
    task = cursor.fetchone()
    if not task:
        return jsonify({"message": "Task not found"}), 404

    message = task['task_description']

    # Get current time + 2 minutes
    now = datetime.now() + timedelta(minutes=2)
    hour = now.hour
    minute = now.minute

    try:
        print(f"Sending message to {phone_number} at {hour}:{minute}")
        time.sleep(30)
        pwk.sendwhatmsg(phone_number, message, hour, minute)
        time.sleep(30)
        time.sleep(15)
        pyautogui.press('enter')
        time.sleep(2)
        time.sleep(30)
        return jsonify({"message": "Message scheduled to be sent!"})
    except Exception as e:
        print(f"Error sending message: {str(e)}")
        return jsonify({"message": f"Failed to send: {str(e)}"}), 500
#1.register amin here
@app.route('/adminregister', methods=['POST'])
def admin_register():
    data = request.json
    name = data.get('adminname') or data.get('uname')
    email = data.get('adminemail') or data.get('uemail')
    password = data.get('adminpass') or data.get('upassword')

    if not name or not email or not password:
        return jsonify({'message': 'Missing registration fields'}), 400

    cur = get_db_cursor()
    if cur is None:
        return jsonify({'message': 'Database connection error'}), 500
    cur.execute("SELECT 1 FROM admin WHERE adminemail = %s", (email,))
    if cur.fetchone():
        return jsonify({'message': 'Admin already exists'}), 409

    hashed = bcrypt.generate_password_hash(password).decode('utf-8')
    cur.execute("INSERT INTO admin (adminname, adminemail, adminpass) VALUES (%s, %s, %s)",
                (name, email, hashed))
    mysql.connection.commit()
    return jsonify({'message': 'Registration successful'}),201


#2.admin login
@app.route('/adminlogin', methods=['POST'])
def admin_login():
    data = request.json
    email = data.get('adminemail')
    password = data.get('adminpass')

    if not email or not password:
        return jsonify({'error': 'Missing credentials'}), 400

    cur = get_db_cursor(dict_cursor=True)
    if cur is None:
        return jsonify({'error': 'Database connection error'}), 500
    cur.execute("SELECT adminid, adminname, adminemail, adminpass FROM admin WHERE adminemail = %s", (email,))
    user = cur.fetchone()

    if not user:
        return jsonify({'message': 'Email ID not found'}), 404

    if bcrypt.check_password_hash(user['adminpass'], password):
        token = create_access_token(identity=user['adminid'], expires_delta=timedelta(hours=1))
        return jsonify({
            'message': 'Login successful',
            'access_token': token,
            'adminid': user['adminid'],
            'adminname': user['adminname'],
            'adminemail': user['adminemail']
        }), 200
    else:
        return jsonify({'message': 'Incorrect password'}), 401


#3.add faculty
@app.route('/add_faculty', methods=['POST'])
def add_faculty():
    data = request.json
    name = data.get('facultyname')
    email = data.get('facultyemail')
    password = data.get('facultypass')

    if not name or not email or not password:
        return jsonify({'error': 'Missing fields'}), 400

    hashed = bcrypt.generate_password_hash(password).decode('utf-8')
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO faculty (facultyname, facultyemail, facultypassword) VALUES (%s, %s, %s)",
                (name, email, hashed))
    mysql.connection.commit()
    return jsonify({'message': 'Faculty added successfully'}), 201



#4.faculty Login
@app.route('/facultylogin', methods=['POST'])
def faculty_login():
    data = request.json
    email = data.get('facultyemail')
    password = data.get('facultypass')

    if not email or not password:
        return jsonify({'error': 'Missing fields'}), 400

    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("SELECT * FROM faculty WHERE facultyemail = %s", (email,))
    faculty = cur.fetchone()

    if not faculty or not bcrypt.check_password_hash(faculty['facultypassword'], password):
        return jsonify({'error': 'Invalid credentials'}), 401

    access_token = create_access_token(identity={'facultyid': faculty['facultyid'], 'facultyname': faculty['facultyname']})
    return jsonify({
        'message': 'Login successful',
        'facultyid': faculty['facultyid'],
        'facultyname': faculty['facultyname'],
        'access_token': access_token
    }), 200


#5.student Login
@app.route('/studentlogin', methods=['POST'])
def student_login():
    data = request.json
    email = data.get('studentemail')
    password = data.get('studentpassword')

    if not email or not password:
        return jsonify({'error': 'Missing fields'}), 400

    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("SELECT * FROM student WHERE studentmail = %s", (email,))
    student = cur.fetchone()

    if not student or not bcrypt.check_password_hash(student['studentpassword'], password):
        return jsonify({'error': 'Invalid credentials'}), 401

    access_token = create_access_token(identity={'studentid': student['studentid'], 'studentname': student['studentname']})
    return jsonify({
        'message': 'Login successful',
        'studentid': student['studentid'],
        'studentname': student['studentname'],
        'access_token': access_token
    }), 200

#6.add student
@app.route('/add_student', methods=['POST'])
def add_student():
    data = request.json
    s_name = data.get('studentname')
    s_email = data.get('studentemail')
    s_password = data.get('studentpassword')    
    faculty_id = data.get('facultyid')
    studentphn = data.get('studentphn')

    if not s_name or not s_email or not s_password or not faculty_id or not studentphn:
        return jsonify({'error': 'Missing fields'}), 400

    cur = mysql.connection.cursor()
    
    # Verify faculty exists
    cur.execute("SELECT 1 FROM faculty WHERE facultyid = %s", (faculty_id,))
    if not cur.fetchone():
        return jsonify({'error': 'Faculty not found'}), 404

    # Check if student email already exists
    cur.execute("SELECT 1 FROM student WHERE studentmail = %s", (s_email,))
    if cur.fetchone():
        return jsonify({'error': 'Student already exists'}), 409

    # Hash password
    hashed_password = bcrypt.generate_password_hash(s_password).decode('utf-8')

    # Insert student
    cur.execute("""
        INSERT INTO student (studentname, studentmail, studentpassword, facultyid, studentphn)
        VALUES (%s, %s, %s, %s, %s)
    """, (s_name, s_email, hashed_password, faculty_id, studentphn))
    mysql.connection.commit()

    return jsonify({'message': 'Student added successfully'}), 201


#7.add progress
@app.route('/add_progress', methods=['POST']) 
def add_progress():
    data = request.json
    print("Received data:", data)  # Log incoming JSON
    
    student_id = data.get('student_id')
    date = data.get('date')  
    status = data.get('status')
    todo_id = data.get('todo_id')  

    missing_fields = []
    if not student_id:
        missing_fields.append('student_id')
    if not date:
        missing_fields.append('date')
    if not status:
        missing_fields.append('status')
    if not todo_id:
        missing_fields.append('todo_id')

    if missing_fields:
        return jsonify({'error': f'Missing fields: {", ".join(missing_fields)}'}), 400

    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO student_progress (student_id, date, status, todo_id)
            VALUES (%s, %s, %s, %s)
        """, (student_id, date, status, todo_id))
        mysql.connection.commit()
        cur.close()
    except Exception as e:
        print("DB Error:", e)
        return jsonify({'error': 'Database error'}), 500
    
    return jsonify({'message': 'Progress note added'}), 201


#8.view progress
@app.route('/get_progress', methods=['GET'])
def get_progress():
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("""
        SELECT sp.*, t.task_description 
        FROM student_progress sp
        LEFT JOIN todo_list t ON sp.todo_id = t.serial_number
        ORDER BY sp.date DESC
    """)
    progress = cur.fetchall()
    return jsonify(progress), 200


#9.view all students under a faculty
@app.route('/viewallfaculties', methods=['GET'])
def view_all_faculties():
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("SELECT * FROM faculty")
    faculties = cur.fetchall()
    return jsonify(faculties), 200


#10.view all students
@app.route('/viewallstudents', methods=['GET'])
def view_all_students():
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("SELECT * FROM student")
    students = cur.fetchall()
    return jsonify(students), 200



#11.view all progress of a student
@app.route('/update_progress_status', methods=['PUT'])
def update_progress_status():
    data = request.get_json()
    student_id = data.get('student_id')
    todo_id = data.get('todo_id')  # Now using todo_id instead of just date
    status = data.get('status')

    if not all([student_id, todo_id, status]):
        return jsonify({"error": "Missing student_id, todo_id or status"}), 400

    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            UPDATE student_progress
            SET status = %s
            WHERE student_id = %s AND todo_id = %s
        """, (status, student_id, todo_id))
        mysql.connection.commit()
        rowcount = cur.rowcount
        cur.close()

        if rowcount == 0:
            return jsonify({"message": "No matching record found"}), 404

        return jsonify({"message": "Progress status updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500




#12.add to do
@app.route('/add_todo', methods=['POST'])
def add_todo():
    data = request.get_json()
    facultyid = data.get('facultyid')
    task_description = data.get('task_description')
    dead_line = data.get('dead_line')  # "YYYY-MM-DD HH:MM:SS"

    if not all([facultyid, task_description, dead_line]):
        return {"error": "Missing fields"}, 400

    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO todo_list (facultyid, task_description, dead_line)
            VALUES (%s, %s, %s)
        """, (facultyid, task_description, dead_line))
        mysql.connection.commit()

        # Get the inserted row id
        serial_number = cur.lastrowid
        cur.close()

        return {"serial_number": serial_number}, 201
    except Exception as e:
        return {"error": str(e)}, 500



    # 1. Get all student IDs linked to the faculty
    cur.execute("SELECT studentid FROM student WHERE facultyid = %s", (facultyid,))
    students = cur.fetchall()  # List of tuples: [(1,), (2,), (3,)...]
    
    if not students:
        return {"error": "No students found for this faculty"}, 404

    # 2. Insert todo task for each student
    for (studentid,) in students:
        cur.execute("""
            INSERT INTO todo_list (facultyid, studentid, task_description, dead_line)
            VALUES (%s, %s, %s, %s)
        """, (facultyid, studentid, task_description, dead_line))

    mysql.connection.commit()
    cur.close()

    return {"message": f"Todo task added successfully for {len(students)} students"}

#13.viewall todo
@app.route('/view_all_todo', methods=['GET'])
def view_all_todo():
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT serial_number, facultyid, studentid, task_description, dead_line 
        FROM todo_list
        ORDER BY dead_line ASC
    """)
    todos = cur.fetchall()
    cur.close()

    result = []
    for todo in todos:
        result.append({
            "serial_number": todo[0],
            "facultyid": todo[1],
            "studentid": todo[2],
            "task_description": todo[3],
            "dead_line": str(todo[4])
        })

    return jsonify(result)

#14.Edit student
@app.route('/edit_student/<int:studentid>', methods=['PUT'])
def edit_student(studentid):
    data = request.get_json()

    studentname = data.get('studentname')
    studentmail = data.get('studentmail')
    
    studentphn = data.get('studentphn')
    facultyid = data.get('facultyid')

    cur = mysql.connection.cursor()
    cur.execute("""
        UPDATE student 
        SET studentname = %s, studentmail = %s, studentphn = %s, facultyid = %s 
        WHERE studentid = %s
    """, (studentname, studentmail, studentphn, facultyid, studentid))
    
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "Student updated successfully"})


#15.Edit faculty
@app.route('/edit_faculty/<int:facultyid>', methods=['PUT'])
def edit_faculty(facultyid):
    data = request.get_json()

    facultyname = data.get('facultyname')
    facultyemail = data.get('facultyemail')
   

    cur = mysql.connection.cursor()
    cur.execute("""
        UPDATE faculty 
        SET facultyname = %s, facultyemail = %s
        WHERE facultyid = %s
    """ ,(facultyname, facultyemail, facultyid))
    
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "Faculty updated successfully"})

#16.to download todo list
@app.route('/download_todo/<int:studentid>', methods=['GET'])
def download_todo_report(studentid):
    cur = mysql.connection.cursor()

    # Get student and faculty names
    cur.execute("""
        SELECT s.studentname, f.facultyname 
        FROM student s
        JOIN faculty f ON s.facultyid = f.facultyid
        WHERE s.studentid = %s
    """, (studentid,))
    data = cur.fetchone()

    if not data:
        return {"error": "Student not found"}, 404

    studentname, facultyname = data

    # Fetch to-do list items
    cur.execute("""
        SELECT task_description, dead_line 
        FROM todo_list 
        WHERE studentid = %s 
        ORDER BY dead_line ASC
    """, (studentid,))
    todos = cur.fetchall()

    # Generate PDF
    filename = f"todo_student_{studentid}.pdf"
    temp_dir = tempfile.gettempdir()
    filepath = os.path.join(temp_dir, filename)

    pdf = canvas.Canvas(filepath, pagesize=letter)
    width, height = letter

    # Header
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(50, height - 50, f"To-Do List for {studentname}")
    pdf.setFont("Helvetica", 12)
    pdf.drawString(50, height - 70, f"Faculty Assigned: {facultyname}")

    y = height - 100
    pdf.setFont("Helvetica", 11)

    if not todos:
        pdf.drawString(50, y, "No tasks assigned.")
    else:
        for task, deadline in todos:
            if y < 80:
                pdf.showPage()
                y = height - 50
                pdf.setFont("Helvetica", 11)

            pdf.drawString(50, y, f"Deadline: {deadline}")
            y -= 15
            text_obj = pdf.beginText(60, y)
            text_obj.textLines(f"Task: {task}")
            pdf.drawText(text_obj)
            y -= 15 * (task.count('\n') + 1) + 10

    pdf.showPage()
    pdf.save()
    return send_file(filepath, as_attachment=True, download_name=filename)


#17.get to do by particular id
@app.route('/get_todos/<int:studentid>', methods=['GET'])
def get_todos_by_student(studentid):
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT serial_number, facultyid, task_description, dead_line 
        FROM todo_list 
        WHERE studentid = %s 
        ORDER BY dead_line ASC
    """, (studentid,))
    
    todos = cur.fetchall()
    cur.close()

    todo_list = []
    for todo in todos:
        todo_list.append({
            "serial_number": todo[0],
            "facultyid": todo[1],
            "task_description": todo[2],
            "dead_line": todo[3].strftime("%Y-%m-%d %H:%M:%S")
        })

    return jsonify(todo_list)

#18.send messeges through whatsapp


#Student progreess report(pie chart)
@app.route('/student_progress_pie/<int:studentid>', methods=['GET'])
def student_progress_pie(studentid):
    cur = mysql.connection.cursor()

    cur.execute("""
        SELECT status, COUNT(*) FROM student_progress
        WHERE student_id = %s
        GROUP BY status
    """, (studentid,))
    results = cur.fetchall()
    cur.close()

    if not results:
        return {"message": "No progress data found for this student."}, 404

    labels = [row[0] for row in results]
    sizes = [row[1] for row in results]

    # Generate Pie Chart
    plt.figure(figsize=(6, 6))
    plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=140)
    plt.title('Student Progress Distribution')

    # Save to in-memory file
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()

    return send_file(img, mimetype='image/png')


@app.route('/assign_task_and_progress', methods=['POST'])
def assign_task_and_progress():
    data = request.get_json()
    faculty_id = data.get('faculty_id')
    task_description = data.get('task_description')
    deadline = data.get('deadline')  # format: YYYY-MM-DD

    if not all([faculty_id, task_description, deadline]):
        print("❌ Missing required fields")
        return jsonify({"error": "Missing required fields"}), 400

    try:
        cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        # Get all students under the faculty
        cur.execute("SELECT studentid FROM student WHERE facultyid = %s", (faculty_id,))
        students = cur.fetchall()
        print(f"✅ Found {len(students)} students for faculty ID {faculty_id}")

        if not students:
            return jsonify({"error": "No students found for this faculty"}), 404

        today = datetime.today().strftime('%Y-%m-%d')

        # Insert a separate task + progress for each student
        for student in students:
            studentid = student['studentid']

            # Insert into todo_list for each student
            cur.execute("""
                INSERT INTO todo_list (facultyid, studentid, task_description, dead_line)
                VALUES (%s, %s, %s, %s)
            """, (faculty_id, studentid, task_description, deadline))
            mysql.connection.commit()
            todo_id = cur.lastrowid

            print(f"📝 Inserted task for student {studentid}, todo_id = {todo_id}")

            # Insert progress entry
            cur.execute("""
                INSERT INTO student_progress (student_id, date, status, todo_id)
                VALUES (%s, %s, %s, %s)
            """, (studentid, today, 'not completed', todo_id))

        mysql.connection.commit()
        cur.close()

        print("✅ All todo_list and progress entries inserted successfully.")
        return jsonify({"message": "Tasks and progress entries added for each student."}), 201

    except Exception as e:
        print("❌ ERROR:", str(e))
        return jsonify({"error": str(e)}), 500
    

@app.route('/student_details/<int:studentid>', methods=['GET'])
def student_details(studentid):
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    query = """
        SELECT s.studentname, s.studentmail, f.facultyname
        FROM student s
        JOIN faculty f ON s.facultyid = f.facultyid
        WHERE s.studentid = %s
    """
    cur.execute(query, (studentid,))
    student = cur.fetchone()
    if student:
        return jsonify(student), 200
    else:
        return jsonify({"error": "Student not found"}), 404
    
@app.route("/get_faculty_data/<int:faculty_id>")
def get_faculty_data(faculty_id):
    cur = mysql.connection.cursor()
    
    # Get tasks
    cur.execute("SELECT serial_number, task_description FROM todo_list WHERE facultyid = %s", (faculty_id,))
    tasks = [{"serial_number": t[0], "task_description": t[1]} for t in cur.fetchall()]

    # Get students
    cur.execute("SELECT studentid, studentname FROM student WHERE facultyid = %s", (faculty_id,))
    students = [{"studentid": s[0], "studentname": s[1]} for s in cur.fetchall()]
    
    cur.close()
    return jsonify({"tasks": tasks, "students": students})


if __name__ == '__main__':
    app.run(debug=True)