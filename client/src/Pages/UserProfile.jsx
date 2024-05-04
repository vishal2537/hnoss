import React, { useEffect,useState } from "react";
import { NoProfile } from "../assets";
import { useSelector } from "react-redux";
import Settings from "../components/Settings";
import List from "../components/List";
import { useParams } from 'react-router-dom';
import { getUserInfo } from "../features/post/postActions";
import Postgrid from "../components/Postgrid";
import { sendFriendRequest } from "../features/post/postActions";
import { BsPersonFillAdd } from "react-icons/bs";
import { formatNumber } from "../utils";

const UserProfile = () => {
  const { id : ID, token, user:USER } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);

  console.log(ID)
  const { id } = useParams();

  const getUser = async () => {
    const res = await getUserInfo(token, id);
    setUser(res);
  };

  const handleFriendRequest = async (id) => {
    try {
      const res = await sendFriendRequest(token, id);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getUser();
  }, [id])
  

  return (
    <div className="px-0 2xl:px-10 flex-col">
      <div className="w-full md:h-60 flex flex-col gap-5 items-center md:flex-row bg-gray-100 dark:bg-gradient-to-r from-[#020b19] via-[#071b3e] to-[#020b19]  mt-5 mb-10 rounded-md p-5 md:px-20">
        <img
          src={user?.image || NoProfile}
          alt="Writer"
          className="w-48 h-48 rounded-full border-4 border-slate-400 object-cover"
        />
        <div className="w-full h-full flex flex-col gap-y-5 md:gap-y-8  items-center justify-center">
          <div className="flex flex-row">
            <h2 className="text-black text-4xl 2xl:text-5xl font-bold">
              {user?.name}
            </h2>

            {ID !== id && !USER.friends.includes(id) && (
              <div className="flex ml-4 ">
                <button
                  className="bg-[#0444a430] text-sm text-white p-2 rounded"
                  onClick={() => handleFriendRequest(id)}
                >
                  <BsPersonFillAdd size={20} className="text-black" />
                </button>
              </div>
            )}
            {/* <a href="/home ">
              <IoMdSettings className="w-8 h-8 my-auto mx-2" />
            </a> */}
            <div className="flex flex-col justify-center">
              {ID === id && <Settings />}
            </div>
          </div>

          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <p className="text-black text-2xl font-semibold">
                {formatNumber(user?.friends?.length ?? 0)}
              </p>
              <span className="text-gray-500">
                <List name="Friends" list={user?.friends} id={id} />
                {/* {console.log("friends: ", user?.friends)} */}
              </span>
            </div>

            {id === ID && (
              <div className="flex flex-col items-center">
                <p className="text-black text-2xl font-semibold">
                  {formatNumber(user?.matches?.length ?? 0)}
                </p>
                <span className="text-gray-500">
                  <List name="Matches" list={user?.matches} id={id} />
                  {/* {console.log("matches:", user?.matches)} */}
                </span>
              </div>
            )}

          </div>
        </div>
      </div>
      <div className="w-full overflow-y-auto flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
        <Postgrid id={id} />
      </div>
    </div>
  );
};

export default UserProfile;
