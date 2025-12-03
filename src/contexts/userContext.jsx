import React, { createContext, useState, useEffect, useContext } from "react";
import { loadData } from "../data/data";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Use state to save user info
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // Load the logged in user
  useEffect(() => {
    const loadUser = async () => {
      const user = await loadData("loggedInUser");
      setLoggedInUser(user);
    };

    loadUser();
  }, []);

  // Function to fetch or update user info
  const fetchUser = async () => {
    setLoading(true);
    // Simulate fetching user data
    try {
      const usersData = await loadData("users");
      const loggedInUserData =
        usersData?.find((u) => u.email === loggedInUser) || null;

      setUser(loggedInUserData);
    } catch (e) {
      console.log("Error while fetching user", e);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user info on mount
  useEffect(() => {
    fetchUser();
  }, [loggedInUser]);

  return (
    <UserContext.Provider
      value={{ loading, loggedInUser, setLoggedInUser, user, fetchUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
