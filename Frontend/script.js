
// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('show');
    });

  // Ensure all close-modal buttons work everywhere
document.querySelectorAll('.close-modal').forEach(btn => {
  btn.addEventListener('click', function() {
    this.closest('.modal').style.display = 'none';
  });
});
// Edit Student functionality
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('edit-btn') && e.target.closest('#student-table-body')) {
    const studentId = e.target.getAttribute('data-id');
    const student = mockStudents.find(s => s.id === studentId);
    if (student) {
      // Open the Add Student Modal as Edit Modal
      const modal = document.getElementById('add-student-modal');
      if (modal) {
        modal.style.display = 'block';
        // Pre-fill form
        document.getElementById('student-name').value = student.name;
        document.getElementById('student-dob').value = student.dob;
        document.getElementById('student-join-date').value = student.joinDate;
        document.getElementById('student-fee').value = student.fee;
        document.getElementById('student-parent-id').value = student.parentId;

        // Change form submission to Edit mode
        const form = document.getElementById('add-student-form');
        form.onsubmit = function(e) {
          e.preventDefault();
          student.name = document.getElementById('student-name').value;
          student.dob = document.getElementById('student-dob').value;
          student.joinDate = document.getElementById('student-join-date').value;
          student.fee = parseInt(document.getElementById('student-fee').value);
          student.parentId = document.getElementById('student-parent-id').value;
          
          modal.style.display = 'none';
          loadAdminDashboard();
          alert(`Student ${student.id} updated successfully`);
        }
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  loadAdminDashboard(); // Initial load

  // ✅ Edit Student
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('edit-student-btn')) {
      const studentId = e.target.getAttribute('data-id');
      const student = mockStudents.find(s => s.id === studentId);
      if (student) {
        const modal = document.getElementById('add-student-modal');
        if (modal) {
          modal.style.display = 'block';
          document.getElementById('student-name').value = student.name;
          document.getElementById('student-dob').value = student.dob;
          document.getElementById('student-join-date').value = student.joinDate;
          document.getElementById('student-fee').value = student.fee;
          document.getElementById('student-parent-id').value = student.parentId;

          const form = document.getElementById('add-student-form');
          form.onsubmit = function (e) {
            e.preventDefault();
            student.name = document.getElementById('student-name').value;
            student.dob = document.getElementById('student-dob').value;
            student.joinDate = document.getElementById('student-join-date').value;
            student.fee = parseInt(document.getElementById('student-fee').value);
            student.parentId = document.getElementById('student-parent-id').value;

            modal.style.display = 'none';
            loadAdminDashboard();
            alert(`Student ${student.id} updated successfully`);
          };
        }
      }
    }
  });

  // ✅ Delete Student
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('delete-student-btn')) {
      const studentId = e.target.getAttribute('data-id');
      const index = mockStudents.findIndex(s => s.id === studentId);
      if (index !== -1) {
        if (confirm(`Are you sure you want to delete student ${studentId}?`)) {
          mockStudents.splice(index, 1);
          loadAdminDashboard();
          alert(`Student ${studentId} deleted`);
        }
      }
    }
  });

  // ✅ Edit Faculty
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('edit-faculty-btn')) {
      const facultyId = e.target.getAttribute('data-id');
      const faculty = mockFaculty.find(f => f.id === facultyId);
      if (faculty) {
        const modal = document.getElementById('add-faculty-modal');
        if (modal) {
          modal.style.display = 'block';
          document.getElementById('faculty-name').value = faculty.name;
          document.getElementById('faculty-contact').value = faculty.contact;
          document.getElementById('faculty-id').value = faculty.id;
          document.getElementById('faculty-password').value = '********';

          const form = document.getElementById('add-faculty-form');
          form.onsubmit = function (e) {
            e.preventDefault();
            faculty.name = document.getElementById('faculty-name').value;
            faculty.contact = document.getElementById('faculty-contact').value;

            modal.style.display = 'none';
            loadAdminDashboard();
            alert(`Faculty ${faculty.id} updated successfully`);
          };
        }
      }
    }
  });

  // ✅ Delete Faculty
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('delete-faculty-btn')) {
      const facultyId = e.target.getAttribute('data-id');
      const index = mockFaculty.findIndex(f => f.id === facultyId);
      if (index !== -1) {
        if (confirm(`Are you sure you want to delete faculty ${facultyId}?`)) {
          mockFaculty.splice(index, 1);
          loadAdminDashboard();
          alert(`Faculty ${facultyId} deleted`);
        }
      }
    }
  });
});


  }
  // Logout functionality using class for multiple buttons
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('logout-btn')) {
    document.querySelectorAll('.dashboard-container').forEach(dash => {
      dash.style.display = 'none';
    });
    document.querySelector('main').style.display = 'block';
    window.scrollTo(0, 0);
  }
});


  // Role Selection
  const roleCards = document.querySelectorAll('.role-card');
  const loginFormContainer = document.getElementById('login-form-container');
  const loginForm = document.getElementById('login-form');
  const selectedRoleSpan = document.getElementById('selected-role');
  
  roleCards.forEach(card => {
    card.addEventListener('click', function() {
      // Remove selected class from all cards
      roleCards.forEach(c => c.classList.remove('selected'));
      
      // Add selected class to clicked card
      this.classList.add('selected');
      
      // Get the role type
      const roleType = this.getAttribute('data-role');
      
      // Update the login form action based on role
      if (loginForm) {
        loginForm.setAttribute('action', `/${roleType}_login`);
      }
      
      // Update the login title
      if (selectedRoleSpan) {
        selectedRoleSpan.textContent = this.querySelector('h3').textContent;
      }
      
      // Show login form
      if (loginFormContainer) {
        loginFormContainer.style.display = 'block';
        
        // Scroll to login form
        loginFormContainer.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Mock login functionality
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      // Check which role is selected
      const selectedRole = document.querySelector('.role-card.selected');
      
      if (!selectedRole) {
        alert('Please select a role first');
        return;
      }
      
      const roleType = selectedRole.getAttribute('data-role');
      
      // Very basic validation
      if (!username || !password) {
        alert('Please enter both username and password');
        return;
      }
      
      // In a real application, this would be sent to the server
      // For demo purposes, we'll just show the appropriate dashboard
      
    // Hide all dashboards first
document.querySelectorAll('.dashboard-container').forEach(dash => {
  dash.style.display = 'none';
});

// Hide main content
document.querySelector('main').style.display = 'none';

// Hide footer
document.querySelector('footer').style.display = 'none';

      
      // Show the appropriate dashboard
      if (roleType === 'admin') {
        document.getElementById('admin-dashboard').style.display = 'block';
        loadAdminDashboard();
      } else if (roleType === 'faculty') {
        document.getElementById('faculty-dashboard').style.display = 'block';
        loadFacultyDashboard();
      } else if (roleType === 'parent') {
        document.getElementById('parent-dashboard').style.display = 'block';
        loadParentDashboard();
      }
    });
  }
  
  // Tab System
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get the tab to activate
      const tabToActivate = this.getAttribute('data-tab');
      
      // Get all tab contents in the same group
      const tabsContainer = this.closest('.tabs').parentNode;
      const tabContents = tabsContainer.querySelectorAll('.tab-content');
      
      // Deactivate all tabs
      const tabButtonsInGroup = this.closest('.tabs').querySelectorAll('.tab-btn');
      tabButtonsInGroup.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Activate the clicked tab
      this.classList.add('active');
      document.getElementById(`${tabToActivate}-tab`).classList.add('active');
    });
  });
  
  // Modal functionality
  const modalTriggers = [
    { trigger: 'add-student-btn', modal: 'add-student-modal' },
    { trigger: 'add-faculty-btn', modal: 'add-faculty-modal' }
  ];
  
  modalTriggers.forEach(item => {
    const triggerBtn = document.getElementById(item.trigger);
    const modal = document.getElementById(item.modal);
    
    if (triggerBtn && modal) {
      // Open modal
      triggerBtn.addEventListener('click', function() {
        modal.style.display = 'block';
      });
      
      // Close modal
      const closeBtn = modal.querySelector('.close-modal');
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          modal.style.display = 'none';
        });
      }
      
      // Close when clicking outside
      window.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }
  });
  
  // Form submissions
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Prevent actual form submission
      e.preventDefault();
      
      const formId = this.getAttribute('id');
      
      // Handle different forms
      switch (formId) {
        case 'add-student-form':
          addStudent(this);
          break;
        case 'add-faculty-form':
          addFaculty(this);
          break;
        case 'add-note-form':
          addProgressNote(this);
          break;
      }
      
      // Close the modal if this form is in a modal
      const modal = this.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
      }
      
      // Reset form
      this.reset();
    });
  });
  
  // Chat functionality in Parent Dashboard
  const chatMessageInput = document.getElementById('chat-message');
  const sendMessageBtn = document.getElementById('send-message');
  
  if (chatMessageInput && sendMessageBtn) {
    sendMessageBtn.addEventListener('click', sendChatMessage);
    
    // Also send on Enter key
    chatMessageInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });
  }
  
  // Filter progress notes functionality
  const fromDateInput = document.getElementById('from-date');
  const toDateInput = document.getElementById('to-date');
  const resetFilterBtn = document.getElementById('reset-filter');
  
  if (fromDateInput && toDateInput) {
    fromDateInput.addEventListener('change', filterProgressNotes);
    toDateInput.addEventListener('change', filterProgressNotes);
    
    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', function() {
        fromDateInput.value = '';
        toDateInput.value = '';
        filterProgressNotes();
      });
    }
  }
  
  // Fee payment functionality
  document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('pay-fee-btn')) {
      const feeId = e.target.getAttribute('data-fee-id');
      payFee(feeId);
    }
    
    if (e.target && e.target.classList.contains('add-note-btn')) {
      const studentId = e.target.getAttribute('data-student-id');
      openAddNoteModal(studentId);
    }
    
    if (e.target && e.target.classList.contains('export-report-btn')) {
      const studentId = e.target.getAttribute('data-student-id');
      exportStudentReport(studentId);
    }
  });
});

