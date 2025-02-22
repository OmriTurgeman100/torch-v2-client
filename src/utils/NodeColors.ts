export const node_colors = (status: string) => {
  switch (status) {
    case "expired":
      return "linear-gradient(135deg, #6c757d, #343a40)";
    case "critical":
      return "linear-gradient(135deg, #ff8800 0%, #ffd700 100%)";
    case "down":
      return "linear-gradient(135deg, #ff2600 0%, #e95d3a 100%)";
    case "up":
      return "linear-gradient(135deg, #00b894, #2ecc71)";

    default:
      return "linear-gradient(135deg, #dee2e6, #adb5bd)";
  }
};

//