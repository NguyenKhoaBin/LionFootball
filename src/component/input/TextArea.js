import React from "react";
import { useController } from "react-hook-form";

const TextArea = ({ control, name = "", children, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValues: "",
  });
  return (
    <div>
      <textarea name={name} id={name} {...field} {...props}></textarea>
    </div>
  );
};

export default TextArea;
