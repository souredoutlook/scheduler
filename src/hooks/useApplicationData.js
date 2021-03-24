import { useEffect, useReducer, useRef } from 'react';
import axios from 'axios';

import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from '../reducers/application';

const getUpdatedDaysArray = function(appointments, state) {
  const {days, day} = state;

  const spots = days
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

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  const setDay = day => dispatch({type: SET_DAY, value: day});
  
  const ref = useRef(state)
  
  useEffect(()=>{
    ref.current = state;
    
    const handleMessage = function(type, id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview
      };
    
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
    
      const days = getUpdatedDaysArray(appointments, state)
  
      dispatch({type, value: {appointments, days}});
    }

    const webSocket = new WebSocket('ws://localhost:8001')
  
    webSocket.onmessage = function(event) {
      const {type, id, interview} = JSON.parse(event.data);
  
      if (type === SET_INTERVIEW){
       handleMessage(type, id, interview)
      }  
    }

    return ()=> webSocket.close()
  },[state])

  useEffect(()=>{
    const daysPromise = axios.get(`/api/days`)
    const appointmentsPromise = axios.get(`/api/appointments`)
    const interviewersPromise = axios.get(`/api/interviewers`)
    
    Promise.all([daysPromise, appointmentsPromise, interviewersPromise])
    .then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatch({type: SET_APPLICATION_DATA, value: {days, appointments, interviewers}});
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
  
    const days = getUpdatedDaysArray(appointments, state)

    return axios.put(`/api/appointments/${id}`, {...appointment}).then(()=>dispatch({type: SET_INTERVIEW, value: {appointments, days}}))
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
  
    return axios.delete(`/api/appointments/${id}`, {...appointment}).then(()=>dispatch({type: SET_INTERVIEW, value: {appointments, days}}))
  }

  return {
    bookInterview,
    cancelInterview,
    state,
    setDay
  }
}