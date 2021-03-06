import React, { ReactElement } from "react";
import "bulma/css/bulma.min.css";
import "../styles/Bubble.css";

export default function Bubble(props: {
  top: number;
  left: number;
  radius: number;
  active: boolean;
}): ReactElement {
  const positionStyle: React.CSSProperties = {
    position: "fixed",
    width: props.radius * 2,
    height: props.radius * 2,
    left: props.left - props.radius,
    top: props.top * 0.99 - props.radius,
    zIndex: 1,
    pointerEvents: "none",
  };

  const animationStyle: React.CSSProperties = {
    height: props.radius * 2,
    width: props.radius * 2,
  };

  return (
    <div style={positionStyle}>
      {props.active && (
        <div
          className="circle"
          style={{
            animationDelay: "0s",
            ...animationStyle,
          }}
        ></div>
      )}
      {props.active && (
        <div
          className="circle"
          style={{
            animationDelay: "0.25s",
            ...animationStyle,
          }}
        ></div>
      )}
    </div>
  );
}
