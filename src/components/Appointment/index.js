import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header.js'
import Show from 'components/Appointment/Show.js'
import Empty from 'components/Appointment/Empty.js'

const Appointment = (props) => {
  return (
    <>
      <Header time='5pm'/>

     {props.interview && 
     <Show
      student = {props.student}
      interviewer={props.interview.interviewer}
      onDelete = {props.onDelete}
      onEdit={props.onEdit}
     />}
     {!props.interview && <Empty onClick={props.onAdd}/>}
     
    </>
  );
};

export default Appointment;