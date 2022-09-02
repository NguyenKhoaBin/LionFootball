import PostCategory from "./customPost/PostCategory";
import PostImage from "./customPost/PostImage";
import PostMeta from "./customPost/PostMeta";
import PostTitle from "./customPost/PostTitle";
import React from "react";
import slugify from "slugify";

const PostFeatureItem = ({ data }) => {
  const date = new Date(data?.createdAt?.seconds * 1000).toLocaleDateString(
    "vi-VI"
  );
  if (!data || !data.id) return null;
  const { category, user } = data;
  return (
    <div className="relative h-[272px]">
      <PostImage to={data?.slug} url={data?.image} alt="post_img"></PostImage>
      <div className="overlay overlayFeatureItem"></div>
      <div className="post-content absolute inset-0 z-10 p-[20px] text-[#fff]">
        <div className="post-top top">
          {category && (
            <PostCategory to={data?.slug} className="bg-[#fff] ">
              {category.name}
            </PostCategory>
          )}
          <PostMeta
            time={date}
            to={slugify(user?.fullname || "", { lower: true })}
            authorName={user?.fullname}
          ></PostMeta>
        </div>
        <PostTitle to={data.slug} classname="text-[22px] mt-auto text-[#fff]">
          {data?.title}
        </PostTitle>
      </div>
    </div>
  );
};

export default PostFeatureItem;
