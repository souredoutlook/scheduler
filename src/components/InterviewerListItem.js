import React from 'react';

import 'components/InterviewerListItem.scss';
import classnames from 'classnames';

export default function InterviewerListItem(props) {
const interviewerListItemClass = classnames(
  'interviewers__item',
  {'interviewers__item--selected': props.selected}
)
const interViewerListItemImageClass = classnames(
  'interviewers__item-image',
  {'interviewers__item--selected-image': props.selected}
)
  return (
    <li className={interviewerListItemClass} onClick={()=> props.setInterviewer(props.name)}>
      <img 
        className={interViewerListItemImageClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}