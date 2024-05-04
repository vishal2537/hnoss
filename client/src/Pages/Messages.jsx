import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../features/post/postActions";
import {
  getMessages,
  sendMessage,
} from "../features/conversation/conversationAction";
import {
  setMessage,
  setReceiver,
} from "../features/conversation/conversationSlice";

const Messages = () => {
  const dispatch = useDispatch();
  const { user, token, id } = useSelector((state) => state.user);
  const { receiver, image, name, messages } = useSelector(
    (state) => state.conversations
  );
  const [data, setData] = useState({
    sender: "",
    receiver: "",
    message: "",
  });

  const [friendsInfo, setFriendsInfo] = useState([]);

  useEffect(() => {
    const fetchFriendsInfo = async () => {
      const friendIds = user.friends;
      const promises = friendIds.map((friendId) =>
        getUserInfo(token, friendId)
      );
      const friendsData = await Promise.all(promises);
      setFriendsInfo(friendsData);
    };
    fetchFriendsInfo();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (receiver) {
        // Fetch messages if receiver is selected
        getMessages({
          token: token,
          sender: id,
          receiver: receiver,
        }).then((res) => {
          dispatch(setMessage(res));
        });
      }
    }, 1000); // Fetch messages every 5 seconds (adjust interval as needed)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [receiver, dispatch, id, token]);

  const handleClick = async (id, image, name) => {
    const res = await getMessages({
      token: token,
      sender: user._id,
      receiver: id,
    });
    dispatch(setReceiver({ id: id, image: image, name: name }));
    dispatch(setMessage(res));
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      token: token,
      sender: id,
      message: data.message,
      receiver: receiver,
    };
    const res1 = await sendMessage(newData);
    const res2 = await getMessages({
      token: token,
      sender: id,
      receiver: receiver,
    });
    dispatch(setMessage(res2));
    setData({ ...data, message: "" });
  };

  const handleChange = (e) => {
    setData({ ...data, message: e.target.value });
  };

  return (
    <div>
      <div className="sm:w-full w-full h-full flex flex-col overflow-hidden px-4 min-w-[700px]">
        <div className="flex flex-row">
          <div className="w-2/5 border h-screen bg-gray-100 overflow-y-auto no-scrollbar">
            <div className="flex ml-3 items-center my-1 mx-2">
              <div className="border border-blue-200 rounded-full">
                <img
                  src={user.image}
                  alt="User"
                  className="rounded-full h-20 w-20"
                />
              </div>
              <div className="ml-8">
                <h3 className="text-2xl font-semibold">{user.name}</h3>
                <p className="text-lg font-semibold">My Account</p>
              </div>
            </div>
            <div className="mt-2 mb-2 pb-2">
              Messages
              <hr />
              <div className="text-blue-200 text-lg">
                {friendsInfo.map(({ name, image, _id }) => (
                  <div
                    className="flex cursor-pointer items-center py-3 border-b border-b-gray-300 hover:bg-gray-200"
                    key={_id}
                    onClick={() => handleClick(_id, image, name)}
                  >
                    <div className="flex items-center">
                      <div className="rounded-full">
                        <img
                          src={image}
                          alt={name}
                          className="h-20 w-20 rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-6">
                        <h3 className="text-xl font-semibold text-black">
                          {name}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {receiver ? (
            <div className="w-4/5 bg-white flex flex-col items-center">
              <div className="w-full h-[100px] bg-gray-100 flex items-center px-14">
                <div className="cursor-pointer">
                  <img
                    src={image}
                    alt={name}
                    className="h-20 w-20 rounded-full"
                  />
                </div>
                <div className="ml-6 mr-auto">
                  <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
              </div>

              <div
                className="w-full overflow-y-auto pb-2"
                style={{ height: "75vh" }}
              >
                {messages.map(({ message, sender, _id }) => (
                  <div className="p-2" key={_id}>
                    {sender !== id && (
                      <div className="max-w-[40%] bg-gray-100 rounded-b-xl rounded-tr-xl p-4 mb-6">
                        {message.text}
                      </div>
                    )}
                    {sender === id && (
                      <div className="max-w-[40%] bg-gray-300 rounded-b-xl rounded-tl-xl ml-auto p-4 text-black mb-6">
                        {message.text}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="w-full bottom-0">
                <form
                  className="p-2 mb-2 flex flex-row w-full"
                  onSubmit={handleMessageSubmit}
                >
                  <input
                    name="message"
                    value={data.message}
                    placeholder="Type a message..."
                    className="p-4 w-full border-0 shadow-lg rounded-full bg-light focus:ring-0 focus:border-0 outline-none hover:border"
                    onChange={handleChange}
                  />
                  <button type="submit">
                    <div className="ml-4 p-2 cursor-pointer bg-light rounded-full ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-send"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 14l11 -11" />
                        <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                      </svg>
                    </div>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-1/2 h-1/2 justify-center">
              <span>No Friend Selected</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
