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
  console.log(
    healthRecords,
    record_type,
    healthRecords.filter(
      (healthRecord) => healthRecord.record_type === record_type
    )
  );

  return healthRecords.filter(
    (healthRecord) => healthRecord.record_type === record_type
  );
};

// 2025-11-22  ->  Nov 22
export const formatDate = (date_str) => {
  const date = new Date(date_str);

  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return formatted;
};
