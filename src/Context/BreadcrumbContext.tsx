import { createContext, useState } from "react";

interface Breadcrumb {
  title: string;
  id: number;
}

export const BreadCrumbContext = createContext<any>(null);

export const BreadcrumbProvider = ({ children }: any) => {
  const [BreadCrumbPath, setBreadCrumbPath] = useState<Breadcrumb[]>([]);
  return (
    <BreadCrumbContext.Provider value={{ BreadCrumbPath, setBreadCrumbPath }}>
      {children}
    </BreadCrumbContext.Provider>
  );
};
