import React from "react";

import Header from  'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';

import "components/Appointment/styles.scss";

import useVisualMode from 'hooks/useVisualMode';
import InterviewerList from "components/InterviewerList";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  const {bookInterview, cancelInterview} = props;

  const {mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(props.id, interview)
    .then(()=>transition(SHOW))
    .catch(()=> transition(ERROR_SAVE, true))
  }

  function cancel(name, interviewer) {
    transition(DELETING, true)
    cancelInterview(props.id)
    .then(()=>transition(EMPTY))
    .catch(()=> transition(ERROR_DELETE, true))
  }

  return (
  <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={()=>transition(CONFIRM)}
        onEdit={()=>transition(EDIT)}
      />
    )}
    {mode === CONFIRM && (
      <Confirm
        message={"Are you sure you want to cancel the interview?"}
        onConfirm={()=>cancel()}
        onCancel={()=>back()}
      />
    )}
    {mode === CREATE && (
      <Form 
      interviewers={props.interviewers}
      onSave={(name, interviewer)=>{
        save(name, interviewer)
      }}
      onCancel={()=>back()}
      />
    )}
    {mode === EDIT && (
      <Form 
        name={props.interview.student}
        interviewers={props.interviewers}
        value={props.interview.interviewer.id}
        onSave={(name, interviewer)=>{
          save(name, interviewer)
        }}
        onCancel={()=>back()}
      />
    )}
    {(mode === SAVING || mode === DELETING) && (
      <Status message={mode === SAVING ? "Saving" : "Deleting"} />
    )}
    {(mode === ERROR_DELETE || mode === ERROR_SAVE) && (
      <Error 
        message={
          `Something went wrong when we tried to ${mode === ERROR_DELETE ? "cancel the interview..." : "save the interview..."}`}
        onClose={()=>back()}
      />
    )}
  </article>
  )
}


// storiesOf("Appointment", module)
//     .addParameters({
//       backgrounds: [{name: "white", value: "#FFF", default: true }]
//     })
//     .add("Appointment Empty", ()=> (
//       <>
//         <Appointment id={1} time={"12pm"}/>
//         <Appointment id={"last"} time={"1pm"}/>
//       </> 
//     ))
//     .add("Appointment Booked", ()=> (
//       <>
//         <Appointment
//           id={1}
//           time={'12pm'}
//           interview={{student: "Lydia Miller-Jones", interviewer}}
//         />
//         <Appointment id={"last"} time={"1pm"}/>
//       </>
//     ))
//     .add("Header",()=> <Header time={"12pm"} /> )
//     .add("Empty", ()=> <Empty onAdd={action("onAdd")}/>)
//     .add("Show", ()=> <Show
//       student={"Lydia Miller-Jones"}
//       interviewer={interviewer}
//       onEdit={action("onEdit")}
//       onDelete={action("onDelete")}
//     />)
//     .add("Confirm", ()=> <Confirm 
//       message={"Delete the appointment?"}
//       onConfirm={action("onConfirm")}
//       onCancel={action("onCancel")}
//     />)
//     .add("Status", ()=> <Status message={"Deleting"} />)
//     .add("Error", ()=> <Error 
//       message={"Could not delete appointment"}
//       onClose={action("onClose")}
//     />)
//     .add("Create", ()=> <Form 
//       interviewers={interviewers}
//       onSave={action("onSave")}
//       onCancel={action("onCancel")}
//     />)
//     .add("Edit", ()=> <Form 
//       name={"Nicholas Meisenheimer"}
//       interviewers={interviewers}
//       value={3}
//       onSave={action("onSave")}
//       onCancel={action("onCancel")}
//     />)