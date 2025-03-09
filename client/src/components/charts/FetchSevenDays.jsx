import axios from "axios";

const fetchLast7DaysLogins = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/customers/api/last7days", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.data; // Array of { date, count }
  } catch (error) {
    console.error("Error fetching login data:", error);
    return [];
  }
};

export default fetchLast7DaysLogins;