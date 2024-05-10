import { useState } from "react";
import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { AiFillMessage, AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";

function getInitials(fullName) {
  const names = fullName.split(" ");
  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  const initialsStr = initials.join("");
  return initialsStr;
}

const Sidebar1 = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleSidebar = () => {
    console.log(10)
    setIsOpen(!isOpen);
  };

  const handleSubmit = async () => {
    dispatch(logout());
    navigate("/");
  };
  const id = user._id;
  return isOpen ? (
    <>
      <Sidebar
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="bg-gray-100"
        style={{ width: "286px" }}
      >
        <div className="flex flex-row items-center px-4 py-3">
          <MdOutlineMenu
            className="text-black text-2xl mr-4 cursor-pointer"
            onClick={handleToggleSidebar}
          />
          <Link to="/" className={`text-3xl font-extrabold text-[black] `}>
            HNOSS
          </Link>
        </div>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <div className="bg-gray-200 hover:bg-white rounded-xl my-1 text-black ">
              <Link
                to="/home"
                className="flex items-center p-4 text-black  rounded-lg group"
                style={{ textDecoration: "none" }}
              >
                <AiFillHome className="text-[black] text-2xl" />
                <span className="pl-2 flex-1 ms-3 whitespace-nowrap">Home</span>
              </Link>
            </div>

            <div className="bg-gray-200 hover:bg-white rounded-xl my-1 ">
              <Link
                to="/findadate"
                className="flex items-center p-4 text-black rounded-lg group"
                style={{ textDecoration: "none" }}
              >
                <FaHeart className="text-[black] text-2xl" />
                <span className="pl-2 flex-1 ms-3 whitespace-nowrap">
                  Find-a-date
                </span>
              </Link>
            </div>

            <div className="bg-gray-200 hover:bg-white rounded-xl my-1 ">
              <Link
                to="/messages"
                className="flex items-center p-4 text-black rounded-lg group"
                style={{ textDecoration: "none" }}
              >
                <AiFillMessage className="text-[black] text-2xl" />
                <span className="pl-2 flex-1 ms-3 whitespace-nowrap">
                  Messages
                </span>
              </Link>
            </div>

            <div className="bg-gray-200 hover:bg-white rounded-xl my-1 ">
              <Link
                to="/counselling"
                className="flex items-center p-4 text-black rounded-lg group"
                style={{ textDecoration: "none" }}
              >
                <FaUserGroup className="text-[black] text-2xl" />
                <span className="pl-2 flex-1 ms-3 whitespace-nowrap">
                  Counselling
                </span>
              </Link>
            </div>

            <div className="bg-gray-200 hover:bg-white rounded-xl my-1 ">
              <Link
                onClick={handleSubmit}
                className="flex cursor-pointer items-center p-4 text-black rounded-lg group"
              >
                <BiLogOut className="text-[black] text-2xl" />
                <span className="pl-2 flex-1 ms-3 whitespace-nowrap">
                  Logout
                </span>
              </Link>
            </div>

            <Link
              to={"/profile/" + id}
              className="bottom-0 pl-5 pb-5 mb-5 absolute rounded-lg  group"
            >
              <div className="flex gap-1 items-center cursor-pointer ">
                {user?.image ? (
                  <img
                    src={user?.image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <span className="text-black w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    {getInitials(user?.name)}
                  </span>
                )}
                <span className="pl-1 text-black font-semibold ">
                  {user?.name}
                </span>
              </div>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  ) : (
    <>
      <Sidebar
        aria-label="Default sidebar example"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="bg-gray-100"
      >
        <div className="flex flex-row items-center pl-4 py-4">
          <MdOutlineMenu
            className="text-black text-2xl mr-4 cursor-pointer"
            onClick={handleToggleSidebar}
          />
        </div>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <div className="bg-gray-200 hover:bg-white rounded-xl my-1 text-black ">
              <Link
                to="/home"
                className="flex items-center p-4 text-black  rounded-lg group"
                style={{ textDecoration: "none" }}
              >
                <AiFillHome className="text-[black] text-2xl" />
              </Link>
            </div>

            <div className="bg-gray-200 hover:bg-white rounded-xl my-1 ">
              <Link
                to="/findadate"
                className="flex items-center p-4 text-black rounded-lg group"
                style={{ textDecoration: "none" }}
              >
                <FaHeart className="text-[black] text-2xl" />
              </Link>
            </div>

            <div className="bg-gray-200 hover:bg-white rounded-xl my-1 ">
              <Link
                to="/messages"
                className="flex items-center p-4 text-black rounded-lg group"
                style={{ textDecoration: "none" }}
              >
                <AiFillMessage className="text-[black] text-2xl" />
              </Link>
            </div>

            <div className="bg-gray-200 hover:bg-white rounded-xl my-1 ">
              <Link
                to="/counselling"
                className="flex items-center p-4 text-black rounded-lg group"
                style={{ textDecoration: "none" }}
              >
                <FaUserGroup className="text-[black] text-2xl" />
              </Link>
            </div>

            <div className="bg-gray-200 hover:bg-white rounded-xl my-1 ">
              <Link
                onClick={handleSubmit}
                className="flex cursor-pointer items-center p-4 text-black rounded-lg group"
              >
                <BiLogOut className="text-[black] text-2xl" />
              </Link>
            </div>

            <Link
              to={"/profile/" + id}
              className="bottom-0 pl-3 pb-5 mb-5 absolute rounded-lg  group"
            >
              <div className="flex gap-1 items-center cursor-pointer ">
                {user?.image ? (
                  <img
                    src={user?.image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <span className="text-black w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    {getInitials(user?.name)}
                  </span>
                )}
              </div>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default Sidebar1;
