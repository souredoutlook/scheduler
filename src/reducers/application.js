const SET_DAY = "SET_DAY"
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA"
const SET_INTERVIEW = "SET_INTERVIEW"

const reducers = {
  SET_DAY(state, action) {
    return {...state, day: action.value};
  },
  SET_APPLICATION_DATA(state, action) {
    return {...state, ...action.value};
  },
  SET_INTERVIEW(state, action) {
    return {...state, ...action.value};
  }
};

export default function reducer(state, action) {
  if (reducers[action.type]) return reducers[action.type](state, action);
  throw new Error(
    `Tried to reduce with unsupported action type: ${action.type}`
  );
}

export { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW }