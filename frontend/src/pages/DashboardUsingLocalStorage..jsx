import { useEffect, useState } from "react";

import { useTheme } from "../contexts/ThemeContext";

import useLocalStorage from "../hooks/useLocalStorage";

import Button from "../components/common/Button";
import Modal from "../components/common/Modal";

import StatsCards from "../components/StatsCards/StatsCards";
import JobCard from "../components/JobCard/JobCard";
import JobForm from "../components/JobForm/JobForm";
import EditJobForm from "../components/EditJobForm/EditJobForm";

import { fetchJobs } from "../services/api";

function Dashboard() {
  const { colors } = useTheme();

  const [jobs, setJobs] = useLocalStorage("jobs", []);

  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const handleUpdateJob = (updatedJob) => {
    const updatedJobs = jobs.map((job) =>
      job.id === updatedJob.id ? updatedJob : job,
    );

    setJobs(updatedJobs);
  };

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
  };

  const statusColors = {
    all: "#2196f3",
    applied: "#1976d2",
    interview: "#f57c00",
    offer: "#388e3c",
    rejected: "#d32f2f",
  };

  const handleAddJob = (newJob) => {
    setJobs([newJob, ...jobs]);
  };

  const filteredJobs =
    filter === "all" ? jobs : jobs.filter((job) => job.status === filter);

  const statusCases = ["all", "applied", "interview", "offer", "rejected"];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "16px",
            width: "fit-content",
          }}
        >
          <Button variant="success" onClick={() => setIsModalOpen(true)}>
            + Add Job
          </Button>
        </div>
      </div>

      <StatsCards jobs={jobs} />

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {statusCases.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: "8px 16px",
              backgroundColor:
                filter === status ? statusColors[status] : colors.surface,
              color: filter === status ? "white" : colors.text,
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div>
        {filteredJobs.length === 0 ? (
          <p style={{ textAlign: "center", color: colors.textSecondary }}>
            No Jobs Found
          </p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} style={{ position: "relative" }}>
              <JobCard
                key={job.id}
                job={job}
                onEdit={setEditingJob}
                onDelete={handleDeleteJob}
              />
            </div>
          ))
        )}
      </div>

      {editingJob && (
        <Modal
          isOpen={true}
          onClose={() => setEditingJob(null)}
          title="Edit Job"
        >
          <EditJobForm
            job={editingJob}
            onUpdate={handleUpdateJob}
            onClose={() => setEditingJob(null)}
          />
        </Modal>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Job"
      >
        <JobForm
          onSubmit={handleAddJob}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default Dashboard;
