import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../../../firebaseApp/firebaseConfig";
import { ActionDelete, ActionEdit, ActionView } from "../../action";
import Button from "../../button/Button";
import DashboardHeading from "../../dashboard/DashboardHeading";
import Table from "../../table/Table";
const POST_PER_PAGE = 3;
const PostManage = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState();
  const navigate = useNavigate();
  const handleLoadMorePost = async () => {
    const nextRef = query(
      collection(db, "posts"),
      startAfter(lastDoc || 0),
      limit(POST_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts([...posts, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  const handleSearchPost = debounce((e) => {
    setSearch(e.target.value);
  }, 500);
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newRef = search
        ? query(
            colRef,
            where("title", ">=", search),
            where("title", "<=", search + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [search]);
  const convertDate = (date) => {
    const newDate = new Date(date.seconds * 1000).toLocaleDateString("vi-VI");
    return newDate;
  };
  const handleDeletePost = (postId) => {
    const docRef = doc(db, "posts", postId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    });
  };
  const renderStatus = (postStatus) => {
    let status = Number(postStatus);
    switch (status) {
      case 1:
        status = "Active";
        break;
      case 2:
        status = "Pending";
        break;
      case 3:
        status = "Banned";
        break;
      default:
        break;
    }
    return status;
  };
  useEffect(() => {
    document.title = "Manage Post";
  });
  return (
    <div>
      {/* <h1 className="font-bold text-[28px] mb-[40px] text-[#000] ">
        Manage post
      </h1>
      <p>Manage your posts</p> */}
      <div className="mb-10 flex justify-between">
        <DashboardHeading
          title="Manage Post"
          desc="Manage your posts"
        ></DashboardHeading>
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            onChange={(e) => handleSearchPost(e)}
            className="w-full p-4 rounded-lg border border-solid border-gray300"
            placeholder="Search post..."
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 &&
            posts.map((post) => (
              <tr key={post.id}>
                <td title={post.id}>{post?.id.slice(0, 5) + "..."}</td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <img
                      src={post.image}
                      alt=""
                      className="w-[66px] h-[55px] rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{post?.title}</h3>
                      <time className="text-sm text-gray500">
                        {convertDate(post?.createdAt)}
                      </time>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-gray500">{post?.category.name}</span>
                </td>
                <td>
                  <span className="text-gray500">{post?.user.userName}</span>
                </td>
                <td>{renderStatus(post?.status)}</td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray500">
                    <NavLink to={"/" + post.slug}>
                      <ActionView></ActionView>
                    </NavLink>

                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/post-update?id=${post.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeletePost(post.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > posts.length && (
        <Button
          type="button"
          className="my-5 w-full text-[#fff] font-bold text-[18px] bg-gradient-to-br from-[#00A7B4] to-[#A4D96C] p-[15px] rounded-lg hover:cursor-pointer
          disabled:opacity-[0.5] max-w-[200px] block mx-auto"
          onClick={handleLoadMorePost}
        >
          Loadmore
        </Button>
      )}
    </div>
  );
};

export default PostManage;
