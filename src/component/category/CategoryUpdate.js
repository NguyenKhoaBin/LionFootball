import { doc, getDoc, updateDoc } from "firebase/firestore";
import slugify from "slugify";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { db } from "../../firebaseApp/firebaseConfig";
import Field from "../field/Field";
import Input from "../input/Input";
import Label from "../label/Label";
import Radio from "../checkbox/Radio";
import DashboardHeading from "../dashboard/DashboardHeading";
import Button from "../button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const CategoryUpdate = () => {
  const schema = yup.object({
    name: yup.string().required("Please enter category name"),
    slug: yup.string().required("Please enter category slug"),
  });
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: "",
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
  const watchStatus = watch("status");
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  useEffect(() => {
    async function fetch() {
      const docRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(docRef);
      reset(singleDoc.data());
    }
    fetch();
  }, [categoryId, reset]);
  const handleUpdateCategory = async (values) => {
    if (!isValid) return;
    const docRef = doc(db, "categories", categoryId);
    await updateDoc(docRef, {
      name: values.name,
      slug: slugify(values.slug || values.name),
      status: values.status,
    });
    toast.success("Update category successfully!");
  };
  if (categoryId === null) return null;
  return (
    <div>
      <DashboardHeading
        title="Update catetory"
        desc={`Update your category id : ${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="form-layout flex gap-8 justify-between">
          <Field className="w-full">
            <Label htmlFor="name" className="font-[600] block mb-3">
              Name
            </Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              className="w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
              focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4] "
            ></Input>
          </Field>
          <Field className="w-full">
            <Label htmlFor="slug" className="font-[600] block mb-3">
              Slug
            </Label>
            <Input
              control={control}
              className="w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
              focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4] "
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label className="font-[600] block mb-5">Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === 1}
                value="1"
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === 2}
                value="2"
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <div className=" mt-10">
          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            kind="primary"
            className="w-full text-[#fff] font-bold text-[18px] bg-gradient-to-br from-[#00A7B4] to-[#A4D96C] p-[20px] rounded-lg hover:cursor-pointer
              disabled:opacity-[0.5] max-w-[300px] mx-auto block    "
          >
            Update category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryUpdate;
