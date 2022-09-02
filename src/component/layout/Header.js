import { signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { debounce } from "lodash";
import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { auth, db } from "../../firebaseApp/firebaseConfig";
import SearchPost from "../../search/SearchPost";
import Button from "../button/Button";

const Header = () => {
  const [role, setRole] = useState();
  const [userName, setUserName] = useState();
  const [search, setSearch] = useState("");

  const menuLinks = [
    { url: "/", title: "Home" },
    { url: "/userprofile", title: "Profile" },
    { url: "/contact", title: "Contact" },
  ];
  const { userInfo } = useAuth();
  const userEmail = userInfo?.email || null;
  useEffect(() => {
    async function fetch() {
      const q = query(collection(db, "users"), where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setRole(doc.data().role);
        setUserName(doc.data().userName);
      });
    }
    fetch();
  }, [userEmail]);

  const handleSearchPost = debounce((e) => {
    setSearch(e.target.value);
  }, 1000);
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <div className="px-[89.6px] py-[15px] sticky z-50 top-0 bg-[#fff]">
      <div className="header flex items-center ">
        <NavLink to="/">
          <img
            src="football_tran.png"
            alt="Lion Football Blogs"
            className="block w-[75px] rounded-full"
          />
        </NavLink>
        <ul className="menu flex items-center gap-[20px] ml-[60px]">
          {menuLinks.map((item) => (
            <li key={item.title} className="text-[18px] font-[500]">
              <NavLink to={item.url}> {item.title}</NavLink>
            </li>
          ))}
        </ul>
        {(role === 1 || role === 2) && (
          <ul className="menu flex items-center ml-[20px]">
            <li className="text-[18px] font-[500]">
              {" "}
              <NavLink to={"/manage/post"}>Dashboard</NavLink>
            </li>
          </ul>
        )}
        <div
          className="search ml-auto p-[12px] border border-[#eee] rounded-lg
        w-full max-w-[320px] flex items-center relative"
        >
          <input
            type="text"
            name="search"
            id="search"
            onChange={handleSearchPost}
            className="flex-1 pr-[15px] outline-none font-[500]"
            placeholder="Search posts..."
          />
          <span className="cursor-pointer ">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="7.66669"
                cy="7.05161"
                rx="6.66669"
                ry="6.05161"
                stroke="#999999"
                strokeWidth="1.5"
              />
              <path
                d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <SearchPost search={search}></SearchPost>
        </div>
        {!userInfo ? (
          <Button
            type="button"
            to="/sign-up"
            className="bg-gradient-to-br from-[#00A7B4] to-[#A4D96C] px-7 py-3 rounded-lg ml-[25px] text-[#fff] text-[16px]"
          >
            Sign Up
          </Button>
        ) : (
          <div className="px-4 flex">
            <p>
              Welcome back{" "}
              <span className="text-primary font-[500]">{userName || " "}</span>
            </p>
          </div>
        )}
        {userInfo?.email && (
          <div
            className="text-[#808191] p-2 flex  items-center gap-1 cursor-pointer hover:opacity-[0.4]
        "
            onClick={handleSignOut}
          >
            <span className="menu-text">Log out</span>
            <span className="menu-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
