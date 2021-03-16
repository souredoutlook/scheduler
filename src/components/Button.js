import React from "react";

import "components/Button.scss";

import classnames from 'classnames';

export default function Button(props) {
  const {danger, confirm} = props;
  const btnClass = classnames(
    'button',
    { 'button--danger': danger },
    { 'button--confirm': confirm }
    );

  return (
    <button
      disabled={props.disabled}
      className={btnClass}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
