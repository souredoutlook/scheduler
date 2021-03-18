//selectors.js

function getAppointmentsForDay(state, day) {
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

function getInterview(state, interview) {
  if (interview) {
    const student = interview.student;
    const interviewerId = interview.interviewer;
    const interviewer = state.interviewers[interviewerId]
    
    return { student, interviewer}
  }
  return null;
};

export { getAppointmentsForDay, getInterview}