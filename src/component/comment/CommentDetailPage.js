import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/auth-context";
import { db } from "../../firebaseApp/firebaseConfig";
import Button from "../button/Button";
import TextArea from "../input/TextArea";

const CommentDetailPage = (slug) => {
  const { userInfo } = useAuth();
  const [comments, setComments] = useState();
  const [currUser, setCurrUser] = useState({});
  const [show, setShow] = useState(true);
  const [clickReply, setClickReply] = useState("");
  const [openReply, setOpenReply] = useState(false);
  const [reply, setReply] = useState("");
  const [listReply, setListReply] = useState();

  const userEmailCurr = userInfo?.email;
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      comment: "",
    },
  });
  useEffect(() => {
    async function fetch() {
      const q = query(
        collection(db, "users"),
        where("email", "==", userEmailCurr)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
        setCurrUser({
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetch();
  }, [setValue, userEmailCurr]);

  const handleSubmitComment = (values) => {
    const cloneValues = { ...values };
    if (!isValid) return;
    async function fetchData() {
      const colref = collection(db, "comments");
      try {
        await addDoc(colref, {
          ...cloneValues,
          slug,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      } finally {
        reset({
          comment: "",
        });
      }
    }
    fetchData();
  };

  useEffect(() => {
    async function fetch() {
      const colref = query(
        collection(db, "comments"),
        where("slug", "==", slug)
      );
      await onSnapshot(colref, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setComments(result);
      });
    }
    fetch();
  }, [slug]);

  useEffect(() => {
    async function fetch() {
      const colref = collection(db, "replys");
      await onSnapshot(colref, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setListReply(result);
      });
    }
    fetch();
  }, []);
  // console.log(listReply);
  const handleReply = (id) => {
    setClickReply(id);
    console.log(id);
    setOpenReply(!openReply);
    console.log(openReply);
  };

  const handleSubmitReply = () => {
    async function fetchData() {
      const colref = collection(db, "replys");
      try {
        await addDoc(colref, {
          idParent: clickReply,
          reply,
          user: currUser,
          createdAt: serverTimestamp(),
        });
        setReply("");
        setOpenReply(false);
      } catch (error) {
        console.log(error);
      } finally {
        reset({
          comment: "",
        });
      }
    }
    fetchData();
  };
  const handleValueReply = debounce((e) => {
    setReply(e.target.value);
  }, 500);
  if (!userEmailCurr) return null;
  return (
    <div>
      <div className="flex gap-2 items-center">
        <p className="text-[#000] text-[20px] font-[600]">Nhận xét</p>
        <span onClick={() => setShow(!show)} className="cursor-pointer">
          {!show ? (
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
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </span>
      </div>

      {show &&
        comments?.length > 0 &&
        comments?.map((item, index) => (
          <div className="my-5" key={index}>
            <div className="flex  items-center gap-3">
              <img
                src={item?.user?.avatar || ""}
                className="w-[50px] h-[50px] object-cover
            rounded-full"
                alt=""
              />
              <div className="flex-1">
                <div className=" flex gap-3">
                  <p className="font-[500]">{item?.user?.userName || "Null"}</p>
                  <p className="text-[#ccc]">
                    {new Date(
                      item?.createdAt?.seconds * 1000
                    ).toLocaleDateString("vi-VI")}
                  </p>
                </div>
                <p>{item.comment}</p>
              </div>
            </div>
            <div className="pl-[60px]">
              <span
                onClick={() => handleReply(item.id)}
                className="text-[#ccc] cursor-pointer hover:text-gray500 transition-all"
              >
                Reply
              </span>
            </div>
            {/* ------- */}
            {listReply?.length > 0 &&
              listReply.map((reply, index) => (
                <div key={index} className="mb-5">
                  {reply.idParent === item.id && (
                    <div className="ml-[100px]">
                      <div className="flex  items-center gap-3">
                        <img
                          src={reply?.user?.avatar || ""}
                          className="w-[50px] h-[50px] object-cover rounded-full"
                          alt=""
                        />
                        <div className="flex-1">
                          <div className=" flex gap-3">
                            <p className="font-[500]">
                              {reply?.user?.userName || "Null"}
                            </p>
                            <p className="text-[#ccc]">
                              {new Date(
                                reply?.createdAt?.seconds * 1000
                              ).toLocaleDateString("vi-VI")}
                            </p>
                          </div>
                          <p>{reply?.reply}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

            {/* ----------------reply---------- */}
            {clickReply === item.id && openReply && (
              <div className="">
                <input
                  name="reply"
                  onChange={(e) => handleValueReply(e)}
                  placeholder="Enter your reply"
                  className="w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none resize-none
           focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4]"
                ></input>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    className="w-full my-3  font-bold text-gray500 bg-gray200 px-5 py-3 rounded-lg hover:cursor-pointer hover:text-opacity-[0.6]
              disabled:opacity-[0.5] max-w-[100px] right-0   select-none  "
                    onClick={handleSubmitReply}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            )}
            {/* --------------------- */}
          </div>
        ))}
      <form onSubmit={handleSubmit(handleSubmitComment)}>
        <TextArea
          name="comment"
          cols="10"
          rows="5"
          control={control}
          placeholder="Enter your comment"
          className="w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none resize-none
           focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4]"
        ></TextArea>
        <div className="flex justify-end">
          <Button
            type="submit"
            kind="primary"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className="w-full my-3  font-bold text-gray500 bg-gray200 px-5 py-3 rounded-lg hover:cursor-pointer hover:text-opacity-[0.6]
              disabled:opacity-[0.5] max-w-[100px] right-0   select-none  "
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentDetailPage;
