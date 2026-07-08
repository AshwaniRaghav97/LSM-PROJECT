import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("Registration Successful");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto mt-16 bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Register
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg px-4 py-3"
              {...register("name", {
                required: "Name is required",
              })}
            />
            <p className="text-red-500 text-sm">
              {errors.name?.message}
            </p>
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-4 py-3"
              {...register("email", {
                required: "Email is required",
              })}
            />
            <p className="text-red-500 text-sm">
              {errors.email?.message}
            </p>
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-3"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />
            <p className="text-red-500 text-sm">
              {errors.password?.message}
            </p>
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-lg px-4 py-3"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <p className="text-red-500 text-sm">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>

      </div>
    </MainLayout>
  );
};

export default Register;