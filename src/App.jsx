import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoute from "./routes/ProtectedRoutes";
import FullPageLoader from "./components/common/Loader";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MasterPage from "./pages/Masters";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Dashboard = React.lazy(() => import("./layouts/Dashboard"));
const MainDashboard = React.lazy(() => import("./pages/MainDashboard"));
const Todo = React.lazy(() => import("./pages/Todo"));
const Projects = React.lazy(() => import("./pages/Projects"));
const Blogs = React.lazy(() => import("./pages/Blogs"));
const CodeVault = React.lazy(() => import("./pages/CodeVault"));
const StudyPlan = React.lazy(() => import("./pages/StudyPlan"));
const InnovationLab = React.lazy(() => import("./pages/InnovationLab"));
const ComingSoon = React.lazy(() => import("./pages/CommingSoon"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Settings = React.lazy(() => import("./pages/Settings"));
const Track = React.lazy(() => import("./pages/Track"));

const App = () => {

  const GoogleAuthWrapper = () => {
    return <GoogleOAuthProvider clientId="173745826712-lddfup40edu6gj158gghseua5gjcn4gb.apps.googleusercontent.com">
      <Login />
    </GoogleOAuthProvider>

  }
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Suspense fallback={<FullPageLoader />}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
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
            >
              <Route index element={<MainDashboard />} />
              <Route path="todo" element={<Todo />} />
              <Route path="projects" element={<Projects />} />
              <Route path="journal" element={<Blogs />} />
              <Route path="master" element={<MasterPage />} />
              <Route path="study" element={<Track />} />
              <Route path="lab" element={<InnovationLab />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<ComingSoon />} />
            </Route>

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoutes>
                  <GoogleAuthWrapper />
                </PublicRoutes>
              }
            />

            <Route
              path="/signup"
              element={
                <PublicRoutes>
                  <Register />
                </PublicRoutes>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