// Mock data
const mockStudents = [
  { id: 'S001', name: 'Emma Johnson', dob: '2020-03-15', joinDate: '2023-01-10', fee: 250, parentId: 'P001', status: 'Active', assignedTo: 'F001' },
  { id: 'S002', name: 'Noah Williams', dob: '2019-06-22', joinDate: '2023-02-05', fee: 250, parentId: 'P002', status: 'Active', assignedTo: 'F001' },
  { id: 'S003', name: 'Olivia Brown', dob: '2020-11-07', joinDate: '2023-03-15', fee: 250, parentId: 'P003', status: 'Active', assignedTo: 'F002' },
  { id: 'S004', name: 'Liam Davis', dob: '2019-09-30', joinDate: '2023-02-20', fee: 250, parentId: 'P004', status: 'Inactive', assignedTo: 'F001' },
  { id: 'S005', name: 'Ava Miller', dob: '2020-07-18', joinDate: '2023-04-01', fee: 250, parentId: 'P005', status: 'Active', assignedTo: 'F001' },
];

const mockFaculty = [
  { id: 'F001', name: 'Sarah Johnson', contact: 'sarah.j@happykids.com' },
  { id: 'F002', name: 'Michael Brown', contact: 'michael.b@happykids.com' },
];

const mockProgressNotes = [
  { id: 'N001', studentId: 'S001', date: '2023-05-15', note: 'Emma showed great progress in recognizing colors today.', type: 'daily' },
  { id: 'N002', studentId: 'S001', date: '2023-05-14', note: 'Emma learned to count to 10 successfully.', type: 'achievement' },
  { id: 'N003', studentId: 'S001', date: '2023-05-13', note: 'Emma enjoyed story time and participated actively.', type: 'daily' },
  { id: 'N004', studentId: 'S001', date: '2023-05-12', note: 'Emma had difficulty sharing toys today. We discussed the importance of sharing.', type: 'concern' },
  { id: 'N005', studentId: 'S001', date: '2023-05-11', note: 'Emma drew a beautiful picture of her family.', type: 'achievement' },
  { id: 'N006', studentId: 'S002', date: '2023-05-15', note: 'Noah had trouble focusing during story time.', type: 'concern' },
  { id: 'N007', studentId: 'S005', date: '2023-05-15', note: 'Ava shared her toys willingly with others.', type: 'daily' },
];

