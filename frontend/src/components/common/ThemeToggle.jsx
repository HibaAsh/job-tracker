import { useTheme } from "../../contexts/ThemeContext";

import Button from "./Button";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button variant="secondary" onClick={toggleTheme}>
      {isDark ? "☀️" : "🌙"}
    </Button>
  );
}

export default ThemeToggle;
