import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import { createCourse } from "../services/courseService";

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

      if (data.thumbnail && data.thumbnail[0]) {
        formData.append("thumbnail", data.thumbnail[0]);
      }

      const response = await createCourse(formData);

      toast.success(response.message);

      navigate("/my-courses");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Course Creation Failed"
      );
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Create New Course
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>
            <label className="block mb-2 font-medium">
              Course Title
            </label>

            <input
              type="text"
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter Course Title"
              {...register("title", {
                required: "Title is required",
              })}
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.title?.message}
            </p>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows="4"
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter Description"
              {...register("description", {
                required: "Description is required",
              })}
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.description?.message}
            </p>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Price
            </label>

            <input
              type="number"
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter Price"
              {...register("price", {
                required: "Price is required",
              })}
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.price?.message}
            </p>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <input
              type="text"
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter Category"
              {...register("category", {
                required: "Category is required",
              })}
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.category?.message}
            </p>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Thumbnail
            </label>

            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-lg px-4 py-3"
              {...thumbnailRegister}
              onChange={(e) => {
                thumbnailRegister.onChange(e);

                if (e.target.files && e.target.files[0]) {
                  setPreview(
                    URL.createObjectURL(e.target.files[0])
                  );
                  setFileName(e.target.files[0].name);
                }
              }}
            />

            {fileName && (
              <p className="mt-2 text-sm text-gray-600">
                📁 {fileName}
              </p>
            )}

            {preview && (
              <img
                src={preview}
                alt="Thumbnail Preview"
                className="mt-4 h-52 w-full object-cover rounded-lg border"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Creating..." : "Create Course"}
          </button>

        </form>

      </div>
    </MainLayout>
  );
};

export default CreateCourse;