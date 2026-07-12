import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { getCourseContent } from "../services/lectureService";
import {
  getProgress,
  markLectureComplete,
} from "../services/progressService";
import { downloadCertificate } from "../services/certificateService";
import toast from "react-hot-toast";

const LearnCourse = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [currentLecture, setCurrentLecture] = useState(null);

  const [progress, setProgress] = useState({
    percentage: 0,
    completedLectures: [],
    lastLecture: null,
  });

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const response = await getCourseContent(courseId);

      setCourse(response.course);

      const progressData = await getProgress(courseId);

      setProgress(progressData.progress);

      if (response.course.lectures.length > 0) {
        if (progressData.progress.lastLecture) {
          const lastLecture = response.course.lectures.find(
            (lecture) =>
              lecture._id ===
              progressData.progress.lastLecture._id
          );

          if (lastLecture) {
            setCurrentLecture(lastLecture);
          } else {
            setCurrentLecture(response.course.lectures[0]);
          }
        } else {
          setCurrentLecture(response.course.lectures[0]);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load course");
    }
  };

  const handleComplete = async () => {
    try {
      await markLectureComplete(
        courseId,
        currentLecture._id
      );

      toast.success("Lecture Completed");

      const progressData = await getProgress(courseId);

      setProgress(progressData.progress);

      handleNextLecture();
    } catch (error) {
      console.log(error);
      toast.error("Failed");
    }
  };

  const handleDownloadCertificate = async () => {
    try {
      const blob = await downloadCertificate(courseId);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `${course.title}-Certificate.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success("Certificate Downloaded");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Unable to download certificate"
      );
    }
  };

  const handleNextLecture = () => {
    if (!course || !currentLecture) return;

    const currentIndex = course.lectures.findIndex(
      (lecture) => lecture._id === currentLecture._id
    );

    if (currentIndex < course.lectures.length - 1) {
      setCurrentLecture(course.lectures[currentIndex + 1]);
    } else {
      toast.success("🎉 Course Finished");
    }
  };

  const handlePreviousLecture = () => {
    if (!course || !currentLecture) return;

    const currentIndex = course.lectures.findIndex(
      (lecture) => lecture._id === currentLecture._id
    );

    if (currentIndex > 0) {
      setCurrentLecture(course.lectures[currentIndex - 1]);
    }
  };

  if (!course) {
    return (
      <MainLayout>
        <h1 className="text-center text-3xl mt-20">
          Loading...
        </h1>
      </MainLayout>
    );
  }
    return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-10 px-5">

        <h1 className="text-4xl font-bold mb-8">
          {course.title}
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Left Side */}
          <div className="md:col-span-2">

            {currentLecture ? (
              <>
                <video
                  controls
                  className="w-full rounded-xl"
                  src={currentLecture.videoUrl}
                  onEnded={handleNextLecture}
                />

                <h2 className="text-2xl font-bold mt-6">
                  {currentLecture.title}
                </h2>

                <p className="text-gray-600 mt-3">
                  {currentLecture.description}
                </p>

                {/* Progress */}
                <div className="mt-8">

                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">
                      Course Progress
                    </span>

                    <span>{progress.percentage}%</span>
                  </div>

                  <div className="w-full h-3 bg-gray-300 rounded-full">

                    <div
                      className="h-3 bg-green-600 rounded-full"
                      style={{
                        width: `${progress.percentage}%`,
                      }}
                    />

                  </div>

                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 mt-6">

                  <button
                    onClick={handleComplete}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                  >
                    ✔ Mark Lecture Complete
                  </button>

                  {progress.percentage === 100 && (
                    <button
                      onClick={handleDownloadCertificate}
                      className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
                    >
                      📜 Download Certificate
                    </button>
                  )}

                </div>

                {/* Previous / Next */}
                <div className="flex gap-4 mt-5">

                  <button
                    onClick={handlePreviousLecture}
                    disabled={
                      course.lectures.findIndex(
                        (l) => l._id === currentLecture._id
                      ) === 0
                    }
                    className="bg-gray-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg"
                  >
                    ◀ Previous
                  </button>

                  <button
                    onClick={handleNextLecture}
                    disabled={
                      course.lectures.findIndex(
                        (l) => l._id === currentLecture._id
                      ) === course.lectures.length - 1
                    }
                    className="bg-blue-600 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg"
                  >
                    Next ▶
                  </button>

                </div>

              </>
            ) : (
              <h2 className="text-center text-2xl">
                No Lectures Available
              </h2>
            )}

          </div>

          {/* Right Side */}
          <div className="bg-white shadow rounded-xl p-5">

            <h2 className="text-2xl font-bold mb-5">
              Course Content
            </h2>

            {course.lectures.length === 0 ? (
              <p>No Lectures</p>
            ) : (
              course.lectures.map((lecture, index) => (

                <div
                  key={lecture._id}
                  onClick={() => setCurrentLecture(lecture)}
                  className={`cursor-pointer p-3 rounded-lg mb-3 transition ${
                    currentLecture?._id === lecture._id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >

                  <div className="flex justify-between items-center">

                    <div>
                      <p className="font-semibold">
                        Lecture {index + 1}
                      </p>

                      <p>{lecture.title}</p>
                    </div>

                    {progress.completedLectures?.includes(
                      lecture._id
                    ) && (
                      <span className="text-green-600 text-xl">
                        ✔
                      </span>
                    )}

                  </div>

                </div>

              ))
            )}

          </div>

        </div>

      </div>
    </MainLayout>
  );
};

export default LearnCourse;