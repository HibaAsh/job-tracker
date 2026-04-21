import { useTheme } from "../../contexts/ThemeContext";

function StatsCards({ jobs }) {
  const { colors } = useTheme();

  const totalJobs = jobs.length;
  const appliedJobs = jobs.filter((job) => job.status === "applied").length;
  const interviewJobs = jobs.filter((job) => job.status === "interview").length;
  const offerJobs = jobs.filter((job) => job.status === "offer").length;
  const rejectedJobs = jobs.filter((job) => job.status === "rejected").length;

  const stats = [
    { label: "Total", value: totalJobs, color: "#2196f3" },
    { label: "Applied", value: appliedJobs, color: "#1976d2" },
    { label: "Interview", value: interviewJobs, color: "#f57c00" },
    { label: "Offer", value: offerJobs, color: "#388e3c" },
    { label: "Rejected", value: rejectedJobs, color: "#d32f2f" },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        marginBottom: "24px",
        flexWrap: "wrap",
      }}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          style={{
            backgroundColor: colors.surface,
            padding: "16px",
            borderRadius: "8px",
            textAlign: "center",
            flex: 1,
            minWidth: "100px",
            boxShadow: `0 2px 4px ${colors.cardShadow}`,
            borderTop: `4px solid ${stat.color}`,
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: stat.color,
            }}
          >
            {stat.value}
          </div>
          <div style={{ color: colors.textSecondary, marginTop: "8px" }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;