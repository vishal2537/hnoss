import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { findUsers } from "../features/post/postActions";
import ListUsers from "./ListUsers";

const TopBar = () => {
  const { token } = useSelector((state) => state.user);
  const [data, setData] = useState({ name: "" });
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await findUsers(token, data.name);
    setSearchResults(res); // Store search results in state
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setData({ name: value });
  };

  return (
    <div className="topbar w-full flex items-center justify-between py-1 md:pt-2 px-4 bg-primary">
      <form
        className="hidden md:flex items-center justify-center"
      >
        <input
          placeholder="Search..."
          className="bg-secondary mt-2 rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] w-[18rem] lg:w-[38rem]  rounded-l-full py-3"
          onChange={handleChange}
          value={data.name}
        />
  
        <div
          className="bg-black text-white px-3 py-1 mt-2 rounded-r-full"
        >
        <ListUsers name="Users" data={data.name}  />
        </div>
      </form>
      {searchResults.length > 0 && <ListUsers name="Users" open="true" list={searchResults} />}
    </div>
  );
};

export default TopBar;