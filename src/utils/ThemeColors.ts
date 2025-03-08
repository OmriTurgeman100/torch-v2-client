export const ThemeColors = (Theme: String) => {
  switch (Theme) {
    case "light":
      return "white";
    case "dark":
      return "#343a40";
    default:
      return null;
  }
};
