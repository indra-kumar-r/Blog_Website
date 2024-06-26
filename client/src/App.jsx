import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./components/HomePage";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import "./styles/app.scss";
import { UserContextProvider } from "./components/UserContext";
import CreatePost from "./components/CreatePost";
import UserPosts from "./components/UserPosts";
import PostPage from "./components/PostPage";
import EditPost from "./components/EditPost";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound";
import { useEffect } from "react";
import ViewProfile from "./components/ViewProfile";
import Admin from "./components/Admin";
import Admin_Users from "./components/subComponents/Admin_Users";
import Admin_Posts from "./components/subComponents/Admin_Posts";
import Admin_Activity from "./components/subComponents/Admin_Activity";
import Admin_Settings from "./components/subComponents/Admin_Settings";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem("currentRoute", location.pathname);
  }, [location]);

  useEffect(() => {
    const storedRoute = sessionStorage.getItem("currentRoute");
    if (storedRoute) {
      navigate(storedRoute);
    }
  }, [navigate]);

  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={"/admin"} element={<Admin />} />
            <Route path={"/admin/users"} element={<Admin_Users />} />
            <Route path={"/admin/posts"} element={<Admin_Posts />} />
            <Route path={"/admin/activity"} element={<Admin_Activity />} />
            <Route path={"/admin/settings"} element={<Admin_Settings />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
            <Route path={"/create"} element={<CreatePost />} />
            <Route path={"/posts"} element={<UserPosts />} />
            <Route path={"/post/:id"} element={<PostPage />} />
            <Route path={"/edit/:id"} element={<EditPost />} />
            <Route path={"/profile"} element={<UserProfile />} />
            <Route path={"/user/:user"} element={<ViewProfile />} />
            <Route path={"*"} element={<NotFound />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
