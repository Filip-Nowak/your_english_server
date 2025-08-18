import { createContext } from "react";

const LoadingContext = createContext({
  loading: false,
  setLoading: (bool) => {},
});
export default LoadingContext;
