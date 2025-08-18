import { createContext } from "react";
export const BackgroundContext = createContext({
  setBackground: () => {},
  background: "",
});
