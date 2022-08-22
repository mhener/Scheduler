import React from 'react';
import useVisualMode from 'hooks/useVisualMode';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header.js';
import Show from 'components/Appointment/Show.js';
import Empty from 'components/Appointment/Empty.js';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const Appointment = (props) => {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Save new entry:
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING, true);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        console.log(error);
        transition(ERROR_SAVE, true);
      });
  }

  // Remove an entry:
  function remove() {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        console.log(error);
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <article className='appointment' data-testid='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          // name={props.name}
          // value={props.value}
          bookInterview={props.bookInterview}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)}
        />
      )}
      {mode === SAVING && <Status message='Saving' />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={remove}
          onCancel={back}
          message='Are you sure you would like to delete?'
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back(SHOW)}
          // onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message='Could not save appointment.'
          onClose={() => back(EMPTY)}
        />
        //onClose={back}
      )}
      {mode === ERROR_DELETE && (
        <Error
          message='Could not delete appointment.'
          onClose={() => back(EMPTY)}
        />
        // onClose={back}
      )}
    </article>
  );
};

export default Appointment;
