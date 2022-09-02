import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../../firebaseApp/firebaseConfig";
import { ActionDelete, ActionEdit } from "../action";
import Table from "../table/Table";

const UserTable = () => {
  const [userList, setUserList] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const colref = collection(db, "users");
    onSnapshot(colref, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) =>
        results.push({
          id: doc.id,
          ...doc.data(),
        })
      );
      setUserList(results);
    });
  }, []);
  const handleDeleteUser = (user) => {
    const docRef = doc(db, "users", user.id);
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
  const renderStatusUser = (userStatus) => {
    let status = Number(userStatus);
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
  const renderRole = (userRole) => {
    let role = Number(userRole);
    switch (role) {
      case 1:
        role = "Admin";
        break;
      case 2:
        role = "Mod";
        break;
      case 3:
        role = "User";
        break;
      default:
        break;
    }
    return role;
  };
  const renderUserItem = (user) => (
    <tr key={user.id}>
      <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
      <td className="whitespace-nowrap">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt="userImage"
            className="flex-shrink-0 object-cover h-10 w-10 rounded-md"
          />
          <div className="flex-1">
            <h3>{user?.fullname}</h3>
            <time className="text-sm text-gray500">
              {new Date().toLocaleDateString()}
            </time>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap">{user?.userName}</td>
      <td title={user?.email}>{user?.email.slice(0, 6) + "...@gmail.com"}</td>
      <td>{renderStatusUser(user.status)}</td>
      <td>{renderRole(user.role)}</td>
      <td>
        <div className="flex gap-5 text-gray-400">
          <ActionEdit
            onClick={() => navigate("/manage/user-update?id=" + user.id)}
          ></ActionEdit>
          <ActionDelete onClick={() => handleDeleteUser(user)}></ActionDelete>
        </div>
      </td>
    </tr>
  );
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 && userList.map((user) => renderUserItem(user))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
