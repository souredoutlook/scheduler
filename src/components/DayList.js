import React from 'react';

import classnames from 'classnames';

import DayListItem from 'components/DayListItem';

export default function DayList(props) {

  const dayListItems = props.days.map(
    day => <DayListItem 
      key = {day.id}
      name = {day.name}
      spots = {day.spots}
      selected = {day.name === props.day}
      setDay = {props.setDay} />);

  return (
    <ul>
      {dayListItems}
    </ul>
  );
}

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// storiesOf("DayList", module)
//   .addParameters({
//     backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
//   })
//   .add("Monday", () => (
//     <DayList days={days} day={"Monday"} setDay={action("setDay")} />
//   ))
//   .add("Tuesday", () => (
//     <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
//   ));