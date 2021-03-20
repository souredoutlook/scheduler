import {useState, useEffect} from 'react';
import axios from 'axios';

const getUpdatedDaysArray = function(appointments, state) {
  const {days, day} = state;

  const spots = 
    days
      .find(dayObj => dayObj.name === day)
      .appointments
      .map(id => appointments[id])
      .reduce(
        (acc,appointment)=>{
          if (!appointment.interview) return acc = acc + 1;
          return acc;
        },0);

  return days.map(dayObj => {
    if (dayObj.name === day) return {...dayObj, spots};
    return dayObj;
  })
};

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({...state, day})
  
  useEffect(()=>{
    const daysPromise = axios.get(`http://localhost:8001/api/days`)
    const appointmentsPromise = axios.get(`http://localhost:8001/api/appointments`)
    const interviewersPromise = axios.get(`http://localhost:8001/api/interviewers`)
  
    Promise.all([daysPromise, appointmentsPromise, interviewersPromise])
    .then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({...prev, days, appointments, interviewers}));
    })
  
  },[])
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    const days = getUpdatedDaysArray(id, appointments, state)

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {...appointment}).then(()=>setState(prev => ({...prev, appointments, days})))
  }
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const days = getUpdatedDaysArray(appointments, state)
  
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, {...appointment}).then(()=>setState(prev => ({...prev, appointments, days})))
  }

  return {
    bookInterview,
    cancelInterview,
    state,
    setDay
  }
}