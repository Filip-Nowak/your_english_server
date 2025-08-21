import React, { useEffect, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import styles from "./mainPage.module.scss";
import SideBar from "./SideBar";
import PhoneHeader from "./PhoneHeader";
import TokenContext from "../../context/TokenContext";
import { BackgroundContext } from "../../context/BackgroundContext";
export default function MainPage() {
  const [loaderData, setLoaderData] = useState({
    wordbases: [],
    userResponse: {},
    token: null,
  });
  const [background, setBackground] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const loaderData1 = useLoaderData();
  useEffect(() => {
    const route = window.location.pathname;
    if (!loaderData1.token && route !== "/" && route !== "/about") {
      window.location.href = "/";
      return;
    }
    setLoaderData(loaderData1);
  }, []);
  return (
    <div className={styles.pageContainer}>
      {loaderData.token === null ? (
        <div className={styles.loadingContainer}>
          <h1>Loading...</h1>
        </div>
      ) : (
        <TokenContext.Provider value={{ token: loaderData.token }}>
          <SideBar
            wordbases={loaderData.wordbasesResponse.data}
            user={loaderData.userResponse}
            show={showSidebar}
          />
          <div className={styles.contentContainer}>
            <PhoneHeader
              setShowSidebar={setShowSidebar}
              showSidebar={showSidebar}
            />
            <div
              className={styles.mainContent}
              style={{ backgroundColor: background }}
            >
              <BackgroundContext.Provider
                value={{
                  setBackground,
                  background,
                }}
              >
                <Outlet />
              </BackgroundContext.Provider>
            </div>
          </div>
        </TokenContext.Provider>
      )}
    </div>
  );
}
