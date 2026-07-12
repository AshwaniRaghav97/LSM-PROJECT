import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { logout } from "../features/auth/authSlice";
import { logoutUser } from "../services/authService";

const Navbar = () => {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogout = async () => {
    try {
      await logoutUser();

      dispatch(logout());

      toast.success("Logout Successful");
    } catch (error) {
      console.log(error);
      toast.error("Logout Failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-blue-600 hover:text-blue-700 transition"
        >
          CodeLearn
        </Link>

        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">

          <Link
            to="/"
            className="font-medium text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/courses"
            className="font-medium text-gray-700 hover:text-blue-600 transition"
          >
            Courses
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="font-medium text-gray-700 hover:text-blue-600 transition"
              >
                Dashboard
              </Link>

              <Link to="/my-courses"
                className="font-medium hover:text-blue-600">
                My Courses
              </Link>

              <Link to="/create-course"
                  className="font-medium text-gray-700 hover:text-blue-600">
                  Create Course
              </Link>

              <Link to="/my-learning">
                  My Learning
              </Link>

              

              <span className="px-3 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold whitespace-nowrap">
                👋 {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition whitespace-nowrap"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-medium text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;