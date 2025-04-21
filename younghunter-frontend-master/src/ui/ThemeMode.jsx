import { useThemeMode } from "../context/useThemeModeContext";
import {
  WiMoonAltWaningCrescent1,
  WiMoonAltWaxingCrescent6,
} from "react-icons/wi";

function ThemeMode() {
  const { isDarkMode, toggleThemeMode } = useThemeMode();
  return (
    <button onClick={toggleThemeMode} className="transition-all duration-500">
      {isDarkMode === "light" ? (
        <WiMoonAltWaxingCrescent6 className="w-8 h-8" />
      ) : (
        <WiMoonAltWaningCrescent1 className="w-8 h-8" />
      )}
    </button>
  );
}

export default ThemeMode;
