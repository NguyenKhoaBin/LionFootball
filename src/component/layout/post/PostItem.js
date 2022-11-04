import React from "react";
import PostCategory from "./customPost/PostCategory";
import PostImage from "./customPost/PostImage";
import PostMeta from "./customPost/PostMeta";
import PostTitle from "./customPost/PostTitle";

const PostItem = ({
  title = "",
  slug = "/",
  userName = "",
  url = "",
  time = "",
  category = "",
  className = "",
}) => {
  const date = new Date(time?.seconds * 1000).toLocaleDateString("vi-VI");
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div className="post-image h-[202px] mb-5 block w-full">
        <PostImage url={url} to={slug} alt="unplash"></PostImage>
      </div>
      <PostCategory className="mb-4 bg-[#f3edff]">{category}</PostCategory>
      <PostTitle classname="mb-2 text-[18px]" to={slug}>
        {title}
      </PostTitle>
      <PostMeta
        time={date}
        className="text-[#6b6b6b] mt-auto"
        authorName={userName}
      ></PostMeta>
    </div>
  );
};

export default PostItem;
