import { sha256 } from "js-sha256";

export const saveData = async (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadData = async (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const removeData = async (key) => {
  localStorage.removeItem(key);
};

export const clearAllData = async () => {
  localStorage.clear();
};

export const getHealthRecords = async (record_type) => {
  const healthRecords = (await loadData("healthRecords")) || [];

  return healthRecords.filter(
    (healthRecord) => healthRecord.record_type === record_type
  );
};

export const logIn = async (email, password) => {
  // Login user
  const usersData = (await loadData("users")) || [];
  console.log("====================================");
  console.log(usersData);
  console.log("====================================");

  const existingUser = usersData.find(
    (user) => user.email === email && user.password === sha256(password)
  );

  if (!existingUser) {
    throw new Error("Invalid email or password.");
  }

  // Save the logged in user to local storage
  await saveData("loggedInUser", existingUser.email);
  return existingUser;
};
