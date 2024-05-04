import React, { useState,useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate } from "react-router-dom";
import { Button, Divider, Inputbox, Loading, Logo } from "../components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { emailLogin } from "../features/auth/authAction";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const {user,sucess, token} = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(emailLogin(data));
  };

  useEffect(()=>{
    if(token){  
      navigate('/home');
    }
  }, [token]);
  
  
  return (
     
    <div className="flex w-full  h-[100vh]">
      <div className="hidden md:flex flex-col gap-y-4 w-1/3 min-h-screen bg-black items-center justify-center">
        <Logo type="signin" />
        <span className="text-xl font-semibold text-white">
          Find your perfect match!
        </span>
      </div>

      <div className="flex w-full md:w-2/3 h-full bg-white from-black via-[#071b3e] to-black items-center px-10 md:px-20 lg:px-40">
        <div className="h-full flex flex-col items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
          <div className="block mb-10 md:hidden">
            <Logo />
          </div>
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-gray-900 ">
                Sign in to your account
              </h2>
            </div>
            
            <Divider label=" sign in with email" />

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col rounded-md shadow-sm -space-y-px gap-5">
                <Inputbox
                  label="Email Address"
                  name="email"
                  type="email"
                  isRequired={true}
                  placeholder="email@example.com"
                  value={data?.email}
                  onChange={handleChange}
                />

                <Inputbox
                  label="Password"
                  name="password"
                  type="password"
                  isRequired={true}
                  placeholder="Password"
                  value={data?.password}
                  onChange={handleChange}
                />
              </div>

              <Button
                label=" Sign In"
                type="submit"
                styles="group relative w-full flex justify-center py-2.5 2xl:py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-black hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 mt-8"
              />
            </form>

            <div className="flex items-center justify-center text-gray-600">
              <p>
                Don't have an account?
                <Link to="/sign-up" className="text-rose-800 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default LoginPage;
