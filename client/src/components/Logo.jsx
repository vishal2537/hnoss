import { Link } from "react-router-dom";

const Logo = ({ type }) => {
  return (
    <div className="">
      <Link
        to="/"
        className={`text-2xl font-semibold  ${type && "text-white  text-4xl"}`}
      >
        HN
        <span
          className={`text-2xl text-rose-500 ${type && " text-4xl font-bold"}`}
        >
          OSS
        </span>
      </Link>
    </div>
  );
};

export default Logo;
