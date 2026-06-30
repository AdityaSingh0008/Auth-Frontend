import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BgGlow from "../components/BgGlow";
import { getDashboard } from "../api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboard();
        setMsg(res.data.msg || "Welcome!");
      } catch (err) {
        // token invalid/expired/missing -> kick back to login
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div className="page">
      <BgGlow />
      <div className="card dashboard-card">
        <div className="emoji">🎉</div>
        {loading ? (
          <p className="loader">Loading dashboard...</p>
        ) : (
          <>
            <h1>{msg}</h1>
            {email && <p className="sub">Signed in as {email}</p>}
          </>
        )}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
