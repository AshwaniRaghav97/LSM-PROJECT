import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";

import { getCourseContent } from "../services/lectureService";
import {
  getProgress,
  markLectureComplete,
} from "../services/progressService";
import { downloadCertificate } from "../services/certificateService";

import {
  PlayCircle,
  CheckCircle2,
  Download,
  ArrowLeft,
  ArrowRight,
  Clock3,
  BookOpen,
  Trophy,
} from "lucide-react";

const LearnCourse = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [currentLecture, setCurrentLecture] =
    useState(null);

  const [progress, setProgress] = useState({
    percentage: 0,
    completedLectures: [],
    lastLecture: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);

      const response =
        await getCourseContent(courseId);

      setCourse(response.course);

      const progressData =
        await getProgress(courseId);

      setProgress(progressData.progress);

      if (response.course.lectures.length > 0) {
        if (progressData.progress.lastLecture) {
          const lastLecture =
            response.course.lectures.find(
              (lecture) =>
                lecture._id ===
                progressData.progress.lastLecture._id
            );

          setCurrentLecture(
            lastLecture ||
              response.course.lectures[0]
          );
        } else {
          setCurrentLecture(
            response.course.lectures[0]
          );
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    try {
      await markLectureComplete(
        courseId,
        currentLecture._id
      );

      toast.success("Lecture Completed");

      const progressData =
        await getProgress(courseId);

      setProgress(progressData.progress);

      handleNextLecture();
    } catch (error) {
      toast.error("Failed");
    }
  };

  const handleDownloadCertificate =
    async () => {
      try {
        const blob =
          await downloadCertificate(courseId);

        const url =
          window.URL.createObjectURL(blob);

        const link =
          document.createElement("a");

        link.href = url;

        link.download = `${course.title}-Certificate.pdf`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

        toast.success(
          "Certificate Downloaded"
        );
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Unable to download certificate"
        );
      }
    };

  const handleNextLecture = () => {
    if (!course || !currentLecture) return;

    const index = course.lectures.findIndex(
      (l) => l._id === currentLecture._id
    );

    if (index < course.lectures.length - 1) {
      setCurrentLecture(
        course.lectures[index + 1]
      );
    } else {
      toast.success(
        "🎉 Congratulations! Course Completed"
      );
    }
  };

  const handlePreviousLecture = () => {
    if (!course || !currentLecture) return;

    const index = course.lectures.findIndex(
      (l) => l._id === currentLecture._id
    );

    if (index > 0) {
      setCurrentLecture(
        course.lectures[index - 1]
      );
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="h-[70vh] flex items-center justify-center">
          <div className="text-3xl font-bold animate-pulse">
            Loading Course...
          </div>
        </div>
      </MainLayout>
    );
  }
    return (
    <MainLayout>
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">

        <div className="max-w-7xl mx-auto px-5 py-10">

          {/* Hero */}

          <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-8 shadow-2xl mb-8">

            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

              <div>

                <p className="text-blue-100 mb-2">
                  Continue Learning 🚀
                </p>

                <h1 className="text-4xl lg:text-5xl font-bold">
                  {course.title}
                </h1>

                <p className="mt-5 text-blue-100 max-w-2xl leading-7">
                  Learn at your own pace, complete every
                  lecture and unlock your course
                  certificate.
                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6">

                <div className="flex items-center gap-3 mb-4">

                  <Trophy className="text-yellow-300" />

                  <span className="font-semibold">
                    Course Progress
                  </span>

                </div>

                <h2 className="text-5xl font-bold">
                  {progress.percentage}%
                </h2>

              </div>

            </div>

          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left */}

            <div className="lg:col-span-2">

              {currentLecture ? (

                <>

                  {/* Video */}

                  <div className="overflow-hidden rounded-3xl shadow-2xl bg-black">

                    <video
                      controls
                      className="w-full aspect-video"
                      src={currentLecture.videoUrl}
                      onEnded={handleNextLecture}
                    />

                  </div>

                  {/* Lecture */}

                  <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

                    <div className="flex items-center gap-3 mb-3">

                      <PlayCircle className="text-blue-600" />

                      <span className="font-semibold text-blue-600">

                        Current Lecture

                      </span>

                    </div>

                    <h2 className="text-3xl font-bold">

                      {currentLecture.title}

                    </h2>

                    <p className="text-gray-600 leading-8 mt-5">

                      {currentLecture.description}

                    </p>

                    {/* Progress */}

                    <div className="mt-10">

                      <div className="flex justify-between mb-3">

                        <span className="font-semibold">

                          Learning Progress

                        </span>

                        <span className="font-bold text-blue-600">

                          {progress.percentage}%

                        </span>

                      </div>

                      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-700"
                          style={{
                            width: `${progress.percentage}%`,
                          }}
                        />

                      </div>

                    </div>

                    {/* Buttons */}

                    <div className="flex flex-wrap gap-4 mt-10">

                      <button
                        onClick={handleComplete}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-xl transition"
                      >

                        <CheckCircle2 size={20} />

                        Mark Complete

                      </button>

                      {progress.percentage === 100 && (

                        <button
                          onClick={
                            handleDownloadCertificate
                          }
                          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-7 py-3 rounded-xl transition"
                        >

                          <Download size={20} />

                          Download Certificate

                        </button>

                      )}

                    </div>

                    {/* Navigation */}

                    <div className="flex justify-between mt-10">

                      <button
                        onClick={
                          handlePreviousLecture
                        }
                        disabled={
                          course.lectures.findIndex(
                            (l) =>
                              l._id ===
                              currentLecture._id
                          ) === 0
                        }
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 text-white disabled:bg-gray-300"
                      >

                        <ArrowLeft size={18} />

                        Previous

                      </button>

                      <button
                        onClick={handleNextLecture}
                        disabled={
                          course.lectures.findIndex(
                            (l) =>
                              l._id ===
                              currentLecture._id
                          ) ===
                          course.lectures.length - 1
                        }
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300"
                      >

                        Next

                        <ArrowRight size={18} />

                      </button>

                    </div>

                  </div>

                </>
                              ) : (

                <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

                  <BookOpen
                    size={60}
                    className="mx-auto text-blue-600 mb-5"
                  />

                  <h2 className="text-3xl font-bold">
                    No Lectures Available
                  </h2>

                  <p className="text-gray-500 mt-3">
                    Instructor has not uploaded any
                    lectures yet.
                  </p>

                </div>

              )}

            </div>

            {/* ================= RIGHT SIDEBAR ================= */}

            <div className="space-y-6">

              {/* Progress Card */}

              <div className="bg-white rounded-3xl shadow-xl p-6">

                <h2 className="text-2xl font-bold mb-6">
                  Learning Progress
                </h2>

                <div className="flex justify-center">

                  <div className="relative h-36 w-36 rounded-full border-[10px] border-blue-100 flex items-center justify-center">

                    <span className="text-3xl font-bold text-blue-600">

                      {progress.percentage}%

                    </span>

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">

                  <div className="bg-blue-50 rounded-2xl p-4 text-center">

                    <Clock3
                      className="mx-auto text-blue-600 mb-2"
                    />

                    <p className="text-gray-500 text-sm">

                      Lectures

                    </p>

                    <h3 className="text-2xl font-bold">

                      {course.lectures.length}

                    </h3>

                  </div>

                  <div className="bg-green-50 rounded-2xl p-4 text-center">

                    <CheckCircle2
                      className="mx-auto text-green-600 mb-2"
                    />

                    <p className="text-gray-500 text-sm">

                      Completed

                    </p>

                    <h3 className="text-2xl font-bold">

                      {
                        progress.completedLectures
                          ?.length
                      }

                    </h3>

                  </div>

                </div>

              </div>

              {/* Lecture List */}

              <div className="bg-white rounded-3xl shadow-xl p-6">

                <h2 className="text-2xl font-bold mb-6">

                  Course Content

                </h2>

                <div className="space-y-4 max-h-[650px] overflow-y-auto pr-2">

                  {course.lectures.map(
                    (lecture, index) => {

                      const completed =
                        progress.completedLectures?.some(
                          (item) =>
                            (item._id || item).toString() ===
                            lecture._id.toString()
                        );

                      const active =
                        currentLecture?._id ===
                        lecture._id;

                      return (

                        <div
                          key={lecture._id}
                          onClick={() =>
                            setCurrentLecture(
                              lecture
                            )
                          }
                          className={`cursor-pointer rounded-2xl p-4 transition duration-300 border

                          ${
                            active
                              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-lg"
                              : "bg-gray-50 hover:bg-blue-50 border-gray-200"
                          }`}
                        >

                          <div className="flex justify-between items-start gap-3">

                            <div>

                              <p className="font-semibold">

                                Lecture {index + 1}

                              </p>

                              <p
                                className={`mt-1 text-sm ${
                                  active
                                    ? "text-blue-100"
                                    : "text-gray-600"
                                }`}
                              >

                                {lecture.title}

                              </p>

                            </div>

                            {completed ? (

                              <CheckCircle2
                                size={22}
                                className={
                                  active
                                    ? "text-green-300"
                                    : "text-green-600"
                                }
                              />

                            ) : (

                              <PlayCircle
                                size={22}
                                className={
                                  active
                                    ? "text-white"
                                    : "text-blue-600"
                                }
                              />

                            )}

                          </div>

                        </div>

                      );

                    }
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>

  );

};

export default LearnCourse;