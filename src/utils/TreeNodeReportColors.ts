export const tree_node_report_colors = (status: string) => {
  switch (status) {
    case "expired":
      return "#6c757d";
    case "critical":
      return "#ff8800";
    case "down":
      return "#ff2600";
    case "up":
      return "#00b894";
    default:
      return null;
  }
};
