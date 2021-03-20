//selectors.js

function getAppointmentsForDay(state, day) {
  if (state.days.length) {
    return state.days.find(dayObj => dayObj.name === day).appointments.map(appointment => state.appointments[appointment])
  }
  return [];
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
  if (state.days.length) {
    return state.days.find(dayObj => dayObj.name === day).interviewers.map(interviewer => state.interviewers[interviewer]);
  }
  return [];
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay }