import React from "react";

const CardAction = () => {
  return (
    <div
      className="text-white  p-2 rounded d-flex flex-column align-center justify-content-center h-100"
      style={{
        backgroundColor: "var(--color-border)",
        border: "2px solid #ffffff",
      }}
    >
      <div className="d-flex flex-column align-items-center gap-5 my-5">
        <button
          type="button"
          className="btn btn-primary rounded-pill "
          style={{ padding: "5px 120px" }}
        >
          Accept
        </button>
        <button
          type="button"
          className="btn btn-danger rounded-pill "
          style={{ padding: "5px 120px" }}
        >
          Deny
        </button>
      </div>
    </div>
  );
};

export default CardAction;
