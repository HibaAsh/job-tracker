import { NavLink, Route, Routes } from "react-router-dom";

import { useState } from "react";
import { useTheme } from "./contexts/ThemeContext";

import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

import ThemeToggle from "./components/common/ThemeToggle";

function App() {
  const { colors } = useTheme();

  const [hoveredLink, setHoveredLink] = useState(null)

  const linkStyles = {
    textDecoration: "none",
    fontWeight: "bold",
    padding: "8px 16px",
    borderRadius: "6px",
    transition: "all 0.2s ease",
    cursor: "pointer",
  };

  const getLinkStyle = (isActive, linkName) => {
    let backgroundColor = "transparent"

    if(isActive) {
      backgroundColor = colors.primaryLight
    } else if(hoveredLink === linkName) {
      backgroundColor = colors.border
    }

    return {
      ...linkStyles,
      color: isActive ? colors.primary : colors.text,
      backgroundColor: backgroundColor
    }
  }

  return (
    <div
      style={{
        maxWidth: "100vw",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: colors.background,
        minHeight: "100vh",
      }}
    >
      <nav
        style={{
          backgroundColor: colors.surface,
          padding: "12px 20px",
          borderRadius: "8px",
          marginBottom: "24px",
          display: "flex",
          gap: "12px",
          boxShadow: `0 2px 4px ${colors.cardShadow}`,
        }}
      >
        <NavLink
          to="/"
          style={({ isActive }) => getLinkStyle(isActive, "dashboard")}
          onMouseEnter={() => setHoveredLink("dashboard")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Dashboard
        </NavLink>

        {/* <NavLink
          to="/settings"
          style={({ isActive }) => getLinkStyle(isActive, "settings")}
          onMouseEnter={() => setHoveredLink("settings")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Settings
        </NavLink> */}
      </nav>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <h1 style={{ margin: 0, color: colors.text }}>Job Applications</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <ThemeToggle />
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </div>
  );
}

export default App;
