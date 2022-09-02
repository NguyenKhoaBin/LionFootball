import React, { Children } from "react";
import Input from "../component/input/Input";
import slugify from "slugify";
import Label from "../component/label/Label";
import { useForm } from "react-hook-form";
import Field from "../component/field/Field";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebaseApp/firebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import InputPasswordToggle from "../component/input/InputPasswordToggle";
import Button from "../component/button/Button";

const SignUpPage = () => {
  const navigate = useNavigate();
  const handleSignUp = async (values) => {
    console.log(values);
    console.log(isValid);
    if (!isValid) return;
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL:
        "https://images.unsplash.com/photo-1517012021249-a130aa959065?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGF0dG9vJTIwYm95fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      userName: slugify(values.fullname, { lower: true }),
      avatar:
        "https://images.unsplash.com/photo-1517012021249-a130aa959065?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGF0dG9vJTIwYm95fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      status: 1,
      role: 3,
      phone: "",
      birthday: "",
      createdAt: serverTimestamp(),
    });
    // const colref = collection(db, "users");
    // await addDoc(colref, {
    //   fullname: values.fullname,
    //   email: values.email,
    //   password: values.password,
    // });
    toast.success("Successfully!!!");
    navigate("/");
  };
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
    formState: { errors, isValid, isSubmitting },
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
  return (
    <div className="min-h-[100vh] p-[40px] container">
      <img
        src="./football_tran.png"
        alt="Lion Football logo"
        className="mx-auto mb-[20px] w-[90px]"
      />
      <h1 className="text-center text-[40px] text-primary mb-[60px] font-bold">
        Lion Football Blog
      </h1>

      <form className="formSign" onSubmit={handleSubmit(handleSignUp)}>
        <Field className=" flex flex-col items-start  ">
          <Label
            htmlFor="fullname"
            className="text-[#292D32] text-[18px] font-[600]"
          >
            Fullname
          </Label>
          <Input
            control={control}
            hasIcon={true}
            name="fullname"
            placeholder="Please enter your fullname "
            className={`w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
            focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4] 
            ${Children ? "pr-[40px]" : ""}
            `}
          ></Input>
        </Field>
        <Field className=" flex flex-col items-start  ">
          <Label
            htmlFor="fullname"
            className="text-[#292D32] text-[18px] font-[600]"
          >
            Email address
          </Label>
          <Input
            control={control}
            hasIcon={true}
            name="email"
            placeholder="Please enter your email address "
            className={`w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
            focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4] 
            
            ${Children ? "pr-[40px]" : ""}
            `}
          ></Input>
        </Field>
        <Field className=" flex flex-col items-start  ">
          <Label
            htmlFor="Password"
            className="text-[#292D32] text-[18px] font-[600]"
          >
            Password
          </Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <p className="mb-[15px] flex">
          Bạn đã có tài khoản ?{" "}
          <NavLink to={"/sign-in"}>
            <p className="ml-[5px] text-[#4169E1]">Đăng nhập</p>
          </NavLink>
        </p>
        <div className="flex items-center justify-center">
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="w-full text-[#fff] font-bold text-[18px] bg-gradient-to-br from-[#00A7B4] to-[#A4D96C] p-[20px] rounded-lg hover:cursor-pointer
              disabled:opacity-[0.5] max-w-[300px]"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
