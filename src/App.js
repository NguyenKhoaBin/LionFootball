import { Routes, Route } from "react-router-dom";
import CategoryAddNew from "./component/category/CategoryAddNew";
import CategoryManage from "./component/category/CategoryManage";
import CategoryUpdate from "./component/category/CategoryUpdate";
import DashboardLayout from "./component/dashboard/DashboardLayout";
import Postaddnew from "./component/layout/post/Postaddnew";
import PostDetailPage from "./component/layout/post/PostDetailPage";
import PostManage from "./component/layout/post/PostManage";
import PostUpdate from "./component/layout/post/PostUpdate";
import UserAddNew from "./component/user/UserAddNew";
import UserManage from "./component/user/UserManage";
import UserUpdate from "./component/user/UserUpdate";
import UserAddPost from "./component/userAct/UserAddPost";
import UserUpdateProfile from "./component/userAct/UserUpdateProfile";
import { AuthProvider } from "./contexts/auth-context";
import Contact from "./pages/Contact";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import Page404 from "./pages/Page404";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div id="app">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="*" element={<Page404></Page404>}></Route>
          <Route
            path="/:slug"
            element={<PostDetailPage></PostDetailPage>}
          ></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<Postaddnew></Postaddnew>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/add-user"
              element={<UserAddNew></UserAddNew>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/category-update"
              element={<CategoryUpdate></CategoryUpdate>}
            ></Route>
            <Route
              path="/manage/user-update"
              element={<UserUpdate></UserUpdate>}
            ></Route>
            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/post-update"
              element={<PostUpdate></PostUpdate>}
            ></Route>
          </Route>
          <Route path="/add-post" element={<UserAddPost></UserAddPost>}></Route>
          <Route
            path="/userProfile"
            element={<UserUpdateProfile></UserUpdateProfile>}
          ></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
