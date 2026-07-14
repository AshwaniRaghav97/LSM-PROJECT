import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";
import { resetPassword } from "../services/authService";

const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await resetPassword(
        token,
        password
      );

      toast.success(data.message);

      navigate("/login");

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
          Reset Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-3 rounded-lg"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            {loading
              ? "Updating..."
              : "Reset Password"}
          </button>

        </form>

      </div>

    </MainLayout>
  );
};

export default ResetPassword;