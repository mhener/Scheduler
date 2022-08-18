export function getAppointmentsForDay(state, day) {
  let appointments = [];
  let output = [];
  appointments = state.days.filter((appointment) => appointment.name === day);
  if (appointments.length > 0) {
    appointments = appointments[0].appointments;
    for (const i of appointments) {
      output.push(state.appointments[i]);
    }
  }
  return output;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const output = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
  return output;
}

export function getInterviewersForDay(state, day) {
  const interviewers = [];

  for (let checkDay of state.days) {
    if (checkDay.name === day) {
      for (let interviewer of checkDay.interviewers) {
        interviewers.push(state.interviewers[interviewer]);
      }
    }
  }

  return interviewers;
}
