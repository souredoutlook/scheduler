import React from 'react';

import 'components/DayListItem.scss';
import classnames from 'classnames';

export default function DayListItem(props) {
  const dayListItemClass = classnames(
    {'day-list__item--selected': props.selected},
    {'day-list__item--full': props.spots === 0}
  ) || 'day-list__item';
  return (
    <li className={dayListItemClass} onClick={()=> props.setDay(props.name)}>
        <h2 className='text--regular'>{props.name}</h2>
        <h3 className='text--light'>{props.spots} spots remaining</h3>
    </li>
  );
}