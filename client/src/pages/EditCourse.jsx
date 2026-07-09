import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import {
  getCourseById,
  updateCourse,
} from "../services/courseService";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const response = await getCourseById(id);

      reset({
        title: response.course.title,
        description: response.course.description,
        price: response.course.price,
        category: response.course.category,
      });
    } catch (error) {
      toast.error("Failed to load course");
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await updateCourse(id, data);

      toast.success(response.message);

      navigate("/my-courses");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
    }
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Edit Course
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Course Title"
            className="w-full border rounded-lg px-4 py-3"
            {...register("title", {
              required: true,
            })}
          />

          <textarea
            rows="4"
            placeholder="Course Description"
            className="w-full border rounded-lg px-4 py-3"
            {...register("description", {
              required: true,
            })}
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full border rounded-lg px-4 py-3"
            {...register("price", {
              required: true,
            })}
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full border rounded-lg px-4 py-3"
            {...register("category", {
              required: true,
            })}
          />

          <button
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {isSubmitting ? "Updating..." : "Update Course"}
          </button>

        </form>

      </div>
    </MainLayout>
  );
};

export default EditCourse;