import React from "react";
import PostCategory from "./customPost/PostCategory";
import PostImage from "./customPost/PostImage";
import PostMeta from "./customPost/PostMeta";
import PostTitle from "./customPost/PostTitle";

const PostNewestItem = (data) => {
  const time = new Date(
    data?.data?.createdAt?.seconds * 1000
  ).toLocaleDateString("vi-VI");
  return (
    <div className="post-image flex items-center gap-5 mb-[28px] pb-[28px] border-b border-solid border-[#ccc] last:pb-0 last:mb-0 last:border-b-0">
      <div className="block flex-shrink-0 w-[180px] h-[130px]">
        <PostImage url={data?.data?.image} alt="unplash"></PostImage>
      </div>
      <div className="post-content">
        <PostCategory className=" inline-block mb-2 ">
          {data?.data?.category.name}
        </PostCategory>
        <PostTitle to={data?.data?.slug} classname="mb-2 text-[18px]">
          {data?.data?.title}
        </PostTitle>
        <PostMeta
          authorName={data?.data?.user.userName}
          time={time}
          className="text-[#6b6b6b]"
        ></PostMeta>
      </div>
    </div>
  );
};

export default PostNewestItem;
