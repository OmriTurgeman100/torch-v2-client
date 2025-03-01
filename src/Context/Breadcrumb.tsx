import {
  createContext,
  useReducer,
  useState,
  useEffect,
  useContext,
} from "react";

export const BreadcrumbContext = createContext<any>(null);

export const Breadcrumb = ({ children }: any) => {
  return (
    <div>
      <h1>breadcrumb</h1>
    </div>
  );
};
