//selectors.js

export default function getAppointmentsForDay(state, day) {
  const filteredAppointments = [];
  state.days.forEach(dayElement => {
    if (dayElement.name === day) {
      dayElement.appointments.forEach(appointment => {
        if (state.appointments[appointment]) filteredAppointments.push(state.appointments[appointment])
      })
    }  
  })
  return filteredAppointments;
}