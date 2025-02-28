import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { get_node_hierarchy } from "../services/Get-Node-Hierarchy";
import { useAuthContext } from "../Context/UseAuthContext";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import * as d3 from "d3";
import { tree_node_report_colors } from "../utils/TreeNodeReportColors";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

interface HierarchyData {
  id: number;
  parent: number | null;
  title: string;
  status: string;
}

export const NodeHierarchy = () => {
  const { node_id } = useParams();
  const { user } = useAuthContext();
  const [NodeHierarchy, setNodeHierarchy] = useState<HierarchyData[]>([]);
  const [width, setWidth] = useState<number>(1200);
  const [height, setHeight] = useState<number>(800);

  const [InitialWidth, setInitialWidth] = useState<number>(1300);
  const [InitialHeigt, setInitialHeigt] = useState<number>(1000);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const fetch_node_hierarchy = async () => {
    try {
      const response = await get_node_hierarchy(user.token, node_id);
      setNodeHierarchy(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  function increase_dimensions(): void {
    setInitialWidth(InitialWidth + 200);
    setInitialHeigt(InitialHeigt + 200);
    setWidth(width + 200);
    setHeight(height + 200);
  }

  function decrease_dimensions(): void {
    setInitialWidth(InitialWidth - 200);
    setInitialHeigt(InitialHeigt - 200);
    setWidth(width - 200);
    setHeight(height - 200);
  }

  useEffect(() => {
    fetch_node_hierarchy();
  }, [node_id, width, height]);

  useEffect(() => {
    if (!NodeHierarchy.length || !svgRef.current) return;

    // Convert flat data to hierarchical structure
    const root = d3
      .stratify<HierarchyData>()
      .id((d) => d.id.toString())
      .parentId((d) => (d.parent !== null ? d.parent.toString() : null))(
      NodeHierarchy
    );

    // Update tree layout size
    const treeLayout = d3
      .tree<d3.HierarchyNode<HierarchyData>>()
      .size([width, height]); // Increased size for larger tree layout
    const treeData = treeLayout(d3.hierarchy(root));

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous SVG content

    const g = svg.append("g").attr("transform", "translate(100,100)"); // Adjust position if needed

    // Draw links
    g.selectAll(".link")
      .data(treeData.links())
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    // Draw nodes
    const nodes = g
      .selectAll(".node")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    nodes
      .append("circle")
      .attr("r", 20) // Increased node size for better visibility
      .attr("fill", (d) => {
        const color = tree_node_report_colors(d.data.data.status);
        return color;
      })
      .attr("stroke", "black");

    nodes
      .append("text")
      .attr("dy", -20) // Adjusted position for text
      .attr("text-anchor", "middle")
      .text((d) => d.data.data.title)
      .style("font-size", "18px"); // Increased text size for better readability
  }, [NodeHierarchy]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <svg ref={svgRef} width={InitialWidth} height={InitialHeigt} />
      <ButtonGroup
        sx={{ position: "fixed", bottom: "15px", right: "15px" }}
        variant="contained"
        aria-label="Basic button group"
      >
        <Button onClick={() => increase_dimensions()}>+</Button>
        <Button onClick={() => decrease_dimensions()}>-</Button>
      </ButtonGroup>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </Box>
  );
};
