import React from "react";

import Header from  'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';

import "components/Appointment/styles.scss";

import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"


export default function Appointment(props) {
  const {mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
  <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode === CREATE && (
      <Form 
      interviewers={props.interviewers}
      onSave={()=>console.log("onSave")}
      onCancel={()=>back()}
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