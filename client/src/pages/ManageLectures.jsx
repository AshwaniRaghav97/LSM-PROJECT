import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import {
  getCourseLectures,
  deleteLecture,
} from "../services/lectureService";

import {
  BookOpen,
  PlayCircle,
  Plus,
  Trash2,
  Pencil,
  GraduationCap,
  Video,
  Clock,
} from "lucide-react";

const ManageLectures = () => {

  const { courseId } = useParams();

  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {

    try {

      const response =
        await getCourseLectures(courseId);

      setLectures(response.lectures);

    } catch (error) {

      toast.error("Failed to load lectures");

    }

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this lecture?"))
      return;

    try {

      const response =
        await deleteLecture(id);

      toast.success(response.message);

      fetchLectures();

    } catch {

      toast.error("Delete Failed");

    }

  };

  return (

    <MainLayout>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* Hero */}

          <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-10 shadow-2xl">

            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">

              <div>

                <p className="text-blue-100 mb-2">
                  Instructor Panel
                </p>

                <h1 className="text-5xl font-bold">
                  Manage Lectures
                </h1>

                <p className="mt-5 text-lg text-blue-100 max-w-xl">

                  Add, edit and organize all lectures
                  inside your course.

                </p>

                <Link
                  to={`/add-lecture/${courseId}`}
                  className="inline-flex items-center gap-3 mt-8 bg-white text-blue-700 px-7 py-3 rounded-xl font-semibold hover:scale-105 transition"
                >

                  <Plus size={22} />

                  Add New Lecture

                </Link>

              </div>

              <div className="hidden lg:flex">

                <div className="h-44 w-44 rounded-full bg-white/10 flex items-center justify-center">

                  <GraduationCap size={90} />

                </div>

              </div>

            </div>

          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div className="bg-white rounded-2xl shadow-lg p-7">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Total Lectures
                  </p>

                  <h2 className="text-5xl font-bold mt-3">

                    {lectures.length}

                  </h2>

                </div>

                <div className="h-16 w-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                  <BookOpen className="text-blue-600"/>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-7">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Video Lessons
                  </p>

                  <h2 className="text-5xl font-bold mt-3 text-green-600">

                    {lectures.length}

                  </h2>

                </div>

                <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center">

                  <Video className="text-green-600"/>

                </div>

              </div>

            </div>

          </div>

          {/* Lecture List */}

          <div className="mt-14">

            <h2 className="text-3xl font-bold mb-8">

              Course Lectures

            </h2>

            {lectures.length > 0 ? (

              <div className="space-y-8">
                                {lectures.map((lecture, index) => (

                  <div
                    key={lecture._id}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                  >

                    <div className="grid lg:grid-cols-2 gap-8 p-8">

                      {/* Video */}

                      <div>

                        <div className="relative rounded-2xl overflow-hidden">

                          <video
                            controls
                            className="w-full rounded-2xl aspect-video bg-black"
                          >
                            <source
                              src={lecture.videoUrl}
                              type="video/mp4"
                            />
                          </video>

                          <span className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">

                            Lecture {index + 1}

                          </span>

                        </div>

                      </div>

                      {/* Details */}

                      <div className="flex flex-col justify-between">

                        <div>

                          <h2 className="text-3xl font-bold">

                            {lecture.title}

                          </h2>

                          <p className="text-gray-600 mt-5 leading-7">

                            {lecture.description}

                          </p>

                          <div className="flex flex-wrap gap-4 mt-8">

                            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">

                              <PlayCircle size={18} />

                              Video Lesson

                            </div>

                            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">

                              <Clock size={18} />

                              Available

                            </div>

                          </div>

                        </div>

                        {/* Buttons */}

                        <div className="flex flex-wrap gap-4 mt-10">

                          <button
                            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl transition"
                          >

                            <Pencil size={18} />

                            Edit Lecture

                          </button>

                          <button
                            onClick={() =>
                              handleDelete(lecture._id)
                            }
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition"
                          >

                            <Trash2 size={18} />

                            Delete Lecture

                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            ) : (
                            <div className="bg-white rounded-3xl shadow-xl py-20 px-10 text-center">

                <div className="h-28 w-28 mx-auto rounded-full bg-blue-100 flex items-center justify-center">

                  <BookOpen
                    size={55}
                    className="text-blue-600"
                  />

                </div>

                <h2 className="text-3xl font-bold mt-8">

                  No Lectures Added Yet

                </h2>

                <p className="text-gray-500 mt-4 max-w-lg mx-auto">

                  Start building your course by adding your
                  first lecture. Students will be able to
                  watch videos once lectures are published.

                </p>

                <Link
                  to={`/add-lecture/${courseId}`}
                  className="inline-flex items-center gap-3 mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition duration-300 shadow-lg"
                >

                  <Plus size={22} />

                  Add First Lecture

                </Link>

              </div>

            )}

          </div>

        </div>

      </div>

    </MainLayout>

  );

};

export default ManageLectures;