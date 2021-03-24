import React from "react";

import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  const dayListItemClass = classnames(
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": props.spots === 0 },
    "day-list__item"
  );

  const specialCases = { 0: "no spots remaining", 1: "1 spot remaining" };
  const spotsRemaining =
    specialCases[props.spots] || props.spots + " spots remaining";
  return (
    <li className={dayListItemClass} onClick={props.setDay} data-testid={"day"}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsRemaining}</h3>
    </li>
  );
}
