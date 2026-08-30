import { useState } from "react";

function App() {
  const [applications, setApplications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");

  const deleteApplication = (indexToDelete) => {
    const updatedApplications = applications.filter(
      (application, index) => index !== indexToDelete
    );

    setApplications(updatedApplications);
  };

  return (
    <div>
      <h1>Job Application Tracker</h1>
      <p>Track your job applications in one place.</p>

      <button onClick={() => setShowForm(true)}>
        Add Application
      </button>

      {showForm && (
        <div>
          <h2>Add Job Application</h2>

          <input
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />

          <input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>

          <button
            onClick={() => {
              const newApplication = {
                jobTitle: jobTitle,
                company: company,
                status: status,
              };

              setApplications([...applications, newApplication]);

              setJobTitle("");
              setCompany("");
              setStatus("Applied");
              setShowForm(false);
            }}
          >
            Save Application
          </button>
        </div>
      )}

      <h2>My Applications</h2>

      {applications.map((application, index) => (
        <div key={index}>
          <h3>{application.jobTitle}</h3>
          <p>Company: {application.company}</p>
          <p>Status: {application.status}</p>

          <button onClick={() => deleteApplication(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;