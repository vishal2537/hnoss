import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton, Loading, PostCard, TopBar } from "../components";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import {
  apiRequest,
  deletePost,
  fetchPosts,
  likePost,
  sendFriendRequest,
} from "../features/post/postActions";
import { uploadFile } from "../utils";

const Home = () => {
  const { user, token } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const [friendRequest, setFriendRequest] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    userId: null,
    description: "",
    image: null,
  });
  const [fileURL, setFileURL] = useState();
  const dispatch = useDispatch();

  const handlePostSubmit = async () => {
    try {
      await apiRequest({
        url: "/posts/create-post",
        token: token,
        data: data,
        method: "POST",
      });
    } catch (error) {
      console.log(error);
      setPosting(false);
    }
  };

  useEffect(() => {
    if (file) {
      setLoading(true);
      uploadFile(setFileURL, setLoading, file);
    }
  }, [file]);

  useEffect(() => {
    setData({ ...data, image: fileURL });
  }, [fileURL]);

  const fetchPost = async () => {
    await fetchPosts(token, dispatch);
    setLoading(false);
  };

  const handleLikePost = async (uri) => {
    await likePost({ uri: uri, token: token });
    await fetchPost();
  };

  const handleDelete = async (id) => {
    await deletePost(id, token);
    await fetchPost();
  };

  const fetchFriendRequest = async () => {
    try {
      const res = await apiRequest({
        url: "/users/get-friend-request",
        token: token,
        method: "POST",
      });
      setFriendRequest(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSuggestedFriends = async () => {
    try {
      const res = await apiRequest({
        url: "/users/suggested-friends",
        token: token,
        method: "POST",
      });
      setSuggestedFriends(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFriendRequest = async (id) => {
    try {
      await sendFriendRequest(token, id);
      await fetchSuggestedFriends();
    } catch (error) {
      console.log(error);
    }
  };

  const acceptFriendRequest = async (id, status) => {
    try {
      const res = await apiRequest({
        url: "/users/accept-request",
        // token: user?.token,
        token: token,
        method: "POST",
        data: { rid: id, status },
      });
      setFriendRequest(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);

    setData({ ...data, description: e.target.value });
  };

  useEffect(() => {
    setLoading(true);
    fetchPost();
    fetchFriendRequest();
    fetchSuggestedFriends();
  }, []);

  return (
    <>
      <div className="w-full lg:px-10 flex-col lg:pb-10 bg-bgColor lg:rounded-lg h-screen overflow-hidden no-scrollbar">
        <TopBar />

        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full ">
          <div className="lg:w-3/5 sm:w-full h-full flex flex-col gap-6 overflow-y-auto no-scrollbar rounded-lg shadow-sm">
            <form
              onSubmit={handlePostSubmit}
              className="bg-primary px-4 rounded-lg shadow-lg"
            >
              <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
                <img
                  src={user?.image ?? NoProfile}
                  alt="User Image"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <input
                  //   styles="w-full rounded-full py-5"
                  placeholder="What's on your mind...."
                  name="description"
                  className="w-full rounded-full py-5"
                  value={data.description}
                  onChange={handleChange}
                />
              </div>
              {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${
                    errMsg?.status === "failed"
                      ? "text-[#f64949fe]"
                      : "text-[#2ba150fe]"
                  } mt-0.5`}
                >
                  {errMsg?.message}
                </span>
              )}

              <div className="flex items-center justify-between py-4">
                <label
                  htmlFor="imgUpload"
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="imgUpload"
                    data-max-size="5120"
                    accept=".jpg, .png, .jpeg"
                  />
                  <BiImages />
                  <span>Image</span>
                </label>

                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                  htmlFor="videoUpload"
                >
                  <input
                    type="file"
                    data-max-size="5120"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="videoUpload"
                    accept=".mp4, .wav"
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>

                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                  htmlFor="vgifUpload"
                >
                  <input
                    type="file"
                    data-max-size="5120"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="vgifUpload"
                    accept=".gif"
                  />
                  <BsFiletypeGif />
                  <span>Gif</span>
                </label>

                <div>
                  {fileURL ? (
                    <button
                      type="submit"
                      className="bg-black text-white py-1 px-6 rounded-full font-semibold text-sm"
                    >
                      Post
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-black text-white py-1 px-6 rounded-full font-semibold text-sm"
                      disabled
                    >
                      Post
                    </button>
                  )}
                </div>
              </div>
            </form>

            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post?._id}
                  post={post}
                  user={user}
                  token={token}
                  deletePost={handleDelete}
                  likePost={handleLikePost}
                />
              ))
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg text-ascent-2">No Post Available</p>
              </div>
            )}
          </div>

          {/* RIGhT */}
          <div className="hidden lg:w-1/3 sm:hidden  h-full lg:flex flex-col gap-8    pb-5">
            {/* FRIEND REQUEST */}
            <div className="w-full bg-primary shadow-lg rounded-lg px-6 py-5 overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
                <span> Friend Request</span>
                <span>{friendRequest?.length}</span>
              </div>

              <div className="w-full flex flex-col gap-4 pt-4 ">
                {friendRequest?.map(({ _id, requestFrom: from }) => (
                  <div key={_id} className="flex items-center justify-between">
                    {/* {console.log(from._id)} */}
                    <Link
                      to={"/profile/" + from._id}
                      className="w-full flex gap-4 items-center cursor-pointer"
                    >
                      <img
                        src={from?.image ?? NoProfile}
                        alt={from?.name}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-base font-medium text-ascent-1">
                          {from?.name}
                        </p>
                        <span className="text-sm text-ascent-2">
                          {from?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <div className="flex gap-1">
                      <CustomButton
                        title="Accept"
                        onClick={() => acceptFriendRequest(_id, "Accepted")}
                        containerStyles="bg-black text-xs text-white px-1.5 py-1 rounded-full"
                      />
                      <CustomButton
                        title="Deny"
                        onClick={() => acceptFriendRequest(_id, "Denied")}
                        containerStyles="border border-[#666] text-xs text-ascent-1 px-1.5 py-1 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SUGGESTED FRIENDS */}
            <div className="w-full bg-primary shadow-xl rounded-lg px-5 py-5 overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]">
                <span>Friend Suggestion</span>
                <span>{suggestedFriends?.length}</span>
              </div>
              <div className="w-full flex flex-col gap-4 pt-4 ">
                {suggestedFriends?.map((friend) => (
                  <div
                    className="flex items-center justify-between"
                    key={friend._id}
                  >
                    <Link
                      to={"/profile/" + friend?._id}
                      key={friend?._id}
                      className="w-full flex gap-4 items-center cursor-pointer"
                    >
                      <img
                        src={friend?.image ?? NoProfile}
                        alt={friend?.name}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div className="flex-1 ">
                        <p className="text-base font-medium text-ascent-1">
                          {friend?.name}
                        </p>
                        <span className="text-sm text-ascent-2">
                          {friend?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <div className="flex gap-1">
                      <button
                        className="bg-[#0444a430] text-sm text-white p-1 rounded"
                        onClick={() => handleFriendRequest(friend?._id)}
                      >
                        <BsPersonFillAdd size={20} className="text-black" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
