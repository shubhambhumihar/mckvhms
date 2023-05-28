// export default Posts;
import React, { useEffect } from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../features/post/postSlice";

const Posts = () => {
  // const [postsData, setPostsData] = useState([]);
  const dispatch = useDispatch();

  const getPosts = () => {
    dispatch(getAllPosts());
  };

  useEffect(() => {
    getPosts();
  }, []);

  const { isLoading, posts } = useSelector((state) => state.post);

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <div className="flex justify-center pt-5 mt-7">
          <div class="loader">
            <span class="loader-text">loading</span>
            <span class="load"></span>
          </div>
        </div>
      ) : (
        posts?.posts?.map((post, id) => <Post data={post} key={id} />)
      )}
    </div>
  );
};

export default Posts;
