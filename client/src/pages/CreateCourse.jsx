import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import { createCourse } from "../services/courseService";

import {
  BookOpen,
  Upload,
  Image,
  IndianRupee,
  Tag,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";

const CreateCourse = () => {

  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const thumbnailRegister = register("thumbnail");

  const onSubmit = async (data) => {

    try {

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);

      if (data.thumbnail?.[0]) {
        formData.append(
          "thumbnail",
          data.thumbnail[0]
        );
      }

      const response =
        await createCourse(formData);

      toast.success(response.message);

      navigate("/my-courses");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Course Creation Failed"
      );

    }

  };

  return (

    <MainLayout>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

        <div className="max-w-5xl mx-auto px-6 py-10">

          {/* Hero */}

          <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-10 shadow-2xl">

            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">

              <div>

                <Link
                  to="/my-courses"
                  className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-5"
                >

                  <ArrowLeft size={18} />

                  Back to My Courses

                </Link>

                <h1 className="text-5xl font-bold">

                  Create Course

                </h1>

                <p className="mt-5 text-lg text-blue-100 max-w-xl">

                  Create professional programming
                  courses and share your knowledge
                  with thousands of students.

                </p>

              </div>

              <div className="hidden lg:flex">

                <div className="h-44 w-44 rounded-full bg-white/10 flex items-center justify-center">

                  <GraduationCap size={90} />

                </div>

              </div>

            </div>

          </div>

          {/* Form */}

          <div className="bg-white rounded-3xl shadow-2xl p-10 mt-10">

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8"
            >
                            {/* Course Title */}

              <div>

                <label className="flex items-center gap-2 font-semibold mb-3">

                  <BookOpen
                    size={18}
                    className="text-blue-600"
                  />

                  Course Title

                </label>

                <input
                  type="text"
                  placeholder="Complete MERN Stack Development"
                  className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  {...register("title", {
                    required: "Title is required",
                  })}
                />

                <p className="text-red-500 text-sm mt-2">
                  {errors.title?.message}
                </p>

              </div>

              {/* Description */}

              <div>

                <label className="font-semibold mb-3 block">

                  Course Description

                </label>

                <textarea
                  rows="6"
                  placeholder="Write a detailed description of your course..."
                  className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />

                <p className="text-red-500 text-sm mt-2">
                  {errors.description?.message}
                </p>

              </div>

              {/* Price + Category */}

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <label className="flex items-center gap-2 font-semibold mb-3">

                    <IndianRupee
                      size={18}
                      className="text-green-600"
                    />

                    Course Price

                  </label>

                  <input
                    type="number"
                    placeholder="999"
                    className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    {...register("price", {
                      required: "Price is required",
                    })}
                  />

                  <p className="text-red-500 text-sm mt-2">
                    {errors.price?.message}
                  </p>

                </div>

                <div>

                  <label className="flex items-center gap-2 font-semibold mb-3">

                    <Tag
                      size={18}
                      className="text-purple-600"
                    />

                    Category

                  </label>

                  <select
                    className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    {...register("category", {
                      required: "Category is required",
                    })}
                  >

                    <option value="">
                      Select Category
                    </option>

                    <option>
                      Web Development
                    </option>

                    <option>
                      Full Stack Development
                    </option>

                    <option>
                      Java
                    </option>

                    <option>
                      Python
                    </option>

                    <option>
                      React
                    </option>

                    <option>
                      Node.js
                    </option>

                    <option>
                      DSA
                    </option>

                    <option>
                      AI / ML
                    </option>

                  </select>

                  <p className="text-red-500 text-sm mt-2">
                    {errors.category?.message}
                  </p>

                </div>

              </div>

              {/* Thumbnail */}

              <div>

                <label className="flex items-center gap-2 font-semibold mb-4">

                  <Image
                    size={18}
                    className="text-pink-600"
                  />

                  Course Thumbnail

                </label>

                <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center hover:border-blue-500 transition">

                  <Upload
                    size={40}
                    className="mx-auto text-blue-600 mb-4"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    className="w-full"
                    {...thumbnailRegister}
                    onChange={(e) => {

                      thumbnailRegister.onChange(e);

                      if (
                        e.target.files &&
                        e.target.files[0]
                      ) {

                        setPreview(
                          URL.createObjectURL(
                            e.target.files[0]
                          )
                        );

                        setFileName(
                          e.target.files[0].name
                        );

                      }

                    }}
                  />

                  <p className="text-gray-500 mt-3">

                    PNG, JPG or JPEG

                  </p>

                  {fileName && (

                    <p className="mt-4 font-semibold text-blue-600">

                      📁 {fileName}

                    </p>

                  )}

                </div>

                {preview && (

                  <div className="mt-8">

                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-72 rounded-2xl object-cover shadow-xl"
                    />

                  </div>

                )}

              </div>
                            {/* Submit Button */}

              <div className="pt-4">

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg hover:scale-[1.02] transition duration-300 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                >

                  {isSubmitting ? (

                    <>

                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

                      Creating Course...

                    </>

                  ) : (

                    <>

                      <BookOpen size={22} />

                      Create Course

                    </>

                  )}

                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </MainLayout>

  );

};

export default CreateCourse;