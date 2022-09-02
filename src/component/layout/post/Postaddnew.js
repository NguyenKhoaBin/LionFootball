import React from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "react-toastify";
import Field from "../../field/Field";
import Input from "../../input/Input";
import Label from "../../label/Label";
import Radio from "../../checkbox/Radio";
import ImageUpload from "../../images/ImageUpload";
import useFirebaseImage from "../../../hooks/useFireBaseImage";
import Toggle from "../../toggle/Toggle";
import { useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../../firebaseApp/firebaseConfig";
import { useState } from "react";
import { Dropdown } from "../../../dropdown";
import { useAuth } from "../../../contexts/auth-context";
import Button from "../../button/Button";
import * as yup from "yup";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import { useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
Quill.register("modules/imageUploader", ImageUploader);

const Postaddnew = () => {
  const schema = yup.object({
    title: yup.string().required("Please enter field title"),
    slug: yup.string().required("Please enter field slug"),
  });
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    getValues,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      status: "2",
      Hot: false,
      title: "",
      slug: "",
      image: "",
      category: {},
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);
  const {
    image,
    setImage,
    progress,
    setProgress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);
  const [category, setCategory] = useState([]);
  const { userInfo } = useAuth();
  const [content, setContent] = useState(" ");
  const watchStatus = watch("status");
  const watchHot = watch("Hot");
  const [selectCategory, setSelectCategory] = useState({});
  useEffect(() => {
    if (!userInfo?.email) return;
    async function fetchUserData() {
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo?.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchUserData();
  });
  const addPostHandler = async (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title, { lower: true });
    cloneValues.status = Number(values.status);
    const colref = collection(db, "posts");
    await addDoc(colref, {
      ...cloneValues,
      image,
      content,
      createdAt: serverTimestamp(),
    });
    reset({
      status: "2",
      Hot: false,
      title: "",
      slug: "",
      image: "",
    });
    setImage("");
    setProgress(0);
    setSelectCategory({});
    toast.success("Create new post succesfully!");
  };
  useEffect(() => {
    async function getData() {
      const colref = collection(db, "categories");
      const q = query(colref, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategory(result);
    }
    getData();
  }, []);
  const handleClickOption = async (item) => {
    const docRef = doc(db, "categories", item.id);
    const docData = await getDoc(docRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  };
  useEffect(() => {
    document.title = "Add new post";
  }, []);

  const module = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
    }),
    []
  );

  return (
    <div>
      <h1 className="p-5 text-[#647c7b] text-[28px] font-bold">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-x-10 mb-10">
            <Field>
              <Label className="font-bold">Title</Label>
              <Input
                control={control}
                placeholder="Enter your title"
                name="title"
                className={`w-full mt-5 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
            focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4] `}
              ></Input>
            </Field>
            <Field>
              <Label className="font-bold">Slug</Label>
              <Input
                control={control}
                placeholder="Enter your slug"
                name="slug"
                className={`w-full mt-5 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
            focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4] `}
              ></Input>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-x-10 mb-10">
            <Field>
              <Label className="font-bold block mb-5">Image</Label>
              <ImageUpload
                name="image"
                image={image}
                progress={progress}
                onChange={handleSelectImage}
                handleDeleteImage={handleDeleteImage}
              ></ImageUpload>
            </Field>
            <Field>
              <Label className="font-bold">Category</Label>
              <div className="mt-5">
                <Dropdown>
                  <Dropdown.Select
                    placeholder={selectCategory?.name || "Select the category"}
                  ></Dropdown.Select>
                  <Dropdown.List>
                    {category.length > 0 &&
                      category.map((item) => (
                        <Dropdown.Option
                          key={item.id}
                          onClick={() => handleClickOption(item)}
                        >
                          {item.name}
                        </Dropdown.Option>
                      ))}
                  </Dropdown.List>
                </Dropdown>
              </div>
            </Field>
          </div>
          <div className="content w-full mb-10">
            <Field>
              <label className="font-bold block mb-5">Content</label>
              <div className="w-full">
                <ReactQuill
                  modules={module}
                  className="entry-content"
                  value={content}
                  onChange={setContent}
                />
              </div>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-x-10 mb-10">
            <Field>
              <Label className="font-bold">Feature post</Label>
              <div className="mt-5">
                <Toggle
                  on={watchHot}
                  onClick={() => setValue("Hot", !watchHot)}
                ></Toggle>
              </div>
            </Field>
            <Field>
              <Label className="font-bold">Status</Label>
              <div className="flex items-center gap-x-5 mt-5">
                <Radio
                  name="status"
                  control={control}
                  checked={watchStatus === "1"}
                  onClick={() => setValue("status", "1")}
                  value="1"
                >
                  Approved
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={watchStatus === "2"}
                  onClick={() => setValue("status", "2")}
                  value="2"
                >
                  Pending
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={watchStatus === "3"}
                  onClick={() => setValue("status", "3")}
                  value="3"
                >
                  Reject
                </Radio>
              </div>
            </Field>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button
            disabled={isSubmitting}
            isLoading={isSubmitting}
            type="submit"
            className="w-full text-[#fff] font-bold text-[18px] bg-gradient-to-br from-[#00A7B4] to-[#A4D96C] p-[15px] rounded-lg hover:cursor-pointer
              disabled:opacity-[0.5] max-w-[300px]"
          >
            Add now post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Postaddnew;
