import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Dashboard from "./pages/Dashboard";
import CreateCourse from "./pages/CreateCourse";
import ProtectedRoute from "./components/ProtectedRoute";
import MyCourses from "./pages/MyCourses";
import EditCourse from "./pages/EditCourse";
import AddLecture from "./pages/AddLecture";
import ManageLectures from "./pages/ManageLectures";
import MyLearning from "./pages/MyLearning";
import LearnCourse from "./pages/LearnCourse";
import InstructorDashboard from "./pages/InstructorDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyCertificate from "./pages/VerifyCertificate";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/courses" element={<Courses />} />

        <Route path="/courses/:id" element={<CourseDetails />} />

        <Route
            path="/add-lecture/:courseId"
            element={ <ProtectedRoute> <AddLecture /> 
            </ProtectedRoute>
          }
        />

        <Route
           path="/instructor-dashboard"
            element={<InstructorDashboard />}
          /> 

          <Route
              path="/verify-certificate/:certificateId"
              element={<VerifyCertificate />}
          />

          <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>
        <Route
  path="/learn/:courseId"
  element={
    <ProtectedRoute>
      <LearnCourse />
    </ProtectedRoute>
  }
/>

        <Route
  path="/my-learning"
  element={
    <ProtectedRoute>
      <MyLearning />
    </ProtectedRoute>
  }
/>
        <Route
  path="/edit-course/:id" element={
            <ProtectedRoute>
               <EditCourse />
            </ProtectedRoute>
        }
      />

      <Route
          path="/profile"
          element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
        }
      />

      <Route
  path="/manage-lectures/:courseId"
  element={
    <ProtectedRoute>
      <ManageLectures />
    </ProtectedRoute>
  }
/>

        <Route
  path="/my-courses"
  element={ <ProtectedRoute>
              <MyCourses />
             </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-course"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />

        <Route
            path="/edit-profile"
            element={
           <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;