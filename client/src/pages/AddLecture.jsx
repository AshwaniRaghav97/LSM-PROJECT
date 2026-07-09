import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import { addLecture } from "../services/lectureService";

const AddLecture = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);

      if (data.video[0]) {
        formData.append("video", data.video[0]);
      }

      const response = await addLecture(courseId, formData);

      toast.success(response.message);

      navigate("/my-courses");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Lecture Upload Failed"
      );
    }
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Add Lecture
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Lecture Title"
            className="w-full border rounded-lg px-4 py-3"
            {...register("title", { required: true })}
          />

          <textarea
            rows="4"
            placeholder="Lecture Description"
            className="w-full border rounded-lg px-4 py-3"
            {...register("description")}
          />

          <input
            type="file"
            accept="video/*"
            className="w-full border rounded-lg px-4 py-3"
            {...register("video")}
          />

          <button
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {isSubmitting ? "Uploading..." : "Add Lecture"}
          </button>

        </form>

      </div>
    </MainLayout>
  );
};

export default AddLecture;