// Backend base URL + helpers (JWT token is saved in localStorage at login)
// Production build (served by Django on the same address) -> "/api".
// Local development (npm run dev) -> Django on port 8000. VITE_API_URL can override both.
export const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "/api" : "http://127.0.0.1:8000/api");

export const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
});

// Turn Django REST error responses into readable text for alerts
export const errorText = (err, fallback = "Something went wrong. Please try again.") => {
  const data = err.response?.data;
  if (data && typeof data === "object") {
    return Object.values(data)
      .map((v) => (Array.isArray(v) ? v.join(" ") : v))
      .join("\n");
  }
  return fallback;
};