const mockFees = [
  { id: 'F001', studentId: 'S001', month: 'May 2023', amount: 250, dueDate: '2023-05-10', status: 'Paid', paidDate: '2023-05-08' },
  { id: 'F002', studentId: 'S001', month: 'June 2023', amount: 250, dueDate: '2023-06-10', status: 'Unpaid' },
  { id: 'F003', studentId: 'S001', month: 'July 2023', amount: 250, dueDate: '2023-07-10', status: 'Unpaid' },
];

// Admin Dashboard Functions
function loadAdminDashboard() {
  const studentTableBody = document.getElementById('student-table-body');
  const facultyTableBody = document.getElementById('faculty-table-body');
  
  if (studentTableBody) {
    studentTableBody.innerHTML = '';
    
    mockStudents.forEach(student => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.dob}</td>
        <td>${student.joinDate}</td>
        <td>$${student.fee}</td>
        <td>${student.parentId}</td>
        <td>
          <button class="edit-btn" data-id="${student.id}">Edit</button>
          <button class="delete-btn" data-id="${student.id}">Delete</button>
        </td>
      `;
      
      studentTableBody.appendChild(row);
    });
  }
  // Event delegation for Edit and Delete buttons inside Admin dashboard
document.addEventListener('click', function(e) {
  // Delete Student
  if (e.target && e.target.classList.contains('delete-btn')) {
    const studentId = e.target.getAttribute('data-id');
    // Confirm before deleting
    if (confirm(`Are you sure you want to delete student with ID ${studentId}?`)) {
      const index = mockStudents.findIndex(s => s.id === studentId);
      if (index !== -1) {
        mockStudents.splice(index, 1);
        loadAdminDashboard(); // Refresh the table
        alert(`Student with ID ${studentId} has been deleted.`);
      }
    }
  }

  // Edit Student (simple mock, just showing alert - you can extend this to open a form)
  if (e.target && e.target.classList.contains('edit-btn')) {
    const studentId = e.target.getAttribute('data-id');
    const student = mockStudents.find(s => s.id === studentId);
    if (student) {
      alert(`Edit Student:\nID: ${student.id}\nName: ${student.name}\nDOB: ${student.dob}`);
      // You can open a pre-filled form here for actual edit (not implemented in this demo)
    }
  }

  // Delete Faculty
  if (e.target && e.target.classList.contains('delete-btn') && e.target.closest('#faculty-table-body')) {
    const facultyId = e.target.getAttribute('data-id');
    if (confirm(`Are you sure you want to delete faculty with ID ${facultyId}?`)) {
      const index = mockFaculty.findIndex(f => f.id === facultyId);
      if (index !== -1) {
        mockFaculty.splice(index, 1);
        loadAdminDashboard(); // Refresh the table
        alert(`Faculty with ID ${facultyId} has been deleted.`);
      }
    }
  }

  // Edit Faculty (simple mock)
  if (e.target && e.target.classList.contains('edit-btn') && e.target.closest('#faculty-table-body')) {
    const facultyId = e.target.getAttribute('data-id');
    const faculty = mockFaculty.find(f => f.id === facultyId);
    if (faculty) {
      alert(`Edit Faculty:\nID: ${faculty.id}\nName: ${faculty.name}\nContact: ${faculty.contact}`);
      // You can open a pre-filled form here for actual edit (not implemented in this demo)
    }
  }
});

  
  if (facultyTableBody) {
    facultyTableBody.innerHTML = '';
    
    mockFaculty.forEach(faculty => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${faculty.id}</td>
        <td>${faculty.name}</td>
        <td>${faculty.contact}</td>
        <td>
          <button class="edit-btn" data-id="${faculty.id}">Edit</button>
          <button class="delete-btn" data-id="${faculty.id}">Delete</button>
        </td>
      `;
      
      facultyTableBody.appendChild(row);
    });
  }
}

