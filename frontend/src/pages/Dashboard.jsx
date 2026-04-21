import { useEffect, useState } from "react";

import { useTheme } from "../contexts/ThemeContext";

import Button from "../components/common/Button";
import Modal from "../components/common/Modal";

import StatsCards from "../components/StatsCards/StatsCards";
import JobCard from "../components/JobCard/JobCard";
import JobForm from "../components/JobForm/JobForm";
import EditJobForm from "../components/EditJobForm/EditJobForm";

import {
  fetchJobs,
  fetchJob,
  createJob,
  updateJob,
  deleteJob,
} from "../services/api";

import { sortJobByDate } from "../utils/sortJobByDate";

function Dashboard() {
  const { colors } = useTheme();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const statusColors = {
    all: "#2196f3",
    applied: "#1976d2",
    interview: "#f57c00",
    offer: "#388e3c",
    rejected: "#d32f2f",
  };

  const statusCases = ["all", "applied", "interview", "offer", "rejected"];

  const statusFilteredJobs =
    filter === "all" ? jobs : jobs.filter((job) => job.status === filter);

  const filteredJobs = statusFilteredJobs.filter((job) => {
    if (!searchTerm) return true;

    const seacrhTermNormalized = searchTerm.toLowerCase().trim();
    return (
      job.company.toLowerCase().includes(seacrhTermNormalized) ||
      job.role.toLowerCase().includes(seacrhTermNormalized)
    );
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleAddJob = async (newJob) => {
    try {
      const response = await createJob(newJob);
      setJobs(sortJobByDate([response.data, ...jobs]));
    } catch (error) {
      setError("Failed to add job");
      console.error(error);
    }
  };

  const handleUpdateJob = async (updatedJob) => {
    try {
      const response = await updateJob(updatedJob.id, updatedJob);
      const updatedJobs = jobs.map((job) =>
        job.id === response.data.id ? response.data : job,
      );
      setJobs(sortJobByDate(updatedJobs));
    } catch (error) {
      setError("Failed to update job");
      console.error(error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobs(sortJobByDate(jobs.filter((job) => job.id !== jobId)));
    } catch (error) {
      setError("Failed to delete job");
      console.error(error);
    }
  };

  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await fetchJobs();
      setJobs(sortJobByDate(response.data));
      setError(null);
    } catch (error) {
      setError("Failed to load jobs");
      console.error("API Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

  if (loading) {
    return <div style={{ color: colors.text }}>Loading jobs...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

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
      <StatsCards jobs={jobs} /> {/* filteredJobs */}
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
      <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by company or role.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: `1px solid ${colors.border}`,
            borderRadius: "4px",
            backgroundColor: colors.surface,
            color: colors.text,
            fontSize: "16px",
          }}
        />
        {searchTerm && (
          <Button variant="secondary" onClick={() => setSearchTerm("")}>
            Clear
          </Button>
        )}
      </div>
      <div>
        {filteredJobs.length === 0 ? (
          <p style={{ textAlign: "center", color: colors.textSecondary }}>
            No Jobs Found
          </p>
        ) : (
          currentJobs.map((job) => (
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
      <div
        style={{
          textAlign: "center",
          marginTop: "16px",
          marginBottom: "8px",
          color: colors.textSecondary,
          fontSize: "14px",
        }}
      >
        Showing {indexOfFirstJob + 1} to{" "}
        {Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length}{" "}
        jobs
      </div>
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "24px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: "8px 16px",
              backgroundColor:
                currentPage === 1 ? colors.border : colors.primary,
              color: currentPage === 1 ? colors.textSecondary : "white",
              border: "none",
              borderRadius: "4px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              opacity: currentPage === 1 ? 0.5 : 1,
            }}
          >
            ← Previous
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;

            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <button
                  key={index}
                  onClick={() => setCurrentPage(pageNumber)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor:
                      currentPage === pageNumber
                        ? colors.primary
                        : colors.surface,
                    color: currentPage === pageNumber ? "white" : colors.text,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {pageNumber}
                </button>
              );
            }

            if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage - 2
            ) {
              return (
                <span
                  key={pageNumber}
                  style={{
                    padding: "8px 4px",
                    color: colors.textSecondary,
                  }}
                >
                  ...
                </span>
              );
            }

            return null;
          })}

          <button
            onClick={() =>
              setCurrentPage((next) => Math.min(next + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            style={{
              padding: "8px 16px",
              backgroundColor:
                currentPage === totalPages ? colors.border : colors.primary,
              color:
                currentPage === totalPages ? colors.textSecondary : "white",
              border: "none",
              borderRadius: "4px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              opacity: currentPage === totalPages ? 0.5 : 1,
            }}
          >
            Next →
          </button>
        </div>
      )}
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
