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
