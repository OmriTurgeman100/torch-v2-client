import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { get_node_hierarchy } from "../services/Get-Node-Hierarchy";
import { useAuthContext } from "../Context/UseAuthContext";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import * as d3 from "d3";
import { node_colors } from "../utils/NodeColors"; // Import node_colors function

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
  const svgRef = useRef<SVGSVGElement | null>(null);

  const fetch_node_hierarchy = async () => {
    try {
      const response = await get_node_hierarchy(user.token, node_id);
      setNodeHierarchy(response.data);

      toast.success("Path has been fetched!", {
        style: { backgroundColor: "#0047AB", color: "white" },
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetch_node_hierarchy();
  }, [node_id]);

  useEffect(() => {
    if (!NodeHierarchy.length || !svgRef.current) return;

    // Convert flat data to hierarchical structure
    const root = d3
      .stratify<HierarchyData>()
      .id((d) => d.id.toString())
      .parentId((d) => (d.parent !== null ? d.parent.toString() : null))(NodeHierarchy);

    const treeLayout = d3.tree<d3.HierarchyNode<HierarchyData>>().size([600, 400]);
    const treeData = treeLayout(d3.hierarchy(root));

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous SVG content

    const g = svg.append("g").attr("transform", "translate(50,50)");

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
      .attr("r", 10)
      .attr("fill", (d) => {
        // Convert gradient-based colors to a solid color equivalent
        const color = node_colors(d.data.data.status);
        if (color.includes("linear-gradient")) {
          if (d.data.data.status === "expired") return "#6c757d"; // Dark gray
          if (d.data.data.status === "critical") return "#ff8800"; // Orange
          if (d.data.data.status === "down") return "#ff2600"; // Red
          if (d.data.data.status === "up") return "#00b894"; // Green
          return "#dee2e6"; // Default gray
        }
        return color;
      })
      .attr("stroke", "black");

    nodes
      .append("text")
      .attr("dy", -15)
      .attr("text-anchor", "middle")
      .text((d) => d.data.data.title)
      .style("font-size", "12px");

  }, [NodeHierarchy]);

  return (
    <div>
      <h2>Tree Diagram</h2>
      <svg ref={svgRef} width={700} height={500} />
      
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
    </div>
  );
};
