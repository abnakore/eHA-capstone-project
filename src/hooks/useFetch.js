import { useEffect, useState } from "react";

// Custom hook for fetching data
export const useFetch = (fn, dependencies = []) => {
  // State management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Function to fetch data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data on mount or when dependencies change
  useEffect(() => {
    fetchData();
  }, dependencies);

  // Return the state and the refetch function
  return { data, loading, error, refetch: fetchData };
};
