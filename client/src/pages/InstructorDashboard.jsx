import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getInstructorDashboard } from "../services/dashboardService";
import toast from "react-hot-toast";

const InstructorDashboard = () => {

  const [dashboard, setDashboard] = useState({
    totalCourses: 0,
    publishedCourses: 0,
    unpublishedCourses: 0,
    totalStudents: 0,
    totalLectures: 0,
    totalRevenue: 0,
    totalReviews: 0,
    averageRating: 0,
    topCourses: [],
    recentPayments: [],
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchDashboard();
  }, []);


  const fetchDashboard = async () => {
    try {
      const response = await getInstructorDashboard();

      setDashboard(response.dashboard);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load dashboard");

    } finally {

      setLoading(false);

    }
  };


  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold">
            Loading Dashboard...
          </h1>
        </div>
      </MainLayout>
    );
  }


  return (
    <MainLayout>

      <div className="max-w-7xl mx-auto px-5 py-10">


        <h1 className="text-4xl font-bold mb-10">
          Instructor Dashboard
        </h1>


        {/* Stats Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">


          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-500">
              Total Courses
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-3">
              {dashboard.totalCourses}
            </h2>
          </div>



          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-500">
              Students
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-3">
              {dashboard.totalStudents}
            </h2>
          </div>




          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-500">
              Lectures
            </p>

            <h2 className="text-4xl font-bold text-purple-600 mt-3">
              {dashboard.totalLectures}
            </h2>
          </div>





          <div className="bg-white rounded-xl shadow-lg p-6">

            <p className="text-gray-500">
              Revenue
            </p>

            <h2 className="text-4xl font-bold text-red-600 mt-3">
              ₹ {dashboard.totalRevenue}
            </h2>

          </div>





          <div className="bg-white rounded-xl shadow-lg p-6">

            <p className="text-gray-500">
              Rating
            </p>

            <h2 className="text-4xl font-bold text-yellow-500 mt-3">
              ⭐ {dashboard.averageRating}
            </h2>

          </div>






          <div className="bg-white rounded-xl shadow-lg p-6">

            <p className="text-gray-500">
              Reviews
            </p>

            <h2 className="text-4xl font-bold text-indigo-600 mt-3">
              {dashboard.totalReviews}
            </h2>

          </div>


        </div>





        {/* Published Course Stats */}

        <div className="grid md:grid-cols-2 gap-6 mt-8">


          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-xl font-bold">
              Published Courses
            </h2>

            <p className="text-3xl font-bold text-green-600 mt-3">
              {dashboard.publishedCourses}
            </p>

          </div>




          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-xl font-bold">
              Unpublished Courses
            </h2>

            <p className="text-3xl font-bold text-orange-600 mt-3">
              {dashboard.unpublishedCourses}
            </p>

          </div>


        </div>






        {/* Top Courses */}

        <div className="bg-white rounded-xl shadow-lg mt-10 p-6">


          <h2 className="text-2xl font-bold mb-5">
            Top Courses
          </h2>



          <div className="grid md:grid-cols-3 gap-5">


            {dashboard.topCourses?.length > 0 ? (

              dashboard.topCourses.map((course,index)=>(

                <div
                  key={index}
                  className="border rounded-xl p-5"
                >

                  <h3 className="font-bold text-xl">
                    {course.title}
                  </h3>


                  <p className="mt-3 text-gray-600">
                    Students: {course.students}
                  </p>


                  <p className="font-semibold mt-2">
                    Revenue: ₹ {course.revenue}
                  </p>


                </div>

              ))

            ) : (

              <p className="text-gray-500">
                No Courses Found
              </p>

            )}


          </div>


        </div>







        {/* Recent Payments */}


        <div className="bg-white rounded-xl shadow-lg mt-10 p-6">


          <h2 className="text-2xl font-bold mb-5">
            Recent Payments
          </h2>



          <div className="overflow-x-auto">


            <table className="w-full border border-gray-200">


              <thead className="bg-gray-100">

                <tr>

                  <th className="p-3 text-left">
                    Student
                  </th>


                  <th className="p-3 text-left">
                    Email
                  </th>


                  <th className="p-3 text-left">
                    Course
                  </th>


                  <th className="p-3 text-left">
                    Amount
                  </th>


                  <th className="p-3 text-left">
                    Status
                  </th>


                </tr>

              </thead>



              <tbody>


                {
                  dashboard.recentPayments?.length > 0 ? (

                    dashboard.recentPayments.map((payment)=>(


                      <tr
                        key={payment._id}
                        className="border-b hover:bg-gray-50"
                      >


                        <td className="p-3">
                          {payment.user?.name || "N/A"}
                        </td>


                        <td className="p-3">
                          {payment.user?.email || "N/A"}
                        </td>


                        <td className="p-3">
                          {payment.course?.title || "N/A"}
                        </td>


                        <td className="p-3 font-semibold">
                          ₹ {payment.amount}
                        </td>


                        <td className="p-3">

                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            {payment.status}
                          </span>

                        </td>


                      </tr>


                    ))


                  ) : (


                    <tr>

                      <td
                        colSpan="5"
                        className="text-center py-8 text-gray-500"
                      >
                        No Payments Found
                      </td>

                    </tr>


                  )
                }


              </tbody>


            </table>


          </div>


        </div>


      </div>


    </MainLayout>
  );
};


export default InstructorDashboard;