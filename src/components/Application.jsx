import React, { useEffect, useState } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterview
} from "helpers/selectors";
import "components/Application.scss";

const Application = (props) => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState(prev => ({...prev, day}));

  const onEdit = () => console.log('onEdit triggered');
  const onDelete = () => console.log('onDelete triggered');

  useEffect(() => {
    const apis = {
      days: 'api/days',
      appointments: 'api/appointments',
      interviewers: 'api/interviewers'
    };

    Promise.all([
      Promise.resolve(axios.get(apis.days)),
      Promise.resolve(axios.get(apis.appointments)),
      Promise.resolve(axios.get(apis.interviewers))
    ])
    .then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    })
    .catch(error => console.log(error.message));
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointments = dailyAppointments.map(appointment => {
    return (
      <Appointment
        key={ appointment.id }
        onEdit={ onEdit }
        onDelete={ onDelete }
        { ...appointment }
        interview={ getInterview(state, appointment.interview) }
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList
        days={ state.days }
        value={ state.day }
        onChange={ setDay }
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        { appointments }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

export default Application;