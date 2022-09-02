import React from "react";
import PostCategory from "./customPost/PostCategory";
import PostImage from "./customPost/PostImage";
import PostMeta from "./customPost/PostMeta";
import PostTitle from "./customPost/PostTitle";

const PostNewestLarge = (data) => {
  const time = new Date(
    data?.data?.createdAt?.seconds * 1000
  ).toLocaleDateString("vi-VI");
  return (
    <div>
      <div className="post-image block mb-4 h-[433px] ">
        <PostImage
          to={data?.data?.slug}
          url={data?.data?.image}
          alt="unplash"
        ></PostImage>
      </div>
      <PostCategory className="inline-block mb-4 bg-[#f3edff]">
        {data?.data?.category.name}
      </PostCategory>
      <PostTitle classname="mb-2 text-[18px]" to={data?.data?.slug}>
        {data?.data?.title}
      </PostTitle>
      <PostMeta
        className="text-[#6b6b6b]"
        authorName={data?.data?.user.userName}
        time={time}
      ></PostMeta>
    </div>
  );
};

export default PostNewestLarge;
