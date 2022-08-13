import React from 'react';

const getAppointmentsForDay = (state, day) => {
  const appointments = [];

  for (let checkDay of state.days) {
    if (checkDay.name === day) {
      for (let appointment of checkDay.appointments) {
        appointments.push(state.appointments[appointment]);
      }
    }
  }
  return appointments;
};

export default getAppointmentsForDay;

// () needs to return an array
// () returns an array with  length mathching the number of appointments for that day
// () returns an array containing correct appointment objects
// () returns an empt array when the days data is empty
// () reutnrs an empty array when the day is not found
