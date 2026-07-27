import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";

const Home = () => {
  return (
    <MainLayout>

      {/* ================= HERO ================= */}

      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left */}

            <div>

              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                🚀 India's Modern Learning Platform
              </span>

              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mt-8">

                Learn Skills

                <br />

                Build Your

                <span className="text-yellow-300">
                  {" "}Dream Career
                </span>

              </h1>

              <p className="text-lg text-blue-100 mt-8 leading-8">

                Learn programming from industry experts,
                build real-world projects, earn certificates
                and get placement ready with CodeLearn.

              </p>

              <div className="flex flex-wrap gap-5 mt-10">

                <Link
                  to="/courses"
                  className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition"
                >
                  Explore Courses

                  <ArrowRight size={20}/>
                </Link>

                <Link
                  to="/register"
                  className="border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition"
                >
                  Get Started
                </Link>

              </div>

            </div>

            {/* Right */}

            <div>

              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
                alt="Learning"
                className="rounded-3xl shadow-2xl"
              />

            </div>

          </div>

        </div>

      </section>

      {/* ================= STATS ================= */}

      <section className="bg-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-blue-50 rounded-2xl p-8 text-center shadow hover:-translate-y-2 transition">

              <BookOpen
                size={45}
                className="mx-auto text-blue-600"
              />

              <h2 className="text-4xl font-bold mt-5">
                500+
              </h2>

              <p className="text-gray-600 mt-2">
                Premium Courses
              </p>

            </div>

            <div className="bg-green-50 rounded-2xl p-8 text-center shadow hover:-translate-y-2 transition">

              <Users
                size={45}
                className="mx-auto text-green-600"
              />

              <h2 className="text-4xl font-bold mt-5">
                10K+
              </h2>

              <p className="text-gray-600 mt-2">
                Happy Students
              </p>

            </div>

            <div className="bg-purple-50 rounded-2xl p-8 text-center shadow hover:-translate-y-2 transition">

              <GraduationCap
                size={45}
                className="mx-auto text-purple-600"
              />

              <h2 className="text-4xl font-bold mt-5">
                50+
              </h2>

              <p className="text-gray-600 mt-2">
                Expert Mentors
              </p>

            </div>

            <div className="bg-yellow-50 rounded-2xl p-8 text-center shadow hover:-translate-y-2 transition">

              <Star
                size={45}
                className="mx-auto text-yellow-500"
              />

              <h2 className="text-4xl font-bold mt-5">
                4.9★
              </h2>

              <p className="text-gray-600 mt-2">
                Student Rating
              </p>

            </div>

          </div>

        </div>

      </section>

    </MainLayout>
  );
};

export default Home;