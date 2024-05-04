import React, { useEffect, useState } from "react";
import { BiImages } from "react-icons/bi";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button, Inputbox, Logo } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  googleSignin,
  getGoogleSignUp,
  emailSignUp,
  emailLogin,
} from "../features/auth/authAction";
import { uploadFile } from "../utils";
import IsLoading from "../components/IsLoading";

const SignupPage = () => {
  const { user, sucess } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "male",
    city: "",
    state: "",
    profession: "",
  });
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    // const [name, value] = e.target;
    const { name, value } = e.target;
    console.log(name, value);
    setData({
      ...data,
      [name]: value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    // file && await uploadFile(setFileURL, file);
    // console.log(fileURL);
    // console.log(data);

    // dispatch(emailSignUp({ ...data, image: fileURL }));
    if (file) {
      setLoading(true);
      await uploadFile(setFileURL, setLoading, file);
    }
  };

  useEffect(() => {
    if (fileURL) dispatch(emailSignUp({ ...data, image: fileURL }));
  }, [fileURL]);

  useEffect(() => {
    if (sucess) {
      navigate("/home");
    }
  }, [sucess]);

  return loading ? (
    <IsLoading />
  ) : (
    <div className="flex w-full h-[100vh] overflow-hidden">
      {/* LEFT */}
      <div className="hidden md:flex flex-col gap-y-4 w-1/3 h-full bg-black items-center justify-center">
        {fileURL && (
          <img
            src={fileURL || file}
            alt=""
            className="w-16 h-16 rounded-full"
          />
        )}
        <Logo type="sigin" />
        <span className="text-xl font-semibold text-white">
          Find your perfect match!
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-2/3 h-full  bg-white from-black via-[#071b3e] to-black items-center px-4 md:px-20 lg:px-40 overflow-y-auto">
        <div className="w-full h-full flex flex-col items-center justify-center py-12 px-4 sm:px-0 lg:px-8">
          <div className="block mb-10 md:hidden -ml-8">
            <Logo />
          </div>

          {/* <div className="pt-10"> */}
          <div className="w-full pt-10 space-y-4 flex flex-col justify-start">
            <div className="max-w-md w-full flex gap-3 md:gap-4 items-center justify-center">
              {showForm && (
                <IoArrowBackCircleSharp
                  className="text-2xl lg:text-3xl cursor-pointer text-gray-800 "
                  onClick={() => setShowForm(false)}
                />
              )}
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 ">
                Sign up for an account
              </h2>
            </div>
            {/* {showForm ? ( */}
            <form
              className="max-w-md w-full mt-8 space-y-6 "
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col rounded-md shadow-sm -space-y-px gap-6 mb-8">
                <div className="w-full flex gap-4">
                  <Inputbox
                    // label="First Name"
                    name="firstName"
                    type="text"
                    isRequired={true}
                    placeholder="First Name"
                    value={data.firstName}
                    onChange={handleChange}
                  />
                  <Inputbox
                    // label=" Last Name"
                    name="lastName"
                    type="text"
                    isRequired={true}
                    placeholder="First Name"
                    value={data.lastName}
                    onChange={handleChange}
                  />
                </div>

                <Inputbox
                  // label="Email Address"
                  name="email"
                  type="email"
                  isRequired={true}
                  placeholder="email@example.com"
                  value={data.email}
                  onChange={handleChange}
                />
                <Inputbox
                  // label="Password"
                  name="password"
                  type="password"
                  isRequired={true}
                  placeholder="Password"
                  value={data.password}
                  onChange={handleChange}
                />

                <div className="w-full flex gap-4">
                  <Inputbox
                    // label="City"
                    name="city"
                    type="text"
                    isRequired={true}
                    placeholder="City"
                    value={data.city}
                    onChange={handleChange}
                  />
                  <Inputbox
                    // label="State"
                    name="state"
                    type="text"
                    isRequired={true}
                    placeholder="State"
                    value={data.state}
                    onChange={handleChange}
                  />
                </div>

                <Inputbox
                  // label="Profession"
                  name="profession"
                  type="text"
                  isRequired={true}
                  placeholder="Profession"
                  value={data.profession}
                  onChange={handleChange}
                />

                <div className="w-full flex  gap-4">
                  <div>
                    <Inputbox
                      // label="Age"
                      name="age"
                      type="text"
                      isRequired={true}
                      placeholder="age"
                      value={data.age}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-1/2">
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                        id="gender"
                        name="gender"
                        onChange={handleChange}
                      >
                        <option name="gender" value="male">
                          Male
                        </option>
                        <option name="gender" value="female">
                          Female
                        </option>
                      </select>
                      <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4">
                  <label
                    className="flex items-center gap-1 text-base text-black cursor-pointer"
                    htmlFor="imgUpload"
                  >
                    <input
                      type="file"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        console.log(e.target.files[0]);
                      }}
                      className="hidden"
                      id="imgUpload"
                      data-max-size="5120"
                      accept=".jpg, .png, .jpeg"
                    />
                    <BiImages />
                    <span>Picture</span>
                  </label>
                </div>
              </div>

              <Button
                label="Create Account"
                type="submit"
                styles="group relative w-full flex justify-center py-2.5 2xl:py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-black  hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 "
              />
            </form>

            <p className="max-w-md w-full text-center text-gray-600">
              Already has an account?{" "}
              <Link to="/sign-in" className="text-rose-800 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
