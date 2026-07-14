import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";
import { forgotPassword } from "../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await forgotPassword(email);

      toast.success(data.message);

      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-20">

        <h1 className="text-3xl font-bold mb-8">
          Forgot Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded-lg"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

        </form>

        <Link
          to="/login"
          className="block mt-5 text-blue-600"
        >
          Back to Login
        </Link>

      </div>
    </MainLayout>
  );
};

export default ForgotPassword;