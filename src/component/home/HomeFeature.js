import { db } from "../../firebaseApp/firebaseConfig";
import { useEffect } from "react";
import { useState } from "react";
import Heading from "../heading/Heading";
import React from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostFeatureItem from "../layout/post/PostFeatureItem";

const HomeFeature = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const colref = collection(db, "posts");
    const q = query(colref, where("status", "==", 1), where("Hot", "==", true));
    onSnapshot(q, (snapShot) => {
      const result = [];
      snapShot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPost(result);
    });
  }, []);
  const postRef = post.slice(post.length - 5, post.length - 1);
  if (post.length <= 0) return null;
  return (
    <div className="my-[60px] main">
      <Heading>Bài viết nổi bật</Heading>
      <div className="grid-layout">
        {postRef.map((item) => (
          <PostFeatureItem key={item.id} data={item}></PostFeatureItem>
        ))}
      </div>
    </div>
  );
};

export default HomeFeature;
