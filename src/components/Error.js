import React from "react";
const Error = (props) => {
  return (
    <div className="content-container">
      <p className="error-heading">
        Something went very wrong! Please try Again!
      </p>
      <h2 className="error-msg">{props.message}</h2>
    </div>
  );
};

export { Error as default };
