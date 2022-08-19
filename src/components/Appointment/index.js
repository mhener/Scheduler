import React from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header.js';
import Show from 'components/Appointment/Show.js';
import Empty from 'components/Appointment/Empty.js';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
  }
  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student = {props.interview.student} interviewer = {props.interview.interviewer || null}/> }
      {mode === CREATE && <Form onCancel = {back} interviewers = {props.interviewers} onSave={save} />}
    </article>
  );
};

export default Appointment;
