import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import TinderCard from "react-tinder-card";
import { TopBar } from "../components";
import { FaHeart } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { useSelector, useDispatch } from "react-redux";
import { getLiked } from "../features/liked/likedSlice";
import {
  getDateSuggestions,
  getUserInfo,
  findADate,
} from "../features/post/postActions";

function FindadatePage() {
  const { token, id } = useSelector((state) => state.user);
  const { loading, liked } = useSelector((state) => state.liked);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [date, setDate] = useState([]);
  const [user1, setUser1] = useState([]);
  const [likedUser, setLikedUser] = useState([]);
  const dispatch = useDispatch();

  const currentIndexRef = useRef(currentIndex);
  const childRefs = useMemo(
    () =>
      Array(user1.length)
        .fill(0)
        .map(() => React.createRef()),
    [user1]
  );

  const updateCurrentIndex = useCallback((val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  }, []);

  const canSwipe = currentIndex !== null && currentIndex >= 0;

  const getlikedUser = useCallback(async (token, id) => {
    const res = await getUserInfo(token, id);
    return res;
  }, []);

  const swiped = async (direction, nameToDelete, index) => {
    if (direction === "right") {
      try {
        await findADate(token, user1[index]._id);
        await getlikedUser(token, user1[index]._id);
      } catch (error) {
        console.error("Error finding a date:", error);
      }
    }
    updateCurrentIndex(index - 1);
  };

  const swipe = useCallback(
    async (dir) => {
      if (canSwipe) {
        await childRefs[currentIndex].current.swipe(dir);
      }
    },
    [canSwipe, currentIndex, childRefs]
  );

  const getSuggestions = useCallback(async () => {
    try {
      const res = await getDateSuggestions(token, id);
      setDate(res);
      setCurrentIndex(res.length - 1);
    } catch (error) {
      console.error("Error in getSuggestions:", error);
    }
  }, [token, id]);

  const getUser = useCallback(async (token, id) => {
    const res = await getUserInfo(token, id);
    setUser1((prevUser1) => [...prevUser1, res]);
  }, []);

  useEffect(() => {
    if (liked && !loading) dispatch(getLiked({ token, userid: id }));
  }, [liked, loading, dispatch, token, id]);

  useEffect(() => {
    getSuggestions();
    dispatch(getLiked({ token, userid: id }));
  }, [getSuggestions, dispatch, token, id]);

  useEffect(() => {
    if (date) {
      date.forEach(async (item) => {
        await getUser(token, item._id);
      });
    }
  }, [date, token, getUser]);

  useEffect(() => {
    if (!loading && liked) {
      const promises = liked.map(async (item) => {
        return await getUserInfo(token, item);
      });

      Promise.all(promises)
        .then((allLikedUsers) => {
          setLikedUser(allLikedUsers);
        })
        .catch((error) => {
          console.error("Error fetching liked users:", error);
        });
    }
  }, [liked, loading, token]);

  return (
    <div>
      <div className="w-full flex-col pb-0 lg:px-20 sm:px-0 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
        <div className="flex flex-row justify-center">
          <TopBar />
        </div>
        <div className="sm:w-full py-8 h-full flex flex-col gap-6 overflow-y-auto rounded ">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="cardContainer flex justify-center rounded-3xl">
                {user1.map((_id, index) => (
                  <div
                    key={index}
                    style={{
                      display: index === currentIndex ? "block" : "none",
                    }}
                  >
                    <TinderCard
                      ref={childRefs[index]}
                      className="swipe"
                      onSwipe={(dir) => swiped(dir, _id.name, index)}
                    >
                      <div className="card border bg-gray-100 px-5 py-5 rounded-3xl shadow-lg">
                        <img
                          src={_id?.image}
                          alt="banner"
                          className="object-cover h-96 w-full rounded-3xl"
                          style={{ maxHeight: "400px" }}
                        />
                        <h3 className="flex flex-row justify-center font-bold py-5">
                          {_id?.name}
                        </h3>
                        <h3 className="flex flex-row justify-center font-bold py-2">
                          Age: {_id?.age}
                        </h3>
                      </div>
                    </TinderCard>
                  </div>
                ))}
              </div>
              <div className="buttons my-5 flex justify-center">
                <button
                  style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
                  onClick={() => swipe("left")}
                  className="rounded-full border px-5 py-5 hover:bg-rose-200 mx-5"
                  disabled={!canSwipe}
                >
                  <ImCross className="w-10 h-10 text-red-600" />
                </button>
                <button
                  style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
                  onClick={() => swipe("right")}
                  className="rounded-full border px-5 py-5 hover:bg-green-200 mx-5"
                  disabled={!canSwipe}
                >
                  <FaHeart className="w-10 h-10 text-green-600" />
                </button>
              </div>
            </div>
            <div className="hidden lg:w-1/3 sm:hidden h-full lg:flex flex-col gap-8 overflow-y-auto">
              <div className="w-full bg-primary rounded-lg px-6 py-5 shadow-lg">
                <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
                  <span>Liked</span>
                  <span>{likedUser.length}</span>
                </div>
                <div className="w-full flex flex-col gap-4 pt-4">
                  {likedUser.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between"
                    >
                      <Link
                        to={"/profile/" + item._id}
                        className="w-full flex gap-4 items-center cursor-pointer"
                      >
                        <img
                          src={item.image ?? NoProfile}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        <div className="flex-1">
                          <p className="text-base font-medium text-ascent-1">
                            {item.name}
                          </p>
                          <span className="text-sm text-ascent-2">
                            {item.profession ?? "No Profession"}
                          </span>
                        </div>
                      </Link>
                      <div className="flex gap-1"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindadatePage;

// import React, {
//   useState,
//   useMemo,
//   useRef,
//   useEffect,
//   useCallback,
// } from "react";
// import TinderCard from "react-tinder-card";
// import { TopBar } from "../components";
// import { FaHeart } from "react-icons/fa";
// import { ImCross } from "react-icons/im";
// import { Link } from "react-router-dom";
// import { NoProfile } from "../assets";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getDateSuggestions,
//   getUserInfo,
//   findADate,
// } from "../features/post/postActions";
// import { getLiked } from "../features/liked/likedSlice";

// function FindadatePage() {
//   const { user, token, id } = useSelector((state) => state.user);
//   const { loading, liked } = useSelector((state) => state.liked);
//   const [currentIndex, setCurrentIndex] = useState(null);
//   const [date, setDate] = useState([]);
//   const [user1, setUser1] = useState([]);
//   const [likedUser, setLikedUser] = useState([]);
//   const dispatch = useDispatch();

//   const currentIndexRef = useRef(currentIndex);
//   const childRefs = useMemo(
//     () =>
//       Array(user1.length)
//         .fill(0)
//         .map(() => React.createRef()),
//     [user1]
//   );

//   const updateCurrentIndex = useCallback((val) => {
//     setCurrentIndex(val);
//     currentIndexRef.current = val;
//   }, []);

//   const canSwipe = currentIndex !== null && currentIndex >= 0;

//   const getlikedUser = useCallback(async (token, id) => {
//     const res = await getUserInfo(token, id);
//     return res;
//   }, []);

//   const swiped = async (direction, nameToDelete, index) => {
//     if (direction === "right") {
//       try {
//         const { data } = await findADate(token, user1[index]._id);
//         await getlikedUser(token, user1[index]._id);
//       } catch (error) {
//         console.error("Error finding a date:", error);
//       }
//     }
//     updateCurrentIndex(index - 1);
//   };

//   const swipe = useCallback(
//     async (dir) => {
//       if (canSwipe) {
//         await childRefs[currentIndex].current.swipe(dir);
//       }
//     },
//     [canSwipe, currentIndex, childRefs]
//   );

//   const getSuggestions = useCallback(async () => {
//     try {
//       const res = await getDateSuggestions(token, id);
//       setDate(res);
//       setCurrentIndex(res.length - 1);
//     } catch (error) {
//       console.error("Error in getSuggestions:", error);
//     }
//   }, [token, id]);

//   const getUser = useCallback(async (token, id) => {
//     const res = await getUserInfo(token, id);
//     setUser1((prevUser1) => [...prevUser1, res]);
//   }, []);

//   useEffect(() => {
//     if (liked && !loading) dispatch(getLiked({ token, userid: id }));
//   }, [liked, loading, dispatch, token, id]);

//   useEffect(() => {
//     getSuggestions();
//     dispatch(getLiked({ token, userid: id }));
//   }, [getSuggestions, dispatch, token, id]);

//   useEffect(() => {
//     if (date) {
//       date.forEach(async (item) => {
//         await getUser(token, item._id);
//       });
//     }
//   }, [date, token, getUser]);

//   useEffect(() => {
//     if (!loading && liked) {
//       const promises = liked?.map(async (item) => {
//         return await getUserInfo(token, item);
//       });

//       Promise.all(promises)
//         .then((allLikedUsers) => {
//           setLikedUser(allLikedUsers);
//         })
//         .catch((error) => {
//           console.error("Error fetching liked users:", error);
//         });
//     }
//   }, [liked, loading, token]);

//   return (
//     <div>
//       <div className="w-full flex-col pb-0 lg:px-20 sm:px-0 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
//         <div className="flex flex-row justify-center">
//           <TopBar />
//         </div>
//         <div className=" sm:w-full py-8 h-full flex flex-col gap-6 overflow-y-auto rounded ">
//           <div className="flex flex-row justify-between   ">
//             <div className="flex flex-col ">
//               <div className="cardContainer flex justify-center rounded-3xl ">
//                 {user1?.map((_id, index) => (
//                   <div
//                     key={index}
//                     style={{
//                       display: index === currentIndex ? "block" : "none",
//                       // backgroundImage: `url(${_id.image})`
//                     }}
//                   >
//                     <TinderCard
//                       ref={childRefs[index]}
//                       className="swipe"
//                       onSwipe={(dir) => swiped(dir, _id.name, index)}
//                     >
//                       <div
//                         className="card border bg-gray-100 px-5 py-5 rounded-3xl shadow-lg"
//                         key={index}
//                       >
//                         <img
//                           src={_id?.image}
//                           alt="banner"
//                           className="object-cover h-96 w-full rounded-3xl"
//                           style={{ maxHeight: "400px" }}
//                         />
//                         <h3 className="flex flex-row justify-center font-bold py-5">
//                           {_id?.name}
//                         </h3>
//                         <h3 className="flex flex-row justify-center font-bold py-2">
//                           Age: {_id?.age}
//                         </h3>
//                       </div>
//                     </TinderCard>
//                   </div>
//                 ))}
//               </div>
//               <div className="buttons my-5 flex justify-center">
//                 <button
//                   style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
//                   onClick={() => swipe("left")}
//                   className="rounded-full border px-5 py-5  hover:bg-rose-200 mx-5"
//                   disabled={!canSwipe}
//                 >
//                   <ImCross className="w-10 h-10 text-red-600" />
//                 </button>
//                 <button
//                   style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
//                   onClick={() => swipe("right")}
//                   className="rounded-full border px-5 py-5  hover:bg-green-200 mx-5"
//                   disabled={!canSwipe}
//                 >
//                   <FaHeart className="w-10 h-10 text-green-600" />
//                 </button>
//               </div>
//             </div>
//             <div className="hidden lg:w-1/3 sm:hidden h-full lg:flex flex-col gap-8 overflow-y-auto">
//               <div className="w-full bg-primary rounded-lg px-6 py-5 shadow-lg ">
//                 <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
//                   <span>Liked</span>
//                   <span>{likedUser.length}</span>
//                 </div>
//                 <div className="w-full flex flex-col gap-4 pt-4 ">
//                   {likedUser.map((item) => (
//                     <div
//                       key={item._id}
//                       className="flex items-center justify-between"
//                     >
//                       <Link
//                         to={"/profile/" + item._id}
//                         className="w-full flex gap-4 items-center cursor-pointer"
//                       >
//                         <img
//                           src={item.image ?? NoProfile}
//                           alt={item.name}
//                           className="w-10 h-10 object-cover rounded-full"
//                         />
//                         <div className="flex-1">
//                           <p className="text-base font-medium text-ascent-1">
//                             {item.name}
//                           </p>
//                           <span className="text-sm text-ascent-2">
//                             {item.profession ?? "No Profession"}
//                           </span>
//                         </div>
//                       </Link>
//                       <div className="flex gap-1"></div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FindadatePage;