function addStudent(form) {
  // Get form values
  const name = form.querySelector('#student-name').value;
  const dob = form.querySelector('#student-dob').value;
  const joinDate = form.querySelector('#student-join-date').value;
  const fee = form.querySelector('#student-fee').value;
  const parentId = form.querySelector('#student-parent-id').value;
  
  // Create a new student object
  const newStudent = {
    id: `S00${mockStudents.length + 1}`,
    name,
    dob,
    joinDate,
    fee: parseInt(fee),
    parentId,
    status: 'Active',
    assignedTo: 'F001' // Default assignment
  };
  
  // Add to mock data
  mockStudents.push(newStudent);
  
  // Reload the student table
  loadAdminDashboard();
  
  // Show success message
  alert(`Student ${name} has been added successfully with ID: ${newStudent.id}`);
}

function addFaculty(form) {
  // Get form values
  const name = form.querySelector('#faculty-name').value;
  const contact = form.querySelector('#faculty-contact').value;
  const id = form.querySelector('#faculty-id').value;
  
  // Create a new faculty object
  const newFaculty = {
    id,
    name,
    contact
  };
  
  // Add to mock data
  mockFaculty.push(newFaculty);
  
  // Reload the faculty table
  loadAdminDashboard();
  
  // Show success message
  alert(`Faculty ${name} has been added successfully with ID: ${id}`);
}

