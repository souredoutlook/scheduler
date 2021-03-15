import React from "react";

import "components/Button.scss";

export default function Button(props) {
  console.log(props);
  return (
  <>
    <button className={(props.confirm && 'button--confirm') || (props.danger && 'button--danger')}>{props.children}</button>
  </>
  );
}
