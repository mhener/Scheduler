import { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // Function used to update the spots available for booking an appointment:
  const updateSpots = (state, appointments) => {
    const dayObj = state.days.find((d) => d.name === state.day);

    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    const day = { ...dayObj, spots };
    const days = state.days.map((d) => (d.name === state.day ? day : d));

    return days;
  };

  // Calling on scheduler-api:
  useEffect(() => {
    const daysURL = '/api/days';
    const appointmentsURL = '/api/appointments';
    const interviewersURL = 'api/interviewers';

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) => {
      console.log(all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // Function saves new appointments to the database:
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

    return axios
      .put(appointmentsURL, appointment)
      .then(() => {
        const newState = { ...state, appointments };
        const days = updateSpots(state, appointments);
        setState({ ...newState, days });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function deletes an appointment from the database:
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

    return axios
      .delete(appointmentsURL)
      .then(() => {
        const newState = { ...state, appointments };
        const days = updateSpots(newState);
        setState({ ...newState, days });
      })
      .catch((err) => console.log(err));
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
