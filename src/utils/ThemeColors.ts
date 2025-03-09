export const ThemeColors = (Theme: String) => {
  switch (Theme) {
    case "light":
      return "#f8f9fa";
    case "dark":
      return "#343a40";
    case "light text":
      return "#4361ee";
    case "dark text":
      return "#f8f9fa";
    case "light inputs":
      return "#333333";
    case "dark inputs":
      return "#f8f9fa";
    case "light button":
      return "#e9ecef";
    case "dark button":
      return "#6c757d";
  }
};

export const ThemeColorsText = (Theme: String) => {
  switch (Theme) {
    case "light":
      return "#333333";
    case "dark":
      return "#f8f9fa";
    default: 
      return "#4361ee"
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
