import { useState, useEffect } from "react";
function App() {
const [applications, setApplications] = useState([]);
const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
  const savedApplications = localStorage.getItem("applications");

  if (savedApplications) {
    setApplications(JSON.parse(savedApplications));
  }

  setIsLoaded(true);
}, []);
useEffect(() => {
  if (isLoaded) {
    localStorage.setItem("applications", JSON.stringify(applications));
  }
}, [applications, isLoaded]);
  const [showForm, setShowForm] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [applicationDate, setApplicationDate] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const totalApplications = applications.length;
  const appliedApplications = applications.filter(
  (application) => application.status === "Applied"
  ).length;
  const interviewApplications = applications.filter(
  (application) => application.status === "Interview"
).length;
const rejectedApplications = applications.filter(
  (application) => application.status === "Rejected"
).length;
const offerApplications = applications.filter(
  (application) => application.status === "Offer"
).length;
const highPriorityApplications = applications.filter(
  (application) => application.priority === "High"
).length;
  const filteredApplications = applications.filter((application) => {
  const matchesSearch =
    application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.company.toLowerCase().includes(searchTerm.toLowerCase());

const matchesStatus =
  statusFilter === "All" || application.status === statusFilter;

const matchesPriority =
  priorityFilter === "All" || application.priority === priorityFilter;

return matchesSearch && matchesStatus && matchesPriority;
});
  // Save or update an application
  const handleSave = () => {
    if (!jobTitle.trim() || !company.trim()) {
      alert("Please enter both job title and company.");
      return;
    }

   const application = {
  id: editingIndex !== null
    ? applications[editingIndex].id
    : Date.now(),
  jobTitle: jobTitle.trim(),
  company: company.trim(),
  status: status,
  applicationDate: applicationDate,
  notes: notes,
  priority: priority,
};

    if (editingIndex !== null) {
      const updatedApplications = [...applications];

      updatedApplications[editingIndex] = application;

      setApplications(updatedApplications);
      setEditingIndex(null);
    } else {
      setApplications([...applications, application]);
    }

    clearForm();
  };

 // Edit an application
const handleEdit = (id) => {
  const application = applications.find(
    (application) => application.id === id
  );

  if (!application) {
    return;
  }

  setJobTitle(application.jobTitle);
  setCompany(application.company);
  setStatus(application.status);
  setApplicationDate(application.applicationDate);
  setNotes(application.notes || "");
  setPriority(application.priority || "Medium");
  const originalIndex = applications.findIndex(
    (application) => application.id === id
  );

  setEditingIndex(originalIndex);
  setShowForm(true);
};

  // Delete an application
const deleteApplication = (idToDelete) => {
  const updatedApplications = applications.filter(
    (application) => application.id !== idToDelete
  );

  setApplications(updatedApplications);
  clearForm();
};

  // Clear form
  const clearForm = () => {
    setJobTitle("");
    setCompany("");
    setStatus("Applied");
    setApplicationDate("");
    setNotes("");
    setPriority("Medium");
    setShowForm(false);
    setEditingIndex(null);
  };

  // Open form for a new application
  const handleAddApplication = () => {
    setJobTitle("");
    setCompany("");
    setStatus("Applied");
    setApplicationDate("");
    setNotes("");
    setPriority("Medium");
    setEditingIndex(null);
    setShowForm(true);
  };

  return (
  <div className="app-container">
    <h1>Job Application Tracker</h1>
      <div className="dashboard">
  <h2>Dashboard</h2>

  <div className="dashboard-cards">
    <div className="dashboard-card">
      <h3>Total Applications</h3>
      <p>{totalApplications}</p>
    </div>

    <div className="dashboard-card">
      <h3>Applied</h3>
      <p>{appliedApplications}</p>
    </div>

    <div className="dashboard-card">
      <h3>Interviews</h3>
      <p>{interviewApplications}</p>
    </div>

    <div className="dashboard-card">
      <h3>Rejected</h3>
      <p>{rejectedApplications}</p>
    </div>

    <div className="dashboard-card">
      <h3>Offers</h3>
      <p>{offerApplications}</p>
    </div>

    <div className="dashboard-card">
      <h3>High Priority</h3>
      <p>{highPriorityApplications}</p>
    </div>
  </div>
</div>

      <p>Track your job applications in one place.</p>

      <button onClick={handleAddApplication}>
        Add Application
      </button>

      {/* Application Form */}
     {showForm && (
  <div className="application-form">
    <div className="form-header">
      <h2>
        {editingIndex !== null
          ? "Edit Job Application"
          : "Add Job Application"}
      </h2>
      <p>Keep track of your application details.</p>
    </div>

    <div className="form-grid">
      <div className="form-group">
        <label>Job Title</label>
        <input
          type="text"
          placeholder="e.g. Administrative Assistant"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Company</label>
        <input
          type="text"
          placeholder="e.g. Microsoft"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>
      </div>

      <div className="form-group">
        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="form-group">
        <label>Application Date</label>
        <input
          type="date"
          value={applicationDate}
          onChange={(e) => setApplicationDate(e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label>Notes</label>
        <textarea
          placeholder="Add notes about this application..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="4"
        />
      </div>
    </div>

    <div className="form-actions">
      <button className="save-button" onClick={handleSave}>
        {editingIndex !== null
          ? "Update Application"
          : "Save Application"}
      </button>

      <button className="cancel-button" onClick={clearForm}>
        Cancel
      </button>
    </div>
  </div>
)}

      {/* Applications */}
     <h2>My Applications</h2>

<div className="filters">
  <input
    type="text"
    placeholder="Search by job title or company..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="All">All Statuses</option>
    <option value="Applied">Applied</option>
    <option value="Interview">Interview</option>
    <option value="Rejected">Rejected</option>
    <option value="Offer">Offer</option>
  </select>

  <select
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
  >
    <option value="All">All Priorities</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
</div>
      {filteredApplications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
      filteredApplications.map((application, index) => (  
           <div className="application-card" key={index}>
            <h3>{application.jobTitle}</h3>

            <p>
              <strong>Company:</strong> {application.company}
            </p>

            <p>
  <strong>Status:</strong>{" "}
  <span className={`status-badge ${application.status.toLowerCase()}`}>
    {application.status}
  </span>
</p>
         <p>
  <strong>Priority:</strong>{" "}
  <span
    className={`priority-badge ${(application.priority || "Medium").toLowerCase()}`}
  >
    {application.priority || "Medium"}
  </span>
</p>
 <p>
  <strong>Application Date:</strong>{" "}
  {application.applicationDate
    ? new Date(application.applicationDate + "T00:00:00").toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )
    : "Not provided"}
</p>

<p>
  <strong>Notes:</strong> {application.notes || "No notes"}
</p>
       <button onClick={() => handleEdit(application.id)}>
  Edit
</button>
           <button onClick={() => deleteApplication(application.id)}>
  Delete
</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;