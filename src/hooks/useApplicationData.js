import axios from 'axios';
import { useState, useEffect } from 'react';

// State of Application (data):
function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // Render all appointments on first load
  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = '/api/appointments';
    const interviewersURL = '/api/interviewers';
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: [...all[0].data],
        appointments: { ...all[1].data },
        interviewers: { ...all[2].data },
      }));
    });
  }, []);

  // Function used to update the spots available for booking an appointment:
  const updateSpots = (state) => {
    const days = [...state.days];
    let spots = 0;
    for (let day of days) {
      if (day.name === state.day) {
        for (let appointment of day.appointments) {
          if (state.appointments[appointment].interview === null) {
            spots++;
          }
        }
        day.spots = spots;
      }
    }
    return days;
  };

  // Function to add appointment to the DB:
  const bookInterview = (id, interview) => {
    const appointmentsURL = `/api/appointments/${id}`;

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(appointmentsURL, { interview }).then(() => {
      const newState = { ...state, appointments };
      const days = updateSpots(newState);
      setState({ ...newState, days });
    });
  };

  // Function to delete an appointment from the DB:
  const cancelInterview = (id) => {
    const appointmentsURL = `/api/appointments/${id}`;
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(appointmentsURL).then(() => {
      const newState = { ...state, appointments };
      const days = updateSpots(newState);
      setState({ ...newState, days });
    });
  };

  return {
    state,
    bookInterview,
    cancelInterview,
    setDay,
  };
}

export default useApplicationData;
