import React from "react";

export default function Alert(props) {
  return (
    // This props.alert && ... makes sure that the state of props.alert is already something and not null.
    // If props.alert is null, then it will return false and the next portion will not display.

    props.alert && (
      <div
        style={{
          position: "absolute",
          width: "100%",
        }}
        className={`alert alert-${props.alert.type}`}
        role="alert"
      >
        {props.alert.msg}
      </div>
    )
  );
}
