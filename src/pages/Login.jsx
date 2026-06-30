import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BgGlow from "../components/BgGlow";
import { loginUser } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });
    setLoading(true);

    try {
      const res = await loginUser(form);
      const { token, msg: serverMsg } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("email", form.email);
      setMsg({ text: serverMsg || "Logged in successfully", type: "success" });

      setTimeout(() => navigate("/dashboard"), 500);
    } catch (err) {
      setMsg({
        text:
          err.response?.data?.msg ||
          "Something went wrong. Is the backend running on port 8888?",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <BgGlow />
      <div className="card">
        <h1>Welcome back</h1>
        <p className="sub">Login to continue</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {msg.text && <p className={`msg ${msg.type}`}>{msg.text}</p>}
        </form>

        <p className="switch-text">
          Don't have an account?
          <Link to="/signup"> Sign up</Link>
        </p>
      </div>
    </div>
  );
}
