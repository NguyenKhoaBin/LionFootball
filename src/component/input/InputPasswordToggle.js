import React, { Children, useState } from "react";
import IconEyeClose from "../../icon/IconEyeClose";
import IconEyeOpen from "../../icon/IconEyeOpen";
import Input from "./Input";

const InputPasswordToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);

  return (
    <>
      <Input
        control={control}
        hasIcon={true}
        name="password"
        type={togglePassword ? "text" : "password"}
        placeholder="Please enter your password "
        className={`w-full mt-1 p-4 bg-[#E7ECF3] rounded-lg border border-[#fff] transition-all outline-none
            focus:bg-[#fff] focus:border focus:border-primary placeholder:text-[#B1B5C4] 
            
            ${Children ? "pr-[40px]" : ""}
            `}
      >
        {!togglePassword ? (
          <IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
        ) : (
          <IconEyeOpen onClick={() => setTogglePassword(false)}></IconEyeOpen>
        )}
      </Input>
    </>
  );
};

export default InputPasswordToggle;
