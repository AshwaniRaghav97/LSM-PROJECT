import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo */}

        <div>

          <div className="flex items-center gap-3">

            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">

              <BookOpen className="text-white" size={24} />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                CodeLearn
              </h2>

              <p className="text-sm text-gray-400">
                Learn • Build • Grow
              </p>

            </div>

          </div>

          <p className="mt-6 leading-7 text-gray-400">
            CodeLearn is a modern Learning Management
            System where students can learn programming,
            build real-world projects, earn certificates,
            and prepare for placements.
          </p>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="text-xl font-semibold text-white mb-5">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3">

            <Link
              to="/"
              className="hover:text-blue-400 transition"
            >
              Home
            </Link>

            <Link
              to="/courses"
              className="hover:text-blue-400 transition"
            >
              Courses
            </Link>

            <Link
              to="/login"
              className="hover:text-blue-400 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hover:text-blue-400 transition"
            >
              Register
            </Link>

          </div>

        </div>

        {/* Contact */}

        <div>

          <h3 className="text-xl font-semibold text-white mb-5">
            Contact
          </h3>

          <div className="space-y-4">

            <div className="flex items-center gap-3">

              <Mail className="text-blue-500" size={20} />

              <span>support@codelearn.com</span>

            </div>

            <div className="flex items-center gap-3">

              <Phone className="text-blue-500" size={20} />

              <span>+91 98765 43210</span>

            </div>

            <div className="flex items-center gap-3">

              <MapPin className="text-blue-500" size={20} />

              <span>India</span>

            </div>

          </div>

        </div>

        {/* Social */}

        <div className="flex gap-4">

  <a
    href="https://github.com/"
    target="_blank"
    rel="noreferrer"
    className="h-12 w-12 rounded-xl bg-slate-800 hover:bg-gray-700 duration-300 flex items-center justify-center"
  >
    <FaGithub size={22} />
  </a>

  <a
    href="https://linkedin.com/"
    target="_blank"
    rel="noreferrer"
    className="h-12 w-12 rounded-xl bg-slate-800 hover:bg-blue-600 duration-300 flex items-center justify-center"
  >
    <FaLinkedin size={22} />
  </a>

  <a
    href="https://instagram.com/"
    target="_blank"
    rel="noreferrer"
    className="h-12 w-12 rounded-xl bg-slate-800 hover:bg-pink-600 duration-300 flex items-center justify-center"
  >
    <FaInstagram size={22} />
  </a>

</div>

      </div>

      <div className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-400 text-center">
            © {new Date().getFullYear()} CodeLearn LMS. All Rights Reserved.
          </p>

          <p className="flex items-center gap-2 text-gray-400">

            Made with

            <Heart
              size={18}
              className="text-red-500 fill-red-500"
            />

            by <span className="font-semibold">Ashwani Raghav</span>

          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;