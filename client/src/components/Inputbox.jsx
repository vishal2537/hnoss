import React from "react";

const Inputbox = ({
  label,
  name,
  type,
  isRequired = false,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor="email" className="text-slate-900">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={isRequired}
        className=" appearance-none block w-full px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-300 text-gray-900  rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-base"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Inputbox;
