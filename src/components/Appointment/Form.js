import React, {useState} from "react";

import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {
  const [name, setName]=useState(props.name || "");
  const [value, onChange]=useState(props.value || null);
  const [error, setError] = useState("");

  const reset = function() {
    setName("");
    onChange(null);
  }

  const cancel = function() {
    reset();
    props.onCancel();
  }

  const validate = function() {
    if (name === "") {
      setError("Student name cannot be blank")
      return;
    }
    setError("");
    props.onSave(name, value);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={value}
          onChange={onChange}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={()=>validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}
