export const ThemeColors = (Theme: String) => {
  switch (Theme) {
    case "light":
      return "#f8f9fa";
    case "dark":
      return "#343a40";
    default:
      return null;
  }
};

export const ThemeColorsText = (Theme: String) => {
  switch (Theme) {
    case "light":
      return "#4361ee";
    case "dark":
      return "#f8f9fa";
  }
};

export const ThemeColorsInputs = (Theme: String) => {
  switch (Theme) {
    case "light":
      return "#333333";
    case "dark":
      return "#f8f9fa";
  }
};

export const ThemeColorsButtons = (Theme: String) => {
  switch (Theme) {
    case "light":
      return "#e9ecef";
    case "dark":
      return "#6c757d";
  }
};
