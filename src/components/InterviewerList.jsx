import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

const InterviewerList = (props) => {
  const interviewers = props.interviewers.map((interviewerObj) => {
    return (
      <InterviewerListItem 
        key={interviewerObj.id}
        name={interviewerObj.name}
        avatar={interviewerObj.avatar}
        selected={interviewerObj.id === props.value}
        setInterviewer={() => props.onChange(interviewerObj.id)}
      />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section> 
  )
}


export default InterviewerList;