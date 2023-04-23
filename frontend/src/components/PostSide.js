import React from "react";
import Posts from "./Posts";
import PostShare from "./PostShare";

const PostSide = () => {
  return (
    <div className="flex flex-col gap-1 h-full overflow-auto">
      <PostShare />
      <Posts />
    </div>
  );
};

export default PostSide;
