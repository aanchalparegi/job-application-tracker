import { useState } from "react";

function App() {
  const [applications, setApplications] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");

  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  
  const filteredApplications = applications.filter((application) =>
     application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
     application.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
    setShowForm(false);
    setEditingIndex(null);
  };

  // Open form for a new application
  const handleAddApplication = () => {
    setJobTitle("");
    setCompany("");
    setStatus("Applied");
    setEditingIndex(null);
    setShowForm(true);
  };

  return (
    <div>
      <h1>Job Application Tracker</h1>

      <p>Track your job applications in one place.</p>

      <button onClick={handleAddApplication}>
        Add Application
      </button>

      {/* Application Form */}
      {showForm && (
        <div>
          <h2>
            {editingIndex !== null
              ? "Edit Job Application"
              : "Add Job Application"}
          </h2>

          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />

          <br />

          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <br />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>

          <br />

          <button onClick={handleSave}>
            {editingIndex !== null
              ? "Update Application"
              : "Save Application"}
          </button>

          <button onClick={clearForm}>
            Cancel
          </button>
        </div>
      )}

      {/* Applications */}
      <h2>My Applications</h2>
      <input
       type="text"
       placeholder="Search by job title or company..."
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredApplications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
      filteredApplications.map((application, index) => (          <div key={index}>
            <h3>{application.jobTitle}</h3>

            <p>
              <strong>Company:</strong> {application.company}
            </p>

            <p>
              <strong>Status:</strong> {application.status}
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