import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import Field from "../field/Field";
import Input from "../input/Input";
import Label from "../label/Label";
import Radio from "../checkbox/Radio";
import { toast } from "react-toastify";
import { db } from "../../firebaseApp/firebaseConfig";
import Button from "../button/Button";
import DashboardHeading from "../dashboard/DashboardHeading";

const CategoryAddNew = () => {
  const {
    control,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
    },
  });
  const watchStatus = watch("status");
  const handleAddCategory = async (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    cloneValues.slug = slugify(cloneValues.slug || cloneValues.name, {
      lower: true,
    });
    cloneValues.status = Number(cloneValues.status);
    const colref = collection(db, "categories");
    try {
      await addDoc(colref, {
        ...cloneValues,
        createdAt: serverTimestamp(),
      });
      toast.success("Create category successfully!");
    } catch (error) {
      toast.error(errors);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
      });
    }
  };
  return (
    <div className="p-5">
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddCategory)}>
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
            kind="primary"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className="w-full text-[#fff] font-bold text-[18px] bg-gradient-to-br from-[#00A7B4] to-[#A4D96C] p-[20px] rounded-lg hover:cursor-pointer
              disabled:opacity-[0.5] max-w-[300px] mx-auto block    "
          >
            Add new category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryAddNew;
