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

function getInterviewersForDay(state, day) {
  const filteredInterviewers = [];
  state.days.forEach(dayElement => {
    if (dayElement.name === day) {
      dayElement.interviewers.map(interviewer => {
        if (state.interviewers[interviewer]) filteredInterviewers.push(state.interviewers[interviewer])
      })
    }  
  })
  return filteredInterviewers;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay }