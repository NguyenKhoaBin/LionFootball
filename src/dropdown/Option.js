import React from "react";
import { useDropdown } from "../contexts/dropdown-context";

const Option = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="px-5 py-4 cursor-pointer flex items-center justify-between hover:bg-[#E7ECF3] rounded mt-[1px]"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
