import { createContext, useState } from "react";

export const BreadCrumbContext = createContext<any>(null);

export const BreadcrumbProvider = ({ children }: any) => {
  const [BreadCrumbPath, setBreadCrumbPath] = useState<string>("");
  return (
    <BreadCrumbContext.Provider value={{ BreadCrumbPath, setBreadCrumbPath }}>
      {children}
    </BreadCrumbContext.Provider>
  );
};
