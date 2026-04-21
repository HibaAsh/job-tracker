import { useState } from "react";

import { useTheme } from "../../contexts/ThemeContext";

import Button from "../common/Button";

function EditJobForm({ job, onUpdate, onClose }) {
  const { colors } = useTheme()

  const [formData, setFormData] = useState({
    company: job.company,
    role: job.role,
    status: job.status,
    date: job.date,
    notes: job.notes || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.company.trim()) {
      alert("Company name is required");
      return;
    }

    if (!formData.role.trim()) {
      alert("Role is required");
      return;
    }

    const updatedJob = {
      ...formData,
      id: job.id,
    };

    onUpdate(updatedJob);
    onClose();
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    border: `1px solid ${colors.border}`,
    borderRadius: "4px",
    fontSize: "16px",
    backgroundColor: colors.background,
    color: colors.text,
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "16px" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: colors.text }}
        >
          Company *
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: colors.text }}
        >
          Role *
        </label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: colors.text }}
        >
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: colors.text }}
        >
          Application Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: colors.text }}
        >
          Notes (optional)
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          style={{
            ...inputStyle,
            fontFamily: "inherit"
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button type="submit" variant="warning">
          Edit Job
        </Button>
      </div>
    </form>
  );
}

export default EditJobForm;
