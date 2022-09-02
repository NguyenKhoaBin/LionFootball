import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Loading from "../Loading";

const Button = ({
  type = "button",
  onClick = () => {},
  children,
  isLoading,
  ...props
}) => {
  const { to } = props;
  const child = !!isLoading ? <Loading></Loading> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to}>
        <button type={type} onClick={onClick} {...props}>
          {child}
        </button>
      </NavLink>
    );
  }
  return (
    <button type={type} onClick={onClick} {...props}>
      {child}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
};

export default Button;
