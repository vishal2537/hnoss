import {
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import {
  LandingPage,
  LoginPage,
  SignupPage,
  CounsellingPage,
  FindadatePage,
  Messages,
  UserProfile,
  Home,
} from "./Pages";
import Dashboard from "./Pages/Dashboard";
import Sidebar1 from "./components/Sidebar";
import { useSelector } from "react-redux";
// import Sample from "./Pages/Sample";

function Layout() {
  const { token } = useSelector((state) => state.user);

  return token ? (
    <div className="w-full flex flex-row min-h-screen min-w-[484px] ">
      {/* <div className="flex-none lg:w-20 md:1/4 overflow-hidden h-screen fixed "> */}
      <div className="flex md:1/4 overflow-hidden h-screen ">
        <Sidebar1 />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  ) : (
    <LoginPage />
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/counselling" element={<CounsellingPage />} />
          <Route path="/findadate" element={<FindadatePage />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/messages" element={<Messages />} />
        </Route>

        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
