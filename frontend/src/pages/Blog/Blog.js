import React, { useEffect } from "react";
import PostSide from "../../components/PostSide";

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="blog  mb-40">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

      <div className="grid lg:grid-cols-4 gap-3">
        <div className="logoSide">
          <h1>Maintain The rule and regulatioiuiuiuhihbhb huihiuihihuhn</h1>
        </div>
        <div className="postSide col-span-2">
          <PostSide />
        </div>
        <div className="showSide">show</div>
      </div>
    </div>
  );
};

export default Blog;
