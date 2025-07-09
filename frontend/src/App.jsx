import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import { resetPassword } from './service/api'
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError(true)
      toast.error("Please enter your email address.");
      return;
    }
    try {
      if (validateEmail(email)) {
        setError(false)
        setLoading(true);
        const res = await resetPassword(email)
        toast.success(
          `A reset code was sent to your email`
        );
        setEmail("");
      }
      else {
        setError(true)
        toast.error("Please enter a valid email address.");
        return;
      }
    } catch (error) {
      toast.error("We couldn't find an account with that email. Try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="app-body">
      <div className="password-reset-card">
        <h2 className="card-title">Reset Your Password</h2>
        <p className="card-subtitle">
          Enter your email address and we'll send you a code to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailInput" className="form-label">
            <FaEnvelope className="form-icon" /> Email Address
          </label>
          <input
            // type="email"
            className={`form-control ${error ? "input-error" : ""}`}
            id="emailInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError(false)
            }}
          />
          <button type="submit" className="btn-reset" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" />
                Processing...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
      {/* Toast container for popups
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      /> */}
    </div>
  );
}
export default App;
