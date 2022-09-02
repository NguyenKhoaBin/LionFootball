import PropTypes from "prop-types";
import React from "react";

const LabelStatus = ({ children, type = "default" }) => {
  let styleClassName = "text-gray500 bg-gray100";
  switch (type) {
    case "success":
      styleClassName = "text-green500 bg-green100";
      break;
    case "warning":
      styleClassName = "text-orange500 bg-orange100";
      break;
    case "danger":
      styleClassName = "text-red500 bg-red100";
      break;

    default:
      break;
  }
  return (
    <span
      className={`inline-block px-3 py-[10px] rounded-lg text-[14px] font-[500]  ${styleClassName}`}
    >
      {children}
    </span>
  );
};
LabelStatus.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(["default", "success", "warning", "danger"]).isRequired,
};
export default LabelStatus;
