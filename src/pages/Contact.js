import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../component/button/Button";
import Field from "../component/field/Field";
import Input from "../component/input/Input";
import Label from "../component/label/Label";
import Footer from "../component/layout/Footer";
import Header from "../component/layout/Header";
import { db } from "../firebaseApp/firebaseConfig";
import * as yup from "yup";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact";
  }, []);
  const schema = yup.object({
    fullname: yup.string().required("Please enter your fullname"),
    email: yup
      .string()
      .email("Please enter valid email addess")
      .required("Please enter your email address"),
    phone: yup
      .number("Please enter number")
      .min(10, "Your password must be least 8 characters or greater")
      .required("Please enter your password"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      message: "",
    },
    resolver: yupResolver(schema),
  });
  const handleChangeMess = async (e) => {
    setValue("message", e.target.value);
  };
  const handleSubmitMessage = async (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    const colref = collection(db, "reports");
    try {
      await addDoc(colref, {
        ...cloneValues,
        createAt: serverTimestamp(),
      });
      toast.success("Report successfuly! ");
    } catch (error) {
      toast.error("Something wrong...");
    } finally {
      reset({
        fullname: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  };
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
      <Header></Header>
      <div className="flex justify-between main">
        <div className="left relative  w-full min-h-[600px] pl-20 py-[120px] pr-[150px]">
          <img
            src="https://img.freepik.com/premium-vector/business-meeting-negotiations-conversation-two-businessmen-vector_125133-1747.jpg"
            alt=""
            className="absolute shrink-0 top-0 left-0 h-full -z-10"
          />
        </div>
        <div className="right w-full min-h-[600px] ">
          <div className="p-10">
            <h2 className="text-[#000] text-center text-[34px] font-[500]">
              Contact Us
            </h2>
            <form onSubmit={handleSubmit(handleSubmitMessage)}>
              <div className="form-layout mt-5">
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
              </div>
              <div className="form-layout">
                <Field className="w-full">
                  <Label className="block font-[600] mb-3" htmlFor="phone">
                    Phone number
                  </Label>
                  <Input
                    autoComplete="off"
                    name="phone"
                    placeholder="Enter your phone number"
                    control={control}
                    className="w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
              focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4]"
                  ></Input>
                </Field>
              </div>
              <div className="form-layout">
                <Field className="w-full">
                  <Label className="block font-[600] mb-3" htmlFor="message">
                    Message
                  </Label>
                  <textarea
                    onChange={(e) => handleChangeMess(e)}
                    name="message"
                    cols="30"
                    rows="5"
                    placeholder="Enter your message"
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
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Contact;
