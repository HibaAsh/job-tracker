import { useTheme } from "../../contexts/ThemeContext";

function Button({ children, onClick, variant = "primary", type = "button" }) {
  const { colors } = useTheme()

  const variants = {
    primary: { backgroundColor: "#2196f3", color: "white" },
    secondary: { backgroundColor: colors.surface, color: colors.text },
    success: { backgroundColor: "#4caf50", color: "white" },
    danger: { backgroundColor: "#ff4444", color: "white" },
    warning: { backgroundColor: "#ff9800", color: "white" },
  };

  const style = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "8px 16px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export default Button;
