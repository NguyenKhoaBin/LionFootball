import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseApp/firebaseConfig";

const SearchPost = ({ search }) => {
  const [post, setPost] = useState();
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newRef = query(
        colRef,
        where("title", ">=", search),
        where("title", "<=", search + "utf8")
      );
      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPost(results);
      });
    }
    fetchData();
  }, [search]);
  const navigate = useNavigate();
  return (
    <div
      className={`absolute h-100% w-[500px] bg-[#ccc] top-[105%]
      translate-x-[50%] right-[50%] ${search === "" && "opacity-0"}
      rounded-lg p-5 transition-all
      `}
    >
      {search !== "" &&
        post.map((item) => (
          <div
            className="rounded-lg cursor-pointer p-2 bg-gray300 flex gap-3 items-center justify-evenly"
            key={item.id}
            onClick={() => navigate("/" + item.slug)}
          >
            <img
              src={item.image}
              className="object-cover mr-auto h-[50px] w-[50px] rounded-full z-50"
              alt=""
            />
            <p className="font-[500] flex-1 text-[18px]">{item?.title}</p>
          </div>
        ))}
      {search !== "" && post?.length === 0 && <p>No result</p>}
    </div>
  );
};

export default SearchPost;
