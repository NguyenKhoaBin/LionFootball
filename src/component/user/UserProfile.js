import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth-context";
import { db } from "../../firebaseApp/firebaseConfig";
import useFirebaseImage from "../../hooks/useFireBaseImage";
import Button from "../button/Button";
import DashboardHeading from "../dashboard/DashboardHeading";
import Field from "../field/Field";
import ImageUpload from "../images/ImageUpload";
import Input from "../input/Input";
import Label from "../label/Label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const UserProfile = () => {
  const schema = yup.object({
    fullname: yup.string().required("Please enter your fullname"),
    userName: yup.string().required("Please enter your email address"),
    phone: yup
      .number()
      .min(8, "Your password must be least 8 characters or greater")
      .required("Please enter your phone number"),
  });
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { isValid, isSubmitting, errors },
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
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { userInfo } = useAuth();
  const userEmail = userInfo?.email;
  const [description, setDescription] = useState("");
  useEffect(() => {
    async function fetch() {
      const q = query(collection(db, "users"), where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        reset(doc.data());
        setDescription(doc.data().desc);
      });
    }
    fetch();
  }, [userEmail, reset]);
  const handleChangeDesc = (e) => {
    setDescription(e.target.value);
    setValue("desc", description);
  };

  async function deleteAvatar() {
    const q = query(collection(db, "users"), where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    await updateDoc(querySnapshot, {
      avatar: "",
    });
  }

  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  const handleUpdateProfile = async (values) => {
    if (!isValid) return;
    const q = query(collection(db, "users"), where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (sigleDoc) => {
      const userId = sigleDoc.id;
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, {
        ...values,
        avatar: image,
        desc: values.desc,
      });
      toast.success("Update profile successfully!");
    });
  };
  if (userEmail == null) return null;
  return (
    <div className="p-5">
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="mb-10 text-center">
          <ImageUpload
            name="image"
            image={image}
            progress={progress}
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
          ></ImageUpload>
        </div>
        <div className="flex justify-center gap-5 mb-4">
          <Field className="w-full">
            <Label className="block font-[600] mb-3" htmlFor="fullname">
              Fullname
            </Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
              className="w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
              focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4] "
            ></Input>
          </Field>
          <Field className="w-full">
            <Label className="block font-[600] mb-3" htmlFor="userName">
              Username
            </Label>
            <Input
              control={control}
              name="userName"
              placeholder="Enter your username"
              className="w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
              focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4] "
            ></Input>
          </Field>
        </div>
        <div className="flex justify-center gap-5 mb-4">
          <Field className="w-full">
            <Label className="block font-[600] mb-3" htmlFor="fullname">
              Date of Birth
            </Label>
            <Input
              control={control}
              name="birthday"
              placeholder="dd/mm/yy"
              className="w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
              focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4] "
            ></Input>
          </Field>
          <Field className="w-full">
            <Label className="block font-[600] mb-3" htmlFor="fullname">
              Mobile Number
            </Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
              className="w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
              focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4] "
            ></Input>
          </Field>
        </div>
        <div className="flex justify-center mb-4">
          <Field className="w-full">
            <Label className="block font-[600] mb-3" htmlFor="desc">
              Description
            </Label>
            <textarea
              value={description}
              name="description"
              onChange={(e) => handleChangeDesc(e)}
              cols="30"
              rows="10"
              placeholder="Enter your description"
              className="w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
            focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4]"
            ></textarea>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="w-full text-[#fff] font-bold text-[18px] bg-gradient-to-br from-[#00A7B4] to-[#A4D96C] p-[20px] rounded-lg hover:cursor-pointer
              disabled:opacity-[0.5] max-w-[300px] mx-auto block    "
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
