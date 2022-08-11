import React from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';
import { useState } from 'react';

const Form = (props) => {
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent('');
    setInterviewer(null);
  }
  
  const cancel = () => {
    reset ()
    props.onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => {
              setStudent(event.target.value)
            }}
            value={student}
            onSubmit={event => event.preventDefault()}
            /*
              This must be a controlled component
              your code goes here
            */
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          value = {interviewer}
          onChange = {setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={(event) => cancel()}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
};
export default Form;