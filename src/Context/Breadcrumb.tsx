import {
  createContext,
  useReducer,
  useState,
  useEffect,
  useContext,
} from "react";

export const BreadCrumbContext = createContext<any>(null);

export const Breadcrumb = ({ children }: any) => {
  const [BreadCrumbContext, setBreadCrumbContext] = useState<string>("");
  return (
    <div>
      <h1>breadcrumb</h1>
    </div>
  );
};
