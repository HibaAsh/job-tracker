import { useTheme } from "../../contexts/ThemeContext";

function JobCard({ job, onEdit, onDelete }) {
  const { colors } = useTheme();

  const statusColors = {
    applied: { bg: "#e3f2fd", text: "#1976d2", label: "Applied" },
    interview: { bg: "#fff3e0", text: "#f57c00", label: "Interview" },
    offer: { bg: "#e8f5e9", text: "#388e3c", label: "Offer" },
    rejected: { bg: "#ffebee", text: "#d32f2f", label: "Rejected" },
  };

  const colors_status = statusColors[job.status];

  return (
    <div
      style={{
        backgroundColor: colors.surface,
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        boxShadow: `0 2px 4px ${colors.cardShadow}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          marginBottom: "8px",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "18px", color: colors.text }}>
          {job.company}
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "flex-end",
          }}
        >
          <span
            style={{
              backgroundColor: colors_status.bg,
              color: colors_status.text,
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {colors_status.label}
          </span>

          <button
            onClick={() => onEdit(job)}
            style={{
              backgroundColor: "#ff9800",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "4px 8px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(job.id)}
            style={{
              backgroundColor: "#ff4444",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "4px 8px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <p style={{ margin: "0 0 4px 0", color: colors.textSecondary }}>
        {job.role}
      </p>

      <p style={{ margin: "0", fontSize: "12px", color: colors.textSecondary }}>
        Applied: {job.date}
      </p>

      {job.notes && (
        <p
          style={{
            margin: "12px 0 0 0",
            fontSize: "14px",
            color: colors.textSecondary,
          }}
        >
          📝 {job.notes}
        </p>
      )}
    </div>
  );
}

export default JobCard;