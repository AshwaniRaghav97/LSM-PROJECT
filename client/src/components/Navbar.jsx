import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  }
};

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="text-3xl font-bold text-blue-600">
          CodeLearn
        </Link>

        <div className="flex items-center gap-8">

          <Link to="/">Home</Link>

          <Link to="/courses">Courses</Link>

          {isAuthenticated ? (
            <>
              <span className="font-semibold text-blue-600">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
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