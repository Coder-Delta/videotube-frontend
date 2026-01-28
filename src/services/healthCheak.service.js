import api from "@/utils/api";

/* -------------------- health check -------------------- */
const checkHealth = async () => {
  try {
    const response = await api.get("/healthcheck");
    console.log("Health check response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Health check failed:", error);
    throw error;
  }
};

export { checkHealth };

export default {
  checkHealth,
};