// Faculty Dashboard Functions
function loadFacultyDashboard() {
  const facultyId = 'F001'; // Simulating logged-in faculty
  const facultyStudentTable = document.getElementById('faculty-student-table');
  const studentProgressCards = document.getElementById('student-progress-cards');
  const noteStudentSelect = document.getElementById('note-student');
  
  // Set current date for the note date input
  const noteDateInput = document.getElementById('note-date');
  if (noteDateInput) {
    const today = new Date().toISOString().split('T')[0];
    noteDateInput.value = today;
  }
  
  if (facultyStudentTable) {
    facultyStudentTable.innerHTML = '';
    
    // Filter students assigned to this faculty
    const assignedStudents = mockStudents.filter(student => 
      student.assignedTo === facultyId && student.status === 'Active'
    );
    
    assignedStudents.forEach(student => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.dob}</td>
        <td>${student.joinDate}</td>
        <td>${student.parentId}</td>
        <td>
          <button class="add-note-btn" data-student-id="${student.id}">Add Note</button>
          <button class="export-report-btn" data-student-id="${student.id}">Export Report</button>
        </td>
      `;
      
      facultyStudentTable.appendChild(row);
    });
    
    // Update student count
    if (document.getElementById('total-students-count')) {
      document.getElementById('total-students-count').textContent = assignedStudents.length;
    }
    
    // Populate student select in the add note form
    if (noteStudentSelect) {
      noteStudentSelect.innerHTML = '';
      
      assignedStudents.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = student.name;
        noteStudentSelect.appendChild(option);
      });
    }
  }
  
  if (studentProgressCards) {
    studentProgressCards.innerHTML = '';
    
    // Filter students assigned to this faculty
    const assignedStudents = mockStudents.filter(student => 
      student.assignedTo === facultyId && student.status === 'Active'
    );
    
    assignedStudents.forEach(student => {
      const studentNotes = mockProgressNotes.filter(note => note.studentId === student.id);
      
      const card = document.createElement('div');
      card.className = 'card mb-6';
      
      let notesHTML = '';
      
      if (studentNotes.length > 0) {
        notesHTML = studentNotes.map(note => `
          <div class="progress-note">
            <div class="progress-note-header">
              <p class="progress-note-date">${note.date}</p>
              <span class="note-type ${note.type}">${note.type}</span>
            </div>
            <p>${note.note}</p>
          </div>
        `).join('');
      } else {
        notesHTML = '<p class="text-muted">No notes available for this student.</p>';
      }
      
      card.innerHTML = `
        <div class="flex justify-between items-center mb-4">
          <h3>${student.name}</h3>
          <button class="add-note-btn" data-student-id="${student.id}">Add Note</button>
        </div>
        ${notesHTML}
      `;
      
      studentProgressCards.appendChild(card);
    });
    
    // Update notes count
    const thisWeekNotes = mockProgressNotes.filter(note => {
      const assignedStudents = mockStudents.filter(student => 
        student.assignedTo === facultyId && student.status === 'Active'
      );
      const assignedStudentIds = assignedStudents.map(student => student.id);
      
      const noteDate = new Date(note.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      return assignedStudentIds.includes(note.studentId) && noteDate >= weekAgo;
    });
    
    if (document.getElementById('notes-this-week')) {
      document.getElementById('notes-this-week').textContent = thisWeekNotes.length;
    }
    
    // Update achievements count
    const achievements = mockProgressNotes.filter(note => {
      const assignedStudents = mockStudents.filter(student => 
        student.assignedTo === facultyId && student.status === 'Active'
      );
      const assignedStudentIds = assignedStudents.map(student => student.id);
      
      return assignedStudentIds.includes(note.studentId) && note.type === 'achievement';
    });
    
    if (document.getElementById('achievements-count')) {
      document.getElementById('achievements-count').textContent = achievements.length;
    }
  }
}

function openAddNoteModal(studentId) {
  const modal = document.getElementById('add-note-modal');
  
  if (modal) {
    modal.style.display = 'block';
    
    // Set the selected student
    const noteStudentSelect = document.getElementById('note-student');
    if (noteStudentSelect && studentId) {
      noteStudentSelect.value = studentId;
    }
  }
}

function addProgressNote(form) {
  // Get form values
  const studentId = form.querySelector('#note-student').value;
  const date = form.querySelector('#note-date').value;
  const noteType = form.querySelector('#note-type').value;
  const noteContent = form.querySelector('#note-content').value;
  
  // Create a new note object
  const newNote = {
    id: `N00${mockProgressNotes.length + 1}`,
    studentId,
    date,
    note: noteContent,
    type: noteType
  };
  
  // Add to mock data
  mockProgressNotes.push(newNote);
  
  // Reload the progress notes
  loadFacultyDashboard();
  
  // Show success message
  const student = mockStudents.find(s => s.id === studentId);
  alert(`Progress note has been added for ${student.name}`);
}

function exportStudentReport(studentId) {
  const student = mockStudents.find(s => s.id === studentId);
  const studentNotes = mockProgressNotes.filter(note => note.studentId === studentId);
  
  // In a real app, this would generate a CSV or PDF report
  // For demo, we'll just show an alert
  alert(`Report for ${student.name} has been exported!`);
  
  console.log('Student Report:', {
    student,
    notes: studentNotes
  });
}

// Parent Dashboard Functions
function loadParentDashboard() {
  // Simulate logged-in parent
  const parentId = 'P001';
  
  // Get children for this parent
  const children = mockStudents.filter(student => student.parentId === parentId);
  
  // Show children cards
  const childCardsContainer = document.getElementById('child-cards');
  if (childCardsContainer) {
    childCardsContainer.innerHTML = '';
    
    children.forEach(child => {
      // Find assigned teacher
      const teacher = mockFaculty.find(faculty => faculty.id === child.assignedTo);
      
      const card = document.createElement('div');
      card.className = 'card child-card';
      
      card.innerHTML = `
        <div class="child-avatar">👧</div>
        <h2>${child.name}</h2>
        <p class="text-muted">${child.status === 'Active' ? 'Active Student' : 'Inactive Student'}</p>
        <div class="child-details">
          <div class="child-detail">
            <span>Teacher:</span>
            <span>${teacher ? teacher.name : 'Not Assigned'}</span>
          </div>
          <div class="child-detail">
            <span>Date of Birth:</span>
            <span>${child.dob}</span>
          </div>
          <div class="child-detail">
            <span>Enrolled Since:</span>
            <span>${child.joinDate}</span>
          </div>
        </div>
      `;
      
      childCardsContainer.appendChild(card);
      
      // Set teacher name in chat tab
      if (document.getElementById('teacher-name')) {
        document.getElementById('teacher-name').textContent = teacher ? teacher.name : 'Teacher';
      }
    });
    
    // Load progress notes for the first child
    if (children.length > 0) {
      loadProgressNotes(children[0].id);
      loadFees(children[0].id);
      
      // Add initial chat message
      const chatContainer = document.getElementById('chat-container');
      if (chatContainer) {
        chatContainer.innerHTML = `
          <div class="chat-message received">
            <div class="message-bubble">Hello! How can I help you today?</div>
            <div class="message-time">10:30 AM</div>
          </div>
        `;
      }
    }
  }
}

function loadProgressNotes(studentId) {
  const progressNotesContainer = document.getElementById('progress-notes-container');
  
  if (progressNotesContainer) {
    // Get notes for this student
    let notes = mockProgressNotes.filter(note => note.studentId === studentId);
    
    // Apply date filters if any
    const fromDate = document.getElementById('from-date').value;
    const toDate = document.getElementById('to-date').value;
    
    if (fromDate) {
      notes = notes.filter(note => new Date(note.date) >= new Date(fromDate));
    }
    
    if (toDate) {
      notes = notes.filter(note => new Date(note.date) <= new Date(toDate));
    }
    
    // Sort by date (newest first)
    notes.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (notes.length > 0) {
      progressNotesContainer.innerHTML = '';
      
      notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'card mb-4';
        
        noteElement.innerHTML = `
          <div class="progress-note-header">
            <p class="progress-note-date">${note.date}</p>
            <span class="note-type ${note.type}">${note.type}</span>
          </div>
          <p>${note.note}</p>
        `;
        
        progressNotesContainer.appendChild(noteElement);
      });
    } else {
      progressNotesContainer.innerHTML = `
        <div class="text-center py-12">
          <p class="text-muted">No progress notes found for the selected date range.</p>
        </div>
      `;
    }
  }
}

function filterProgressNotes() {
  // Get the first child
  const parentId = 'P001';
  const children = mockStudents.filter(student => student.parentId === parentId);
  
  if (children.length > 0) {
    loadProgressNotes(children[0].id);
  }
}

function loadFees(studentId) {
  const feesTable = document.getElementById('fees-table');
  
  if (feesTable) {
    // Get fees for this student
    const fees = mockFees.filter(fee => fee.studentId === studentId);
    
    if (fees.length > 0) {
      feesTable.innerHTML = '';
      
      fees.forEach(fee => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
          <td>${fee.month}</td>
          <td>$${fee.amount}</td>
          <td>${fee.dueDate}</td>
          <td><span class="fee-status ${fee.status.toLowerCase()}">${fee.status}</span></td>
          <td>${fee.paidDate || '-'}</td>
          <td>
            ${fee.status === 'Unpaid' 
              ? `<button class="pay-fee-btn" data-fee-id="${fee.id}">Pay Now</button>` 
              : `<button class="receipt-btn" data-fee-id="${fee.id}">Download Receipt</button>`
            }
          </td>
        `;
        
        feesTable.appendChild(row);
      });
      
      // Update fee summary
      updateFeeSummary(fees);
    }
  }
}

