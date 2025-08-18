import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import LoadingContext from "../context/LoadingContext";
import Loading from "../utils/loading/Loading";

export default function BlankPage() {
  const [loading, setloading] = useState(false);
  return (
    <div>
      <LoadingContext.Provider
        value={{ isLoading: loading, setLoading: setloading }}
      >
        <Outlet />
      </LoadingContext.Provider>
      {loading && <Loading />}
    </div>
  );
}
