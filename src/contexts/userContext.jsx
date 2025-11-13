import React, { createContext, useState, useEffect, useContext } from "react";
import { loadData } from "../data/data";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Use state to save user info (for simplicity, using a static user here)
  const [loggedInUser, setLoggedInUser] = useState("");
  const [user, setUser] = useState({});

  // Function to fetch or update user info
  const fetchUser = async () => {
    // Simulate fetching user data
    const usersData = await loadData("users");

    const loggedInUserData =
      usersData?.find((u) => u.email === loggedInUser) || null;

    setUser(loggedInUserData);
  };

  // Fetch user info on mount
  useEffect(() => {
    fetchUser();
  }, [loggedInUser]);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, user, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
