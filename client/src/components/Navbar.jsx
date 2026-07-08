import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-blue-600">
          CodeLearn
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">

          <Link
            to="/"
            className="font-medium hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/courses"
            className="font-medium hover:text-blue-600 transition"
          >
            Courses
          </Link>

          <Link
            to="/login"
            className="font-medium hover:text-blue-600 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;