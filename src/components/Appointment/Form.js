import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

const Form = (props) => {
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

  // Clear the form:
  const reset = () => {
    setStudent('');
    setInterviewer(null);
  };

  // Run reset () when cancel button is clicked:
  const cancel = () => {
    reset();
    props.onCancel();
    setError('');
  };

  // Validation to ensure a student name is always entered and an interviewer is always selected:
  function validate() {
    if (student === '') {
      setError('Student name cannot be blank');
      return;
    }
    if (interviewer === null) {
      setError('Please select an interviewer');
      return;
    }
    setError('');
    props.onSave(student, interviewer);
  }

  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form autoComplete='off' onSubmit={(event) => event.preventDefault()}>
          <input
            className='appointment__create-input text--semi-bold'
            name='name'
            type='text'
            placeholder='Enter Student Name'
            onChange={(event) => {
              setStudent(event.target.value);
            }}
            value={student}
            data-testid='student-name-input'
          />
        </form>
        <section className='appointment__validation'>{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={(e) => setInterviewer(e)}
        />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={(e) => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};
export default Form;
