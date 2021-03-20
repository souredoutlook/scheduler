import {useState, useEffect, useReducer} from 'react';
import axios from 'axios';

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

  const SET_DAY = "SET_DAY"
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA"
  const SET_INTERVIEW = "SET_INTERVIEW"

  const reducers = {
    SET_DAY(state, action) {
      return {...state, ...action.value};
    },
    SET_APPLICATION_DATA(state, action) {
      return {...state, ...action.value};
    },
    SET_INTERVIEW(state, action) {
      return {...state, ...action.value};
    }
  };
  
  function reducer(state, action) {
    if (reducers[action.type]) return reducers[action.type](state, action);
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  const setDay = day => dispatch({type: SET_DAY, value: day});

  useEffect(()=>{
    const daysPromise = axios.get(`http://localhost:8001/api/days`)
    const appointmentsPromise = axios.get(`http://localhost:8001/api/appointments`)
    const interviewersPromise = axios.get(`http://localhost:8001/api/interviewers`)
  
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

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {...appointment}).then(()=>dispatch({type: SET_INTERVIEW, value: {appointments, days}}))
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
  
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, {...appointment}).then(()=>dispatch({type: SET_INTERVIEW, value: {appointments, days}}))
  }

  return {
    bookInterview,
    cancelInterview,
    state,
    setDay
  }
}