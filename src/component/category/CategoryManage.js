import React, { useEffect, useState } from "react";
import { ActionDelete, ActionEdit, ActionView } from "../action";
import LabelStatus from "../label/LabelStatus";
import Table from "../table/Table";
import { useNavigate } from "react-router-dom";
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
import { db } from "../../firebaseApp/firebaseConfig";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import DashboardHeading from "../dashboard/DashboardHeading";
import Button from "../button/Button";
const CATEGORY_PER_PAGE = 5;
const CategoryManage = () => {
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState();

  const handleLoadMoreCategory = async () => {
    const nextRef = query(
      collection(db, "categories"),
      startAfter(lastDoc || 0),
      limit(CATEGORY_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategory([...category, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "categories");
      const newRef = search
        ? query(
            colRef,
            where("name", ">=", search),
            where("name", "<=", search + "utf8")
          )
        : query(colRef, limit(CATEGORY_PER_PAGE));
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
        setCategory(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [search]);
  const navigate = useNavigate();
  const handleDeleteCategory = (docId) => {
    const docRef = doc(db, "categories", docId);
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
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const handleSearchCategory = debounce((e) => {
    setSearch(e.target.value);
  }, 500);
  return (
    <div>
      <div className="flex  justify-between">
        <DashboardHeading
          title="Categories"
          desc="Manage your category"
        ></DashboardHeading>
        <Button
          to={"/manage/add-category"}
          type="button"
          className="w-full mt-3 text-[#fff] font-bold text-[18px] bg-gradient-to-br from-[#00A7B4] to-[#A4D96C] p-[15px] rounded-lg hover:cursor-pointer
              disabled:opacity-[0.5] max-w-[300px]"
        >
          Add category
        </Button>
      </div>
      <div className="flex justify-end items-center">
        <input
          className="border border-[#ccc] rounded-md py-3 px-6 mb-8   outline-none"
          type="text"
          placeholder="Search category..."
          onChange={handleSearchCategory}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {category.length > 0 &&
            category.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <em className="text-gray500">{item.slug}</em>
                </td>
                <td>
                  <LabelStatus type={item.status === 1 ? "success" : "warning"}>
                    {item.status === 1 ? "Approved" : "Unapproved"}
                  </LabelStatus>
                </td>
                <td>
                  <div className="flex gap-5 text-gray-400">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate("/manage/category-update?id=" + item.id)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteCategory(item.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > category.length && (
        <Button
          type="button"
          className="my-5 w-full text-[#fff] font-bold text-[18px] bg-gradient-to-br from-[#00A7B4] to-[#A4D96C] p-[15px] rounded-lg hover:cursor-pointer
          disabled:opacity-[0.5] max-w-[200px] block mx-auto"
          onClick={handleLoadMoreCategory}
        >
          Loadmore
        </Button>
      )}
    </div>
  );
};

export default CategoryManage;
