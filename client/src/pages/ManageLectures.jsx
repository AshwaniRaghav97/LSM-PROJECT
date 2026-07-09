import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import {
  getCourseLectures,
  deleteLecture,
} from "../services/lectureService";

const ManageLectures = () => {
  const { courseId } = useParams();

  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const response = await getCourseLectures(courseId);
      setLectures(response.lectures);
    } catch (error) {
      toast.error("Failed to load lectures");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lecture?")) return;

    try {
      const response = await deleteLecture(id);

      toast.success(response.message);

      fetchLectures();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto mt-10">

        <div className="flex justify-between mb-8">

          <h1 className="text-4xl font-bold">
            Manage Lectures
          </h1>

          <Link
            to={`/add-lecture/${courseId}`}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            + Add Lecture
          </Link>

        </div>

        {lectures.length === 0 ? (
          <h2>No Lectures Found</h2>
        ) : (
          <div className="space-y-6">

            {lectures.map((lecture) => (

              <div
                key={lecture._id}
                className="bg-white shadow-lg rounded-xl p-6"
              >

                <h2 className="text-2xl font-bold">
                  {lecture.title}
                </h2>

                <p className="mt-2">
                  {lecture.description}
                </p>

                <video
                  controls
                  className="w-full rounded-lg mt-4"
                >
                  <source
                    src={lecture.videoUrl}
                    type="video/mp4"
                  />
                </video>

                <div className="flex gap-3 mt-5">

                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(lecture._id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default ManageLectures;