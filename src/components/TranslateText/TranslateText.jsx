// src/components/TranslateText.jsx
import React from "react";
import i18n from "../../i18n";

function TranslateText({ children }) {
  if (typeof children === "string") {
    return <>{i18n.t(children)}</>;
  }

  if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, index) => (
          <TranslateText key={index}>{child}</TranslateText>
        ))}
      </>
    );
  }

  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...children.props,
      children: <TranslateText>{children.props.children}</TranslateText>,
    });
  }

  return children;
}

export default TranslateText;
