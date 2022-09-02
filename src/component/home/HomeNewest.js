import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseApp/firebaseConfig";
import Heading from "../heading/Heading";
import PostItem from "../layout/post/PostItem";
import PostNewestItem from "../layout/post/PostNewestItem";
import PostNewestLarge from "../layout/post/PostNewestLarge";
const HomeNewest = () => {
  const [postTranfer, setPostTranfer] = useState([]);
  const [postNewest, setPostNewest] = useState([]);
  useEffect(() => {
    const colref = collection(db, "posts");
    const q = query(colref, where("status", "==", 1));
    const qTranfer = query(colref, where("status", "==", 1));
    onSnapshot(q, (snapShot) => {
      const resultPostNewset = [];
      snapShot.forEach((doc) => {
        resultPostNewset.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostNewest(resultPostNewset);
    });
    onSnapshot(qTranfer, (snapShot) => {
      const resultPostTranfer = [];
      snapShot.forEach((doc) => {
        if (doc.data().category.name === "Tranfer") {
          resultPostTranfer.push({
            id: doc.id,
            ...doc.data(),
          });
        }
      });

      setPostTranfer(resultPostTranfer);
    });
  }, []);
  const postNewestClone = postNewest.slice(
    postNewest.length - 5,
    postNewest.length - 2
  );
  if (postTranfer.length <= 0) return null;
  return (
    <div className="home-block">
      <div className="main">
        <Heading>Mới nhất</Heading>
        <div className="layout grid grid-cols-2 gap-10 mb-10 items-start">
          <PostNewestLarge
            data={postNewest[postNewest.length - 1]}
          ></PostNewestLarge>
          <div className="px-[28px] h-full flex flex-col py-[20px] justify-around bg-[#f3edff] rounded-2xl">
            {postNewestClone.length > 0 &&
              postNewestClone.map((item) => (
                <PostNewestItem key={item.id} data={item}></PostNewestItem>
              ))}
          </div>
        </div>
        <Heading>Tin chuyển nhượng</Heading>
        <div className="grid-layout grid-layout--primary">
          {postTranfer.length > 0 &&
            postTranfer?.map((item) => (
              <PostItem
                url={item.image}
                title={item.title}
                userName={item.user.userName}
                category={item.category.name}
                slug={item.slug}
                key={item.id}
                time={item.createdAt}
              ></PostItem>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeNewest;
