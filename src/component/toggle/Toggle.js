import React from "react";

const Toggle = (props) => {
  const { on, onClick, ...rest } = props;
  return (
    <label>
      <input
        type={"checkbox"}
        checked={on}
        className="hidden-input"
        onChange={() => {}}
        onClick={onClick}
      />
      <div
        className={`inline-block w-[70px] h-[42px] relative cursor-pointer rounded-full p-1 transition-all ${
          on ? "bg-[#34c834]" : "bg-[#e5e5e5]"
        }`}
        {...rest}
      >
        <span
          className={`transition-all w-[34px] h-[34px] bg-[#fff] rounded-full inline-block
        ${on ? "translate-x-[28px]" : ""}
        `}
        ></span>
      </div>
    </label>
  );
};

export default Toggle;
