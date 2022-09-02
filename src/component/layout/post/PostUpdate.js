import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Dropdown } from "../../../dropdown";
import { db } from "../../../firebaseApp/firebaseConfig";
import useFirebaseImage from "../../../hooks/useFireBaseImage";
import Field from "../../field/Field";
import ImageUpload from "../../images/ImageUpload";
import Input from "../../input/Input";
import Label from "../../label/Label";
import Radio from "../../checkbox/Radio";
import Toggle from "../../toggle/Toggle";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import { useMemo } from "react";
import Button from "../../button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
Quill.register("modules/imageUploader", ImageUploader);

const PostUpdate = () => {
  const [params] = useSearchParams();
  const postId = params.get("id");
  const schema = yup.object({
    title: yup.string().required("Please enter field title"),
    slug: yup.string().required("Please enter field slug"),
  });
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, errors, isSubmitting },
  } = useForm({
    mode: "onChange",
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
  const imageUrl = getValues("image");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const [content, setContent] = useState(" ");
  const [selectCategory, setSelectCategory] = useState({});
  const [category, setCategory] = useState([]);
  const watchStatus = watch("status");
  const watchHot = watch("Hot");
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "posts", postId);
      const singleDoc = await getDoc(docRef);
      reset(singleDoc.data());
      setSelectCategory(singleDoc?.data().category);
      setContent(singleDoc?.data().content);
    }
    fetchData();
  }, [postId, reset]);
  const handleUpdatePost = async (values) => {
    if (!isValid) return;

    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, {
      ...values,
      image,
      content,
    });
    toast.success("Update user successfully!");
  };

  async function deleteImage() {
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      image: "",
    });
  }

  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteImage);
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);

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
  if (!postId) return;
  return (
    <div>
      <h1 className="p-5 text-[#647c7b] text-[28px] font-bold">Update post</h1>
      <form onSubmit={handleSubmit(handleUpdatePost)}>
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
          <div className="content mb-10">
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
          <div className="grid grid-cols-2 gap-x-10 ">
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
                  checked={Number(watchStatus) === 1}
                  value={1}
                >
                  Approved
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === 2}
                  value={2}
                >
                  Pending
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === 3}
                  value={3}
                >
                  Reject
                </Radio>
              </div>
            </Field>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className="w-full block mx-auto text-[#fff] font-bold text-[18px] bg-gradient-to-br from-[#00A7B4] to-[#A4D96C] p-[15px] rounded-lg hover:cursor-pointer
              disabled:opacity-[0.5] max-w-[300px]"
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostUpdate;
