import { useContext } from "react";
import { BreadCrumbContext } from "../Context/BreadcrumbContext";

export const UseBreadCrumbContext = () => {
  const context = useContext(BreadCrumbContext);

  if (!context) {
    throw new Error(
      "useBreadCrumbContext must be used within a BreadCumbProvider"
    );
  }
  return context;
};
