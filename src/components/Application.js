import React, { useState, useEffect} from "react";
import axios from 'axios';
import "components/Application.scss";
import getAppointmentsForDay from 'helpers/selectors';

// import Button from 'components/Button'
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });
  
  const setDay = day => setState({...state, day})
  
  useEffect(()=>{
    const daysPromise = axios.get(`http://localhost:8001/api/days`)
    const appointmentsPromise = axios.get(`http://localhost:8001/api/appointments`)
    Promise.all([daysPromise, appointmentsPromise])
    .then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      setState(prev => ({...prev, days, appointments}))
    })
  },[])
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const appointmentsList = dailyAppointments.map(
    appointment => <Appointment 
      key=  {appointment.id}
      {...appointment}
    />)
  appointmentsList.push(<Appointment key="last" time="5pm" />)
  
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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsList}
      </section>
    </main>
  );
}