function updateFeeSummary(fees) {
  const totalFees = fees.reduce((sum, fee) => sum + fee.amount, 0);
  const paidAmount = fees.filter(fee => fee.status === 'Paid').reduce((sum, fee) => sum + fee.amount, 0);
  const pendingAmount = totalFees - paidAmount;
  
  document.getElementById('total-fees').textContent = `$${totalFees}`;
  document.getElementById('paid-amount').textContent = `$${paidAmount}`;
  document.getElementById('pending-amount').textContent = `$${pendingAmount}`;
}

function payFee(feeId) {
  // Find the fee
  const feeIndex = mockFees.findIndex(fee => fee.id === feeId);
  
  if (feeIndex !== -1) {
    // Update the fee status
    mockFees[feeIndex].status = 'Paid';
    mockFees[feeIndex].paidDate = new Date().toISOString().split('T')[0];
    
    // Reload fees
    const parentId = 'P001';
    const children = mockStudents.filter(student => student.parentId === parentId);
    
    if (children.length > 0) {
      loadFees(children[0].id);
    }
    
    // Show success message
    alert(`Fee for ${mockFees[feeIndex].month} has been paid successfully!`);
  }
}

// Chat functionality
function sendChatMessage() {
  const chatInput = document.getElementById('chat-message');
  const chatContainer = document.getElementById('chat-container');
  
  if (chatInput && chatContainer) {
    const message = chatInput.value.trim();
    
    if (message) {
      // Get current time
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      // Create parent message element
      const parentMsg = document.createElement('div');
      parentMsg.className = 'chat-message sent';
      
      parentMsg.innerHTML = `
        <div class="message-bubble">${message}</div>
        <div class="message-time">${timeString}</div>
      `;
      
      chatContainer.appendChild(parentMsg);
      
      // Clear input
      chatInput.value = '';



      // Scroll to bottom
      chatContainer.scrollTop = chatContainer.scrollHeight;
      
      // Simulate teacher response after a delay
      setTimeout(() => {
        const teacherMsg = document.createElement('div');
        teacherMsg.className = 'chat-message received';
        
        teacherMsg.innerHTML = `
          <div class="message-bubble">Thank you for your message! I'll get back to you soon.</div>
          <div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        `;
        
        chatContainer.appendChild(teacherMsg);
        
        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 1500);
    }
  }
}
