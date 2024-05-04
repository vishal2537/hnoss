import React, { useEffect,useState } from "react";
import { fetchUserPosts } from "../features/post/postActions";
import { useSelector } from "react-redux";

const Postgrid = ({id}) => {
  const { token } = useSelector((state) => state.user);
  const [post, setPost] = useState(null);
  
  const getUserPost = async () => {
    const res = await fetchUserPosts(token, id);
    setPost(res);
  }
  useEffect(() => {
    getUserPost();  
  }, [id]);


  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {post?.map((item) => (
          <div key={item._id}>
            <img
              className="h-auto max-w-full rounded-lg"
              src={item?.image}
              alt={item?.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Postgrid;
