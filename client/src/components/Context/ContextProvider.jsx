import React, { createContext, useState } from "react";

// create context
export const addData = createContext();
export const updateData = createContext();
export const pagination = createContext();

const ContextProvider = ({ children }) => {
  const [userAdd, setUserAdd] = useState("");
  const [userUpdate, setUserUpdate] = useState("");

  return (
    <>
      <addData.Provider value={{ userAdd, setUserAdd }}>
        <updateData.Provider value={{ userUpdate, setUserUpdate }}>
          {children}
        </updateData.Provider>
      </addData.Provider>
    </>
  );
};

export default ContextProvider;
