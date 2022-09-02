import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import * as yup from "yup";
import { auth, db } from "../../firebaseApp/firebaseConfig";
import useFirebaseImage from "../../hooks/useFireBaseImage";
import Field from "../field/Field";
import ImageUpload from "../images/ImageUpload";
import Input from "../input/Input";
import Label from "../label/Label";
import FieldCheckboxes from "../field/FieldCheckboxes";
import Radio from "../checkbox/Radio";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import DashboardHeading from "../dashboard/DashboardHeading";
import Button from "../button/Button";
const UserAddNew = () => {
  const schema = yup.object({
    fullname: yup.string().required("Please enter your fullname"),
    email: yup
      .string()
      .email("Please enter valid email addess")
      .required("Please enter your email address"),
    password: yup
      .string()
      .min(8, "Your password must be least 8 characters or greater")
      .required("Please enter your password"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      userName: "",
      avatar: "",
      status: 1,
      role: 3,
      birthday: "",
      phone: "",
      createdAt: new Date(),
    },
    resolver: yupResolver(schema),
  });

  const handleAddUser = async (values) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await addDoc(collection(db, "users"), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        userName: slugify(values.userName || values.fullname, {
          lower: true,
          trim: true,
        }),
        avatar: image,
        status: Number(values.status),
        role: Number(values.role),
        createdAt: serverTimestamp(),
      });
      toast.success("Create new user successfully!");
      reset({
        fullname: "",
        email: "",
        password: "",
        userName: "",
        avatar: "",
        birthday: "",
        phone: "",
        status: 1,
        role: 3,
        createdAt: new Date(),
      });
      await updateProfile(auth.currentUser, {
        displayName: values.fullname,
        photoURL: image,
      });
      setImage("");
      setProgress(0);
    } catch (error) {
      console.log(error);
    }
  };
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const {
    image,
    setImage,
    progress,
    setProgress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>

      <form onSubmit={handleSubmit(handleAddUser)}>
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
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field className="w-full">
            <Label className="block font-[600] mb-3" htmlFor="email">
              Email
            </Label>
            <Input
              autoComplete="off"
              name="email"
              placeholder="Enter your email"
              control={control}
              className="w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
              focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4]"
            ></Input>
          </Field>
          <Field className="w-full">
            <Label className="block font-[600] mb-3" htmlFor="password">
              Password
            </Label>
            <Input
              autoComplete="off"
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
              className="w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
              focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4]"
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
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
