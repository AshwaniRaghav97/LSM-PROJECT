import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

import {
  Menu,
  X,
  User,
  LogOut,
  BookOpen,
  LayoutDashboard,
  GraduationCap,
  PlusCircle,
  Settings,
  ChevronDown,
} from "lucide-react";

import { logout } from "../features/auth/authSlice";
import { logoutUser } from "../services/authService";

const Navbar = () => {

const dispatch = useDispatch();

const { user, isAuthenticated } = useSelector(
(state) => state.auth
);

const [menuOpen, setMenuOpen] = useState(false);

const [profileOpen, setProfileOpen] =
useState(false);

const dropdownRef = useRef(null);

useEffect(() => {

const handleClickOutside = (event) => {

if (
dropdownRef.current &&
!dropdownRef.current.contains(event.target)
) {

setProfileOpen(false);

}

};

document.addEventListener(
"mousedown",
handleClickOutside
);

return () =>
document.removeEventListener(
"mousedown",
handleClickOutside
);

}, []);

const handleLogout = async () => {

try {

await logoutUser();

dispatch(logout());

toast.success("Logout Successful");

} catch {

toast.error("Logout Failed");

}

};

const navClass = ({ isActive }) =>
`font-medium transition ${
isActive
? "text-blue-600"
: "text-gray-700 hover:text-blue-600"
}`;

return (
<nav className="sticky top-0 z-50 bg-white border-b shadow-sm">

<div className="max-w-7xl mx-auto px-6">

<div className="h-20 flex items-center justify-between">

{/* Logo */}

<Link
to="/"
className="flex items-center gap-3"
>

<div className="h-11 w-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">

<BookOpen
className="text-white"
size={24}
/>

</div>

<div>

<h1 className="text-2xl font-bold">

CodeLearn

</h1>

<p className="text-xs text-gray-500">

Learn • Build • Grow

</p>

</div>

</Link>

{/* Desktop Links */}

<div className="hidden lg:flex items-center gap-8">

<NavLink
to="/"
className={navClass}
>
Home
</NavLink>

<NavLink
to="/courses"
className={navClass}
>
Courses
</NavLink>

{isAuthenticated && (

<>

<NavLink
to="/dashboard"
className={navClass}
>

Dashboard

</NavLink>

<NavLink
to="/my-learning"
className={navClass}
>

My Learning

</NavLink>

</>

)}

</div>
        {/* Right Side */}

        <div className="flex items-center gap-4">

          {!isAuthenticated ? (

            <div className="hidden lg:flex items-center gap-4">

              <Link
                to="/login"
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Register
              </Link>

            </div>

          ) : (

            <div
              className="relative hidden lg:block"
              ref={dropdownRef}
            >

              <button
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
                className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition"
              >

                <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                  {user?.name?.charAt(0)?.toUpperCase()}

                </div>

                <span className="font-semibold">

                  {user?.name}

                </span>

                <ChevronDown size={18} />

              </button>

              {profileOpen && (

                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border overflow-hidden">

                  <div className="px-5 py-4 border-b">

                    <h3 className="font-bold">

                      {user?.name}

                    </h3>

                    <p className="text-sm text-gray-500">

                      {user?.email}

                    </p>

                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                  >

                    <User size={18} />

                    Profile

                  </Link>

                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                  >

                    <LayoutDashboard size={18} />

                    Dashboard

                  </Link>

                  <Link
                    to="/my-learning"
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                  >

                    <GraduationCap size={18} />

                    My Learning

                  </Link>

                  <Link
                    to="/my-courses"
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                  >

                    <BookOpen size={18} />

                    My Courses

                  </Link>

                  {user?.role === "instructor" && (

                    <Link
                      to="/create-course"
                      className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                    >

                      <PlusCircle size={18} />

                      Create Course

                    </Link>

                  )}

                  <Link
                    to="/edit-profile"
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                  >

                    <Settings size={18} />

                    Edit Profile

                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50"
                  >

                    <LogOut size={18} />

                    Logout

                  </button>

                </div>

              )}

            </div>

          )}

          {/* Mobile Menu Button */}

          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="lg:hidden"
          >

            {menuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}

          </button>

        </div>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (

        <div className="lg:hidden border-t bg-white">

          <div className="flex flex-col p-5 space-y-4">

            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={navClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/courses"
              onClick={() => setMenuOpen(false)}
              className={navClass}
            >
              Courses
            </NavLink>

            {isAuthenticated && (

              <>

                <NavLink
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className={navClass}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/my-learning"
                  onClick={() => setMenuOpen(false)}
                  className={navClass}
                >
                  My Learning
                </NavLink>

                <NavLink
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className={navClass}
                >
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="text-left text-red-600 font-semibold"
                >
                  Logout
                </button>

              </>

            )}

            {!isAuthenticated && (

              <>

                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className={navClass}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
                >
                  Register
                </NavLink>

              </>

            )}

          </div>

        </div>

      )}

    </div>

  </nav>
);
};

export default Navbar;