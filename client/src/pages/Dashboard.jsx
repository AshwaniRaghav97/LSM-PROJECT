import MainLayout from "../layouts/MainLayout";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-2">
          Welcome, {user?.name} 👋
        </h1>

        <p className="text-gray-500 mb-8">
          Manage your learning journey from here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold">
              Total Courses
            </h2>

            <p className="text-4xl font-bold mt-3">
              12
            </p>
          </div>

          <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold">
              Enrolled Courses
            </h2>

            <p className="text-4xl font-bold mt-3">
              4
            </p>
          </div>

          <div className="bg-purple-600 text-white rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold">
              Completed
            </h2>

            <p className="text-4xl font-bold mt-3">
              2
            </p>
          </div>

        </div>

        <div className="mt-10 bg-white shadow rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Recent Courses
          </h2>

          <ul className="space-y-3">

            <li className="border rounded-lg p-4 hover:bg-gray-50">
              🚀 Complete MERN Stack
            </li>

            <li className="border rounded-lg p-4 hover:bg-gray-50">
              ☕ Java DSA Masterclass
            </li>

            <li className="border rounded-lg p-4 hover:bg-gray-50">
              ⚛ React Beginner to Advanced
            </li>

          </ul>

        </div>

      </div>
    </MainLayout>
  );
};

export default Dashboard;