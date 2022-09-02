import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Children } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Field from "../component/field/Field";
import Input from "../component/input/Input";
import Label from "../component/label/Label";
import { useAuth } from "../contexts/auth-context";
import { toast } from "react-toastify";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseApp/firebaseConfig";
import InputPasswordToggle from "../component/input/InputPasswordToggle";
import Button from "../component/button/Button";

const SignInPage = () => {
  const navigate = useNavigate();
  const schema = yup.object({
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
    handleSubmit,
    control,
    formState: { isSubmitting, isValid, errors },
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
  console.log(isValid);
  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };
  const { userInfo } = useAuth();
  useEffect(() => {
    if (userInfo?.email) navigate("/");
  });
  return (
    <div className="min-h-[100vh] p-[40px] container">
      <img
        src="./football_tran.png"
        alt="Lion Football Logo"
        className="mx-auto mb-[20px] w-[90px]"
      />
      <h1 className="text-center text-[40px] text-primary mb-[60px] font-bold">
        Lion Football Blog
      </h1>
      <form className="formSign" onSubmit={handleSubmit(handleSignIn)}>
        <Field className=" flex flex-col items-start  ">
          <Label
            htmlFor="email"
            className="text-[#292D32] text-[18px] font-[600]"
          >
            Email
          </Label>
          <Input
            control={control}
            hasIcon={true}
            name="email"
            placeholder="Please enter your fullname "
            className={`w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
            focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4] 
            ${Children ? "pr-[40px]" : ""}
            `}
          ></Input>
        </Field>
        <Field className=" flex flex-col items-start  ">
          <Label
            htmlFor="password"
            className="text-[#292D32] text-[18px] font-[600]"
          >
            Password
          </Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <p className="mb-[15px] flex">
          Bạn chưa có tài khoản ?{" "}
          <p className="ml-[5px] text-[#4169E1]">
            <NavLink to={"/sign-up"}>Đăng kí tài khoản</NavLink>
          </p>
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

export default SignInPage;
