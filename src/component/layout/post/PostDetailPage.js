import React from "react";
import { useParams } from "react-router-dom";
import Page404 from "../../../pages/Page404";
import Heading from "../../heading/Heading";
import Layout from "../Layout";
import PostCategory from "./customPost/PostCategory";
import PostImage from "./customPost/PostImage";
import PostMeta from "./customPost/PostMeta";
import PostItem from "./PostItem";
import parse from "html-react-parser";
import { useState } from "react";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebaseApp/firebaseConfig";
import CommentDetailPage from "../../comment/CommentDetailPage";
import HomePage from "../../../pages/HomePage";

const PostDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState();
  const [postSame, setPostSame] = useState();
  const categoryId = post?.category.id;
  useEffect(() => {
    if (!slug) return;
    async function fetchData() {
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      await onSnapshot(colRef, (docSnap) => {
        docSnap.forEach((doc) => {
          setPost(doc.data());
        });
      });
    }
    fetchData();
  }, [slug]);
  const date = new Date(post?.createdAt?.seconds * 1000).toLocaleDateString(
    "vi-VI"
  );
  useEffect(() => {
    async function getData() {
      const colRef = query(collection(db, "posts"), where("status", "==", 1));
      await onSnapshot(colRef, (docSnap) => {
        let result = [];
        docSnap.forEach((doc) => {
          if (doc.data().category.id === categoryId) {
            result.push({
              id: doc.id,
              ...doc.data(),
            });
          }

          setPostSame(result);
        });
      });
    }
    getData();
  }, [categoryId]);

  if (!slug) return <Page404></Page404>;
  if (typeof post?.title === "undefined") return <HomePage></HomePage>;
  return (
    <Layout>
      <div className="main mb-[100px]">
        <div className="post-header flex items-center justify-between gap-[40px] my-10 ">
          <PostImage
            url={post?.image}
            className="post-feature w-full max-w-[640px] h-[466px] rounded-[20px]"
          ></PostImage>
          <div className="flex-1 post-info">
            <PostCategory className="mb-6 bg-[#F3EDFF] inline-block">
              {post?.category.name}
            </PostCategory>
            <h1 className="post-heading font-bold mb-4 text-[36px]">
              {post?.title}
            </h1>
            <PostMeta
              authorName={post?.user.userName}
              time={date}
              className="text-[#6b6b6b] text-[18px]"
            ></PostMeta>
          </div>
        </div>
        <div className="post-content max-w-[800px] mx-auto my-auto">
          <div className="entry-content">{parse(post?.content || "")}</div>
          <div className="author my-10 flex rounded-[20px] bg-[#F3EDFF]">
            <div className="author-image w-[200px] h-[200px] rounded-2xl shrink-0">
              <img
                src={post?.user.avatar}
                alt="user avatar"
                className="object-cover w-full h-full rounded-2xl"
              />
            </div>
            <div className="flex-1 p-5 author-content">
              <h3 className="author-name font-bold mb-5 text-[20px]">
                {post?.user.fullname}
              </h3>
              <p className="author-desc text-[14px] leading-8">
                {post?.user?.desc || <span>No information</span>}
              </p>
            </div>
          </div>
          <CommentDetailPage slug={slug}></CommentDetailPage>
        </div>
        <div className="post-related">
          <Heading>Bài viết liên quan</Heading>
          <div className="grid-layout grid-layout--primary">
            {postSame?.length > 0 &&
              postSame.map((item) => (
                <PostItem
                  key={item.id}
                  url={item.image}
                  title={item.title}
                  userName={item.user.userName}
                  category={item.category.name}
                  slug={`/${item.slug}`}
                  time={item.createdAt}
                ></PostItem>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostDetailPage;
