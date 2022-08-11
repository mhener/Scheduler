import React from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header.js'
import Show from 'components/Appointment/Show.js'
import Empty from 'components/Appointment/Empty.js'

const Appointment = (props) => {
  return (
    <article className='appointment'>
      <Header time={props.time}/>
      {props.interview 
      ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> 
      : <Empty />}
    </article>
  );
};

export default Appointment;