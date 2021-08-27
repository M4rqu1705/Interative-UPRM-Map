import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import "../styles/Bubble.css";

export default function Bubble(
  props: BuildingsType & { active: boolean }
): any {
  const positionStyle: React.CSSProperties = {
    position: "fixed",
    width: props.radius * 2,
    height: props.radius * 2,
    left: props.left - props.radius,
    top: props.top - props.radius * 1.25,
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
            animationDelay: "1s",
            ...animationStyle,
          }}
        ></div>
      )}
      {props.active && (
        <div
          className="circle"
          style={{
            animationDelay: "2s",
            ...animationStyle,
          }}
        ></div>
      )}
      {props.active && (
        <div
          className="circle"
          style={{
            animationDelay: "3s",
            ...animationStyle,
          }}
        ></div>
      )}
    </div>
  );
}
