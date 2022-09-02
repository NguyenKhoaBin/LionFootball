import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { auth, db } from "../../firebaseApp/firebaseConfig";
import Field from "../field/Field";
import Input from "../input/Input";
import Label from "../label/Label";
import FieldCheckboxes from "../field/FieldCheckboxes";
import Radio from "../checkbox/Radio";
import { toast } from "react-toastify";
import useFirebaseImage from "../../hooks/useFireBaseImage";
import ImageUpload from "../images/ImageUpload";
import DashboardHeading from "../dashboard/DashboardHeading";
import Button from "../button/Button";
import { updateProfile } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UserUpdate = () => {
  const [params] = useSearchParams();
  const userId = params.get("id");
  const schema = yup.object({
    fullname: yup.string().required("Please enter your fullname"),
    userName: yup.string().required("Please enter your username"),
  });
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
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
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const watchStatus = watch("status");
  const watchRole = watch("role");
  useEffect(() => {
    async function fetch() {
      const docRef = doc(db, "users", userId);
      const singleDoc = await getDoc(docRef);
      reset(singleDoc.data());
    }
    fetch();
  }, [userId, reset]);

  const handleUpdateUser = async (values) => {
    if (!isValid) return;
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      fullname: values.fullname,
      userName: values.userName || values.fullname,
      status: Number(values.status),
      role: Number(values.role),
      avatar: image,
    });
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL: image,
    });
    toast.success("Update user successfully!");
  };

  async function deleteAvatar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }

  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  if (userId == null) return null;
  return (
    <div>
      <DashboardHeading
        title="Update user"
        desc="Update user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="text-center mb-10">
          <ImageUpload
            name="image"
            image={image}
            progress={progress}
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field className="w-full">
            <Label className="block font-[600] mb-3" htmlFor="fullname">
              Fullname
            </Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
              className="w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
            focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4]"
            ></Input>
          </Field>
          <Field className="w-full">
            <Label className="block font-[600] mb-3" htmlFor="username">
              Username
            </Label>
            <Input
              className="w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
            focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4]"
              name="userName"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field className="w-full">
            <Label className="block font-[600] mb-3">Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === 1}
                value={1}
              >
                Active
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
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field className="w-full">
            <Label className="block font-[600] mb-3">Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === 1}
                value={1}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === 2}
                value={2}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === 3}
                value={3}
              >
                User
              </Radio>
            </FieldCheckboxes>
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

export default UserUpdate;
