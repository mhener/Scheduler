import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

const InterviewerList = (props) => {
  const interviewersList = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
      key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
        />
        )
      })
      console.log(interviewersList)
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{interviewersList}</ul>
    </section> 
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;