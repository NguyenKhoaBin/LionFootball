import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
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

    const fetchNew = async () => {
      const q = await query(
        colref,
        limit(4),
        // where("status", "==", 1),
        orderBy("createdAt")
      );
      onSnapshot(q, async (snapShot) => {
        const resultPostNewset = [];
        await snapShot.forEach((doc) => {
          resultPostNewset.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostNewest(resultPostNewset);
        console.log(postNewest);
      });
    };
    fetchNew();
    const fetchTranfer = async () => {
      const qTranfer = await query(
        colref,

        where("status", "==", 1)
      );
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
    };
    fetchTranfer();
  }, []);
  console.log(postNewest);
  let postNewestClone = postNewest?.slice(
    postNewest.length - 4,
    postNewest.length - 1
  );
  postNewestClone = postNewestClone.reverse();
  if (postTranfer.length <= 0) return null;
  console.log(postNewestClone);
  return (
    <div className="home-block">
      <div className="main">
        <Heading>Mới nhất</Heading>
        <div className="grid items-start grid-cols-2 gap-10 mb-10 layout">
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
        <div className="p-5 grid-layout grid-layout--primary">
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
