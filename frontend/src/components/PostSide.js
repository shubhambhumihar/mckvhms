import React from "react";
import Posts from "./Posts";
import PostShare from "./PostShare";

const PostSide = () => {
  return (
    <div className="flex flex-col gap-1 h-full overflow-auto">
      <div className="position-sticky  top-100 left-50 black-gradient rounded-xl">
        <PostShare />
      </div>

      <Posts />
    </div>
  );
};

export default PostSide;
