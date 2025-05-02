import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings/index";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/AddCourse/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/index";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/InstructorDashboard/Instructor";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.profile);

    return (
        <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
            <Navbar />
            <Routes>
                {/* Home Route */}
                <Route path="/" element={<Home />} />
                {/* About Route */}
                <Route path="about" element={<About />} />
                {/* Contact Route */}
                <Route path="/contact" element={<Contact />} />

                <Route path="catalog/:catalogName" element={<Catalog />} />
                <Route path="courses/:courseId" element={<CourseDetails />} />

                {/* Signup route */}
                <Route
                    path="signup"
                    element={
                        <OpenRoute>
                            <Signup />
                        </OpenRoute>
                    }
                />

                {/* Login Route */}
                <Route
                    path="login"
                    element={
                        <OpenRoute>
                            <Login />
                        </OpenRoute>
                    }
                />

                {/* Forgot password Route */}
                <Route
                    path="forgot-password"
                    element={
                        <OpenRoute>
                            <ForgotPassword />
                        </OpenRoute>
                    }
                />

                {/* Update password Route */}
                <Route
                    path="update-password/:id"
                    element={
                        <OpenRoute>
                            <UpdatePassword />
                        </OpenRoute>
                    }
                />

                {/* Verify EmailRoute */}
                <Route
                    path="verify-email"
                    element={
                        <OpenRoute>
                            <VerifyEmail />
                        </OpenRoute>
                    }
                />

                {/* Dashboard */}
                <Route
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                >
                    <Route
                        path="dashboard/my-profile"
                        element={<MyProfile />}
                    />

                    {/*Settings  */}
                    <Route path="dashboard/settings" element={<Settings />} />

                    {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                        <>
                            <Route path="dashboard/cart" element={<Cart />} />
                            <Route
                                path="dashboard/enrolled-courses"
                                element={<EnrolledCourses />}
                            />
                        </>
                    )}

                    {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                        <>
                            <Route
                                path="dashboard/instructor"
                                element={<Instructor />}
                            />
                            <Route
                                path="dashboard/add-course"
                                element={<AddCourse />}
                            />
                            <Route
                                path="dashboard/my-courses"
                                element={<MyCourses />}
                            />
                            <Route
                                path="dashboard/edit-course/:courseId"
                                element={<EditCourse />}
                            />
                        </>
                    )}
                </Route>

                {/* Video viewing route */}
                <Route
                    element={
                        <PrivateRoute>
                            <ViewCourse />
                        </PrivateRoute>
                    }
                >
                    {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                        <>
                            <Route
                                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                                element={<VideoDetails />}
                            />
                        </>
                    )}
                </Route>

                {/* Error */}
                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    );
}

export default App;
