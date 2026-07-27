import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import {
  Menu,
  X,
  Home,
  BookOpen,
  LayoutDashboard,
  GraduationCap,
  User,
  PlusCircle,
  BookMarked,
  LogOut,
} from "lucide-react";

import { logout } from "../features/auth/authSlice";
import { logoutUser } from "../services/authService";

const Navbar = () => {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();

      dispatch(logout());

      toast.success("Logout Successful");

      setMenuOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Logout Failed");
    }
  };

  const navLink =
    "flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 font-medium transition-all duration-300 hover:bg-blue-50 hover:text-blue-600";

  const activeLink =
    "bg-blue-600 text-white shadow-md";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              C
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-gray-800">
                CodeLearn
              </h1>

              <p className="text-xs text-gray-500">
                Learn • Build • Grow
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}

          <div className="hidden lg:flex items-center gap-2">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navLink} ${isActive ? activeLink : ""}`
              }
            >
              <Home size={18} />
              Home
            </NavLink>

            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `${navLink} ${isActive ? activeLink : ""}`
              }
            >
              <BookOpen size={18} />
              Courses
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `${navLink} ${isActive ? activeLink : ""}`
                  }
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </NavLink>

                <NavLink
                  to="/my-courses"
                  className={({ isActive }) =>
                    `${navLink} ${isActive ? activeLink : ""}`
                  }
                >
                  <BookMarked size={18} />
                  My Courses
                </NavLink>

                <NavLink
                  to="/create-course"
                  className={({ isActive }) =>
                    `${navLink} ${isActive ? activeLink : ""}`
                  }
                >
                  <PlusCircle size={18} />
                  Create
                </NavLink>

                <NavLink
                  to="/my-learning"
                  className={({ isActive }) =>
                    `${navLink} ${isActive ? activeLink : ""}`
                  }
                >
                  <GraduationCap size={18} />
                  Learning
                </NavLink>

                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `${navLink} ${isActive ? activeLink : ""}`
                  }
                >
                  <User size={18} />
                  Profile
                </NavLink>
              </>
            )}

          </div>
                    {/* Right Side */}

          <div className="hidden lg:flex items-center gap-4">

            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3">

                  <div className="h-11 w-11 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-lg font-bold shadow-md">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {user?.role}
                    </p>
                  </div>

                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </>
            ) : (
              <div className="flex items-center gap-3">

                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-xl font-medium border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-xl transition"
                >
                  Register
                </Link>

              </div>
            )}

          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden"
          >
            {menuOpen ? (
              <X size={30} />
            ) : (
              <Menu size={30} />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (

        <div className="lg:hidden bg-white border-t shadow-xl">

          <div className="flex flex-col p-5 gap-2">

            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `${navLink} ${isActive ? activeLink : ""}`
              }
            >
              <Home size={18} />
              Home
            </NavLink>

            <NavLink
              to="/courses"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `${navLink} ${isActive ? activeLink : ""}`
              }
            >
              <BookOpen size={18} />
              Courses
            </NavLink>

            {isAuthenticated ? (
              <>

                <NavLink
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `${navLink} ${isActive ? activeLink : ""}`
                  }
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </NavLink>

                <NavLink
                  to="/my-courses"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `${navLink} ${isActive ? activeLink : ""}`
                  }
                >
                  <BookMarked size={18} />
                  My Courses
                </NavLink>

                <NavLink
                  to="/create-course"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `${navLink} ${isActive ? activeLink : ""}`
                  }
                >
                  <PlusCircle size={18} />
                  Create Course
                </NavLink>

                <NavLink
                  to="/my-learning"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `${navLink} ${isActive ? activeLink : ""}`
                  }
                >
                  <GraduationCap size={18} />
                  My Learning
                </NavLink>

                <NavLink
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `${navLink} ${isActive ? activeLink : ""}`
                  }
                >
                  <User size={18} />
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 mt-4 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </>
            ) : (
              <>

                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-center py-3 rounded-xl border border-blue-600 text-blue-600 font-medium"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="text-center py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold"
                >
                  Register
                </Link>

              </>
            )}

          </div>

        </div>

      )}

    </header>
  );
};

export default Navbar;