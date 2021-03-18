//selectors.js

function getAppointmentsForDay(state, day) {
  const foundAppointments = [];
  state.days.forEach(dayElement => {
    if (dayElement.name === day) {
      dayElement.appointments.forEach(appointment => {
        foundAppointments.push(appointment);
      })
    }  
  })
  return foundAppointments.map(appointment => state.appointments[appointment]);
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
  const foundInterviewers = [];
  state.days.forEach(dayElement => {
    if (dayElement.name === day) {
      dayElement.interviewers.forEach(interviewer => foundInterviewers.push(interviewer));
    }  
  })
  return foundInterviewers.map(interviewer => state.interviewers[interviewer]);
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay }