import React from "react";
import { useController } from "react-hook-form";
const Input = ({
  control,
  name = "",
  type = "text",
  hasIcon = false,
  children,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValues: "",
  });
  return (
    <div className="w-full relative ">
      <input type={type} autoComplete="false" id={name} {...field} {...props} />
      {hasIcon ? children : null}
    </div>
  );
};

export default Input;
