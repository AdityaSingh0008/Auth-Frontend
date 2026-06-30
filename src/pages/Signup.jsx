import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BgGlow from "../components/BgGlow";
import { registerUser } from "../api";

export default function Signup() {
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
      const res = await registerUser(form);
      setMsg({ text: res.data.msg || "Account created!", type: "success" });
      setForm({ email: "", password: "" });

      setTimeout(() => navigate("/login"), 700);
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
        <h1>Create account</h1>
        <p className="sub">Join us in a few seconds</p>

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
            placeholder="Min 6 characters"
            minLength={6}
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          {msg.text && <p className={`msg ${msg.type}`}>{msg.text}</p>}
        </form>

        <p className="switch-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}
