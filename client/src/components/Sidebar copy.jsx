import React, { useState,useEffect } from "react";
import { Button, Sidebar } from "flowbite-react";
import { Link, Navigate } from "react-router-dom";
// import { MdHome } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
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
    const { user, edit } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {sucess, token}=useSelector((state)=>state.user)
  // const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  const handleSubmit = async()=>{
    dispatch(logout());
    navigate('/');

  }
  const id = user._id;

  // useEffect(()=>{
  //   if(!sucess){  
  //     navigate('/');
  //   }
  // }, [sucess]);

  return (
    <>
      <Sidebar
        aria-label="Default sidebar example"
        // open={isOpen}
        // onClose={() => setIsOpen(false)}
        className="bg-black"
      >
        <div className="flex flex-row items-center pl-5">
          <MdOutlineMenu className="text-white text-3xl mr-2" />
          <Link
            to="/"
            className={`text-3xl font-extrabold text-white hover:text-gray-300 py-5`}
          >
            HNOSS
          </Link>
        </div>
        {/* <div className="flex flex-row">

        <MdOutlineMenu className="flex-row text-white" />
        <Link
          to="/"
          className={`flex item-center text-3xl font-extrabold justify-center text-white hover:text-gray-300 py-5`}
        >
          HNOSS
        </Link>
        </div> */}
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="/home"
              className="flex items-center p-4 text-white hover:text-black rounded-lg hover:bg-gray-300 group"
              icon={AiFillHome}
              style={{icon:'white'}}
            >
              <span className="pl-2  flex-1 ms-3 whitespace-nowrap">Home</span>
            </Sidebar.Item>
            <Sidebar.Item
              href="/findadate"
              icon={FaHeart}
              className="flex items-center p-4 text-white hover:text-black rounded-lg hover:bg-gray-300 group"
            >
              <span className="pl-2  flex-1 ms-3 whitespace-nowrap">
                Find-a-date
              </span>
            </Sidebar.Item>
            <Sidebar.Item
              href="/messages"
              icon={AiFillMessage}
              className="flex items-center p-4 text-white hover:text-black rounded-lg hover:bg-gray-300 group"
            >
              <span className="pl-2  flex-1 ms-3 whitespace-nowrap">
                Messages
              </span>
            </Sidebar.Item>
            <Sidebar.Item
              href="/counselling"
              className="flex items-center p-4 text-white hover:text-black rounded-lg hover:bg-gray-300 group"
              // label="Pro"
              // labelColor="dark"
              icon={FaUserGroup}
            >
              <span className="pl-2  flex-1 ms-3 whitespace-nowrap">
                Counselling
              </span>
            </Sidebar.Item>
            {/* <Sidebar.Item
              href={"/profile/" + id}
              className="flex items-center p-4 text-white hover:text-black rounded-lg hover:bg-gray-300 group"
              icon={FaUser}
            >
              <span className="pl-2  flex-1 ms-3 whitespace-nowrap">
                Profile
              </span>
            </Sidebar.Item> */}

            <Sidebar.Item
              onClick={handleSubmit}
              className="flex cursor-pointer items-center p-4 text-white hover:text-black rounded-lg hover:bg-gray-300 group"
              icon={BiLogOut}
            >
              <span className="pl-2  flex-1 ms-3 whitespace-nowrap">
                Logout
              </span>
            </Sidebar.Item>

            {/* <Button
              className="bottom-0 absolute my-2  flex items-center p-1 text-white hover:text-black rounded-lg hover:bg-gray-300 group"
              onClick={handleSubmit}
            > */}

            <Link
              to={"/profile/" + id}
              className="bottom-0 pl-5 pb-5 mb-5 absolute hover:text-black rounded-lg  group"
            >
              <div className="flex gap-1 items-center cursor-pointer ">
                {user?.image ? (
                  <img
                    src={user?.image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <span className="text-white w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    {getInitials(user?.name)}
                  </span>
                )}
                <span className="pl-1 font-medium text-white font-semibold ">
                  {user?.name}
                </span>
              </div>
            </Link>

            {/* <Sidebar.Item
              href="#"
              onClick={handleSubmit}
              className="bottom-0 absolute mb-5 flex items-center text-white hover:text-black  p-4 rounded-lg hover:bg-gray-300 group"
              icon={BiLogOut}
              // className="hover:text-black"
            >
              <span className="pl-2 flex-1 ms-3 whitespace-nowrap">Logout</span>
            </Sidebar.Item> */}
            {/* </Button> */}
            {/* <Sidebar.Item href="#" icon={HiTable}>
              Sign Up
            </Sidebar.Item> */}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default Sidebar1;

