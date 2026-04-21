import { useTheme } from "../../contexts/ThemeContext"

import Button from "./Button";

function Modal({ isOpen, onClose, title, children }) {
  const { colors } = useTheme()

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: `${colors.surface}`,
          borderRadius: "8px",
          width: "500px",
          maxWidth: "90%",
          maxHeight: "90%",
          overflow: "auto",
          boxShadow: `0 4px 6px ${colors.cardShadow}`
        }}
      >
        <div
          style={{
            padding: "16px",
            borderBottom: `1px solid ${colors.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0, color: colors.text }}>{title}</h2>
          <Button variant="secondary" onClick={onClose}>
            ✕
          </Button>
        </div>

        <div style={{ padding: "20px" }}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